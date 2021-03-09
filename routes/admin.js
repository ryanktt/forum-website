const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const checkObjectId = require('../middleware/checkObjectId');

const User = require('../models/user');
const Post = require('../models/post');
const Thread = require('../models/thread');
const MessageToUser = require('../models/messageToUser');

// @route    PUT /
// @desc     Edit profile
// @access   Private
router.put('/account/update-profile/:id', async(req, res, next) => {

    const {userImg, description} = req.body;

    try {
        const user = await User.findById(req.params.id);
        user.profile.userImg = userImg;
        user.profile.description = description;
        await user.save()
        res.status(200).json('Sucesso');
    } catch (err) {
        res.status(500).json('Erro de Servidor');
        console.error(err);
    }
})

// @route    PUT /
// @desc     Ban user
// @access   Private
router.put('/ban/:id', checkObjectId('id'),
check('time', 'Selecione o Tempo de Banimento').notEmpty().exists(),
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {time} = req.body;

    try {
        const user = await User.findById(req.params.id);

        if (user.settings.status > 1) {                       //check if user has already been banned
            return res.status(400).json({ errors: [{msg: 'Usuário já Está Banido'}]});
        }
        if (time !== 'permanent') {
            user.settings.status = 2;
            user.settings.allowAccessFrom = Date.now() + time*24*60*60*1000;
        } else {
            user.settings.status = 3;
        }

        user.save();
        res.json('Banido com Sucesso')
    } catch (err) {
        console.error(err)
        res.status(500).json('Erro de Servidor');
    }

});

// @route    PUT /
// @desc     Unban
// @access   Private
router.put('/unban/:id', checkObjectId('id'),
async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        if(user.settings.status === 1) {
            return res.status(400).json({ errors: [{msg: 'Usuário Não Está Banido'}]});
        }
        user.settings.status = 1;
        user.settings.allowAccessFrom = Date.now() - 7*24*60*60*1000;

        user.save();
        res.json('Banido com Sucesso')
    } catch (err) {
        console.error(err)
        res.status(500).json('Erro de Servidor');
    }

});

// @route    PUT /
// @desc     Edit thread
// @access   Private
router.put('/thread/:id',
check('title', 'Título é obrigatório').isString().isLength({min: 3}),
check('category', 'Categoria é obrigatório').isString().isLength({min: 1}),
check('content', 'Conteúdo é obrigatório').isString().isLength({min: 3}),
check('title', 'Título Excede o Limite de Caracteres').exists().isLength({max: 150}),
async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { title, category, content } = req.body;

    try {
        //edit thread
        const thread = await Thread.findById(req.params.id).select('posts category title');
        thread.category = category;
        thread.title = title;

        //edit thread's first post
        const postId = thread.posts[0].post;
        const post = await Post.findById(postId);
        post.content = content;

        await Promise.all([
            thread.save(),
            post.save()
        ]);

        res.json('Sucesso');
    }catch(err) {
        console.error(err);
        res.status(500).json('Erro de Servidor');
    }
});



// @route    DELETE /
// @desc     Delete thread 
// @access   Private
router.delete('/thread/:id', checkObjectId('id'), async (req, res) => {
    const threadId = req.params.id;

    try {
  
        await Promise.all([
            Thread.findByIdAndDelete(threadId),
            Post.deleteMany({thread: threadId}),
            MessageToUser.deleteMany({thread: threadId})
        ])


        res.json({msg: 'Deletado com Sucesso'});

    } catch(err) {
        console.error(err);
        res.status(500).json('Erro de Servidor')
    }

});

// @route    DELETE /
// @desc     Delete post 
// @access   Private
router.delete('/post/:id', checkObjectId('id'), async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findByIdAndDelete(postId).lean();
        let thread = await Thread.findById(post.thread);

        //remove post from arr in thread model
        thread.posts = thread.posts.filter(postObj => String(postObj.post) !== postId);
        thread.save();

        res.json({msg: 'Deletado com Sucesso'});

    } catch(err) {
        console.error(err);
    }

});

// @route    PUT /
// @desc     Edit post
// @access   Private
router.put('/edit-post/:id', checkObjectId('id'),
check('content', 'Conteúdo é obrigatório').isLength({min: 3}),
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json({errors: errors.array()})
    }
    const postId = req.params.id;

    const updatedContent = req.body.content;

    try {
        await Post.updateOne({_id: postId}, {content: updatedContent})
        
        res.json({msg: 'sucesso'});

    } catch(err) {
        console.error(err);
    }

});

module.exports = router;