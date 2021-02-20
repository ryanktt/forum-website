const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const checkObjectId = require('../middleware/checkObjectId');
const mongoose = require('mongoose');

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
        res.status(500).json('Erro de Servidor');
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
        await Post.updateOne({_id: postId}, {content: updatedContent})
        
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
