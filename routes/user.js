const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const mongoose = require('mongoose');

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



module.exports = router;
