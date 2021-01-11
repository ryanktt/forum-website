const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const mongoose = require('mongoose');
const checkObjectId = require('../middleware/checkObjectId');

const User = require('../models/user');
const Post = require('../models/post');
const Thread = require('../models/thread');


// @route    POST /
// @desc     Make new thread
// @access   Private
router.post('/thread', authMiddleware,
check('title', 'Título é obrigatório').exists(),
check('content', 'Conteúdo é obrigatório').exists(),
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }

    const {
        title,
        content 
    } = req.body;
    try {
        const user = await User.findOne({id: req.user.id});
        thread = new Thread({
            user: req.user.id,
            title: title,
            content: content
        });
        await thread.save();
        res.json({msg: 'Succesfully achieved'})
    }catch(err) {
        console.error(err);
    }
});

// @route    POST /
// @desc     Make new post
// @access   Private
router.post('/post', 
authMiddleware,
check('content', 'Conteúdo é obrigatório').exists(),
async (req, res) => {

    const {
        thread_id,
        content
    } = req.body    

    try {
        

        const post = new Post({
            thread: thread_id,
            user: req.user.id,
            content: content
        });

        await post.save();

        res.json({msg: 'succesfully posted'});

    } catch(err) {
        console.error(err);
    }
    

});

// @route    DELETE /
// @desc     Delete post if admin
// @access   Private
router.delete('/post/:post_id', 
authMiddleware,
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
authMiddleware,
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
router.put('/like/:id', authMiddleware, checkObjectId('id'), async (req, res) => {
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
router.put('/unlike/:id', authMiddleware, checkObjectId('id'), async (req, res) => {
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
router.put('/dislike/:id', authMiddleware, checkObjectId('id'), async (req, res) => {
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
router.put('/undo-dislike/:id', authMiddleware, checkObjectId('id'), async (req, res) => {
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
