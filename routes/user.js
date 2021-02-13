const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const checkObjectId = require('../middleware/checkObjectId');

const User = require('../models/user');
const Post = require('../models/post');
const Thread = require('../models/thread');




// @route    GET /
// @desc     Get user by token
// @access   Private
router.get('/', async(req, res) => {
    try {
        
        const user = await User.findById(req.user.id).select('-email -ip -password -settings');
        res.json(user)
  
    } catch (err) {
      console.error(err);
      res.status(500).json('Erro de Servidor')
    }
  })

// @route    POST /
// @desc     Make new thread
// @access   Private
router.post('/thread',
check('title', 'Título é obrigatório').exists(),
check('category', 'Categoria é obrigatório').exists(),
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }

    const { title, category, postId} = req.body;
   
    try {
        const thread = new Thread({
            user: req.user.id,
            title,
            category,
            posts: [{post: postId}]
        });
        

        await thread.save();
        return res.json({id: thread._id});
    }catch(err) {
        console.error(err);
        res.status(500).json('Erro de Servidor')
    }
});

// @route    POST /
// @desc     Make new post
// @access   Private
router.post('/post', 
check('content', 'Conteúdo é obrigatório').exists(),
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }

    const {
        content,
        threadId,
        postId
    } = req.body    


    try {
       
        if(postId) {
            await Post.updateOne({_id: postId}, {$set: { thread: threadId}})
            return res.json('Sucesso')
        }
        
      
        const post = new Post({
            thread: threadId,
            user: req.user.id,
            content: content
        });

        await Thread.findByIdAndUpdate(threadId, { $push: { posts: {post: post.id} }})

        await post.save();
        console.log(post)
        return res.json({id: post.id})
    
        
        
    } catch(err) {
        console.error(err);
        res.status(500).json('Erro de Servidor')
    }

});

// @route    DELETE /
// @desc     Delete post if admin
// @access   Private
router.delete('/post/:post_id', 
async (req, res) => {
    const postId = req.params.post_id;

    try {
        //check if it's admin 

        await Post.findByIdAndDelete(postId);
        res.json({msg: 'successfully deleted'});

    } catch(err) {
        console.error(err);
    }

});

// @route    PUT /
// @desc     Edit post
// @access   Private
router.put('/post/:post_id', 
check('content', 'Conteúdo é obrigatório').exists(),
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json({errors: errors.array()})
    }
    const postId = req.params.post_id;

    const updatedContent = req.body.content;

    try {
        await Post.findByIdAndUpdate(postId, {content: updatedContent})
        
        res.json({msg: 'successfully edited'});

    } catch(err) {
        console.error(err);
    }

});


// @route    PUT /like/:id
// @desc     Like a post/thread
// @access   Private
router.put('/like/:id', checkObjectId('id'), async (req, res) => {
    let post;
    let type = 'Post'
    try {
        //Check if it's a post or a thread
        if(req.query.type === 'thread') {
            type = 'Thread';
            post = await Thread.findById(req.params.id);
        } else {
            post = await Post.findById(req.params.id);
        }
  
      // Check if the post has already been liked
      if (post.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: `${type} already liked` });
      }
  
      post.likes.unshift({ user: req.user.id });
  
      await post.save();
  
      return res.json(post.likes);
    } catch (err) {
      console.error(err.message);
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
        //Check if it's a post or a thread
        if(req.query.type === 'thread') {
            post = await Thread.findById(req.params.id);
            type = 'Thread';
        } else {
            post = await Post.findById(req.params.id);
        }
        // Check if the post has not yet been liked
        if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: `${type} has not yet been liked` });
        }

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
        //Check if it's a post or a thread
        // if(req.query.type === 'thread') {
        //     post = await Thread.findById(req.params.id);
        //     type = 'Thread';
        // } else {
        post = await Post.findById(req.params.id);
        // }
  
        // Check if the post has already been disliked
        
        if (post.unlikes.some((unlike) => unlike.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: `${type} already disliked` });
        }
    
        post.unlikes.unshift({ user: req.user.id });
    
        await post.save();
    
        return res.json(post.unlikes);
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
        //Check if it's a post or a thread
        // if(req.query.type === 'thread') {
        //     post = await Thread.findById(req.params.id);
        //     type = 'Thread';
        // } else {
        post = await Post.findById(req.params.id);
        // }
        // Check if the post has not yet been disliked
        if (!post.unlikes.some((unlike) => unlike.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: `${type} has not yet been disliked` });
        }

        // remove the dislike
        post.unlikes = post.unlikes.filter(
        ({ user }) => user.toString() !== req.user.id
        );

        await post.save();

        return res.json(post.unlikes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        
    }
});



module.exports = router;
