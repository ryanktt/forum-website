const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const checkObjectId = require('../middleware/checkObjectId');

const User = require('../models/user');
const Post = require('../models/post');
const Thread = require('../models/thread');
const MessageToUser = require('../models/messageToUser');
const { now } = require('moment');




// @route    GET /
// @desc     Get user by token
// @access   Private
router.get('/', async(req, res) => {
    try {
        
        const user = await User.findById(req.user.id).select('-email -ip -password ');
        res.json(user)
  
    } catch (err) {
      console.error(err);
      res.status(500).json('Erro de Servidor')
    }
  })

// @route    PUT /
// @desc     Edit profile
// @access   Private
router.put('/account/update-profile', async(req, res, next) => {

    const {userImg, description} = req.body;

    try {
        const user = await User.findById(req.user.id);
        user.profile.userImg = userImg;
        user.profile.description = description;
        await user.save()
        res.status(200).json('Sucesso');
    } catch (err) {
        res.status(500).json('Erro de Servidor');
        console.error(err);
    }
})

// @route    GET /
// @desc     Get private threads
// @access   Private
router.get('/threads', async (req, res) => {
    //Pagination
    let page = Number(req.query.page);
    if(!page) {
      page = 1;
    }
    const options = {
        page: page,
        sort: {updatedAt: -1},
        select: 'thread',
        populate: {
            path: 'thread', 
            select: 'title createdAt views category posts user',
            populate: [
                {path: 'user', select: 'name profile'},
                {path: 'posts.post', select: 'createdAt user', populate: {path: 'user', select: 'profile name'}}
              ]
        },
        limit: 35,
        collation: {
          locale: 'en',
        },
        lean: true
      };
    try {
        await req.user.id;
        let threads =  await MessageToUser.paginate({receiver: req.user.id}, options);
        threads.docs = threads.docs.map(thread => {
            return thread.thread;
        })
       
        res.json(threads);
    } catch (err) { 
        console.error(err)
      
        res.status(500).json('Erro de Servidor');

    }

})

// @route    GET /
// @desc     Fetch private thread and posts
// @access   Private
router.get('/thread/:id', async (req, res) => {
    //Pagination
    let page = Number(req.query.page);
    if(!page) {
      page = 1;
    }
  
    const options = {
      page: page,
      sort: {updatedAt: 1},
      populate: {path: 'user', select: 'name createdAt deslikes likes profile'},
      limit: 25,
      collation: {
        locale: 'en',
      },
      lean: true
    };
  
      
    try {
        const user = await User.findById(req.user.id).select('name').lean();

        const threadInf = await Thread.findById(req.params.id).select('title settings createdAt').lean();

        const isAuthorized =  threadInf.settings.participants.some(participant => { 
            return participant === user.name;
        });

        if(!isAuthorized) return res.status(400).json('Não Autorizado');

        const posts = await Post.paginate({thread: req.params.id, status: 'private'}, options);
       
        const thread = {id: threadInf.id, createdAt: threadInf.createdAt, title: threadInf.title, posts: posts.docs};
        res.json(thread);
        
  
    } catch (err) {
        console.error(err)
        res.status(500).json('Erro de Servidor');
  
    }
  
  })

// @route    POST /
// @desc     Make new thread
// @access   Private
router.post('/thread',
check('title', 'Título é obrigatório').isString().isLength({min: 3}),
check('category', 'Categoria é obrigatório').isString().isLength({min: 1}),
async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { title, category, postId} = req.body;

    try {
        const thread = new Thread({
            user: req.user.id,
            title,
            category,
            posts: [{post: postId}]
        });
        
        await Promise.all([
            User.findOneAndUpdate({_id :req.user.id}, {$inc : {'profile.threadCount' : 1}}),
            thread.save()
        ]);
        return res.json({id: thread._id});
    }catch(err) {
        console.error(err);
        res.status(500).json('Erro de Servidor');
    }
});

// @route    POST /
// @desc     Make new private thread
// @access   Private
router.post('/private-thread',
check('title', 'Título é obrigatório').exists().isLength({min: 3}),
async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    let {title, postId, settings} = req.body;
    
    if(settings.status !== 'private') {
        return res.json({errors: [{msg: 'Caminho Inválido'}]})
    }

    try {
        const clientUser = await User.findById(req.user.id).select('name').lean();
        settings.participants.unshift(clientUser.name);
        
        const thread = new Thread({
            user: req.user.id,
            title,
            category: 'conversation',
            settings: settings,
            posts: [{post: postId}],
            
        });

        const isUser =  await Promise.all(settings.participants.map(async participant => {
            const user = await User.findOne({name: participant}).select('_id').lean();
            return !user
        }))

        if(isUser.some(isIt => isIt )) {
                return res.status(400).json({errors: [{msg: 'Usuário Não Encontrado'}]});
            
        }

        settings.participants.map(async participant => {
                const user = await User.findOne({name: participant}).select('_id').lean();
                
                const messageToUser = new MessageToUser({
                    thread: thread._id,
                    receiver: user._id
                });
                await messageToUser.save();
        })
        
        await Promise.all([
            User.findOneAndUpdate({_id :req.user.id}, {$inc : {'profile.threadCount' : 1}}),
            thread.save()
        ])

        return res.json({id: thread._id});

        
    }catch(err) {
        console.error(err);
        res.status(500).json('Erro de Servidor');
    }
});

// @route    POST /
// @desc     Make new post
// @access   Private
router.post('/post', 
check('content', 'Conteúdo é obrigatório').isString().isLength({min: 1}),
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }

    let {
        status,
        content,
        threadId,
        postId,
        category
    } = req.body    
    

    if(!status) status = 'public';
    try {
       
        if(postId) {
            let post = await Post.findOne({_id: postId})
            post.thread = threadId;
            post.createdAt = now();
            post.save()
            return res.json('Sucesso')
        }
        
      
        post = new Post({
            status: status,
            thread: threadId,
            user: req.user.id,
            content: content,
            category: category
        });

        if(status === 'private' && threadId) {
            post.category = 'conversation';
            const [thread, user] = await Promise.all([
                Thread.findById(threadId).select('settings.participants').lean(),
                User.findById(req.user.id).select('name').lean()
            ]);

            const isAuthorized =  thread.settings.participants.some(participant => { 
                return participant === user.name;
            });

            if(!isAuthorized) return res.status(400).json('Não Autorizado');
        }

        await Promise.all([
            User.findOneAndUpdate({_id :req.user.id}, {$inc : {'profile.postCount' : 1}}),
            Thread.findByIdAndUpdate(threadId, { $push: { posts: {post: post.id} }}),
            post.save()
        ])
   
        return res.json({id: post.id})
    
        
        
    } catch(err) {
        console.error(err);
        res.status(500).json('Erro de Servidor')
    }

});

// @route    PUT /like/:id
// @desc     Like a post/thread
// @access   Private
router.put('/like/:id', checkObjectId('id'), async (req, res) => {
    let post;
    let type = 'Post'
    try {

        post = await Post.findById(req.params.id);

        // Check if the post has already been liked
      
        if (post.likes.some((like) => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: `${type} already liked` });
        }
        
        //add 1 to user's profile like count
        const reactedUser = await User.findById(post.user).select('profile');
      
        reactedUser.profile.likes = reactedUser.profile.likes + 1

        // remove the dislike and remove 1 from user's profile dislike count
        post.dislikes = post.dislikes.filter(({ user }) => {
                if (user.toString() === req.user.id) {
                    reactedUser.profile.dislikes = reactedUser.profile.dislikes - 1
                }

                return user.toString() !== req.user.id
                
            }
        );

        post.likes.unshift({ user: req.user.id });

        reactedUser.save();
        await post.save();
    
        return res.json(post.likes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
  });
  
// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post/thread
// @access   Private
router.put('/unlike/:id', checkObjectId('id'), async (req, res) => {
    let post;
    let type = 'Post'

    try {
        post = await Post.findById(req.params.id);
        
        // Check if the post has not yet been liked
        if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: `${type} has not yet been liked` });
        }

        //remove 1 from user's profile like count
        const user = await User.findById(post.user).select('profile');
   
        user.profile.likes = user.profile.likes - 1
        user.save();

        // remove the like
        post.likes = post.likes.filter(
        ({ user }) => user.toString() !== req.user.id
        );

        await post.save();

        return res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    PUT /dislike/:id
// @desc     Dislike a post/thread
// @access   Private
router.put('/dislike/:id', checkObjectId('id'), async (req, res) => {
    let post;
    let type = 'Post'
    try {
        post = await Post.findById(req.params.id);
      
        
        if (post.dislikes.some((dislike) => dislike.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: `${type} already disliked` });
        }

        //add 1 to user's profile dislike count
        const reactedUser = await User.findById(post.user).select('profile');
        reactedUser.profile.dislikes = reactedUser.profile.dislikes + 1;

        
        // remove the like and remove 1 from user's profile like count
        post.likes = post.likes.filter(({ user }) => {
            if (user.toString() === req.user.id) {
                reactedUser.profile.likes = reactedUser.profile.likes - 1;
            }

            return user.toString() !== req.user.id
            
        }
    );

        post.dislikes.unshift({ user: req.user.id });

        reactedUser.save();
        await post.save();
    
        return res.json(post.dislikes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  });
  
// @route    PUT api/posts/undo-dislike/:id
// @desc     undo dislike in a post/thread
// @access   Private
router.put('/undo-dislike/:id', checkObjectId('id'), async (req, res) => {
    let post;
    let type = 'Post'
    try {
      
        post = await Post.findById(req.params.id);

        // Check if the post has not yet been disliked
        if (!post.dislikes.some((dislike) => dislike.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: `${type} has not yet been disliked` });
        }

        //remove 1 from user's profile dislike count
        const user = await User.findById(post.user).select('profile');
        
        user.profile.dislikes = user.profile.dislikes - 1
        user.save();

        // remove the dislike
        post.dislikes = post.dislikes.filter(
        ({ user }) => user.toString() !== req.user.id
        );

        await post.save();

        return res.json(post.dislikes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        
    }
});


module.exports = router;
