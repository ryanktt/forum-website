const express = require('express');
const router = express.Router();
const checkObjectId = require('../middleware/checkObjectId');

const Thread = require('../models/thread');
const Post = require('../models/post');
const User = require('../models/user');


// @route    GET /
// @desc     Fetch threads
// @access   Public
router.get('/threads/:category', async (req, res) => {
    //Pagination
    let page = Number(req.query.page);
    if(!page) {
      page = 1;
    }

    const options = {
        page: page,
        sort: {updatedAt: -1},
        select: 'title createdAt views category posts user',
        populate: [
          {path: 'user', select: 'name profile'},
          {path: 'posts.post', select: 'createdAt user', populate: {path: 'user', select: 'profile name'}}
        ],
        limit: 35,
        collation: {
          locale: 'en',
        },
        lean: true
      };
      
    try {
        let pages;
        if(req.params.category !== 'vale-tudo') {
          pages = await Thread.paginate({category: req.params.category, 'settings.status': 'public'}, options);
        } else {
          pages = await Thread.paginate({'settings.status': 'public'}, options);
        }
     
        res.json(pages);
    } catch (err) { 
        console.error(err.message)
        res.status(500).json('Erro de Servidor');

    }

});

// @route    GET /
// @desc     Fetch thread and posts
// @access   Public
router.get('/thread/:id', async (req, res) => {
  //Pagination
  let page = Number(req.query.page);
  if(!page) {
    page = 1;
  }

  const options = {
    page: page,
    sort: {createdAt: 1},
    populate: {path: 'user', select: 'name createdAt deslikes likes profile'},
    limit: 25,
    collation: {
      locale: 'en',
    },
    lean: true
  };

    
  try {
      const [threadInfo, posts] = await Promise.all([
        Thread.findById({_id: req.params.id, 'settings.status': 'public'}).select('title createdAt category').lean(),
        Post.paginate({thread: req.params.id, status: 'public'}, options)
      ]) 
      const thread = {id: threadInfo.id, createdAt: threadInfo.createdAt, title: threadInfo.title, category: threadInfo.category, posts: posts.docs}
      res.json(thread);
      

  } catch (err) {
      console.error(err)
      res.status(500).json('Erro de Servidor');

  }

});

// @route    GET /
// @desc     Fetch post
// @access   Public
router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    res.json(post)
  } catch (err) {
      console.error(err)
      res.status(500).json('Erro de Servidor');

  }

});

// @route    GET /
// @desc     Fetch user by id
// @access   Public
router.get('/member/:id', checkObjectId('id'), async(req, res) => {
  try {
    // const user = await User.findById(req.params.id).select('-settings -ip -email -password')
    // const postCount = await Post.countDocuments({user: req.params.id})
    // const threadCount = await Thread.countDocuments({user: req.params.id})

    const user = await User.findById(req.params.id).select('-settings -ip -email -password').lean();

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json('Erro de Servidor');
  }
});

// @route    GET /
// @desc     Fetch user threads
// @access   Public
router.get('/member/threads/:id', checkObjectId('id'), async(req, res) => {
  //Pagination
  let page = Number(req.query.page);

  if(!page) {
    page = 1;
  }

  
  const options = {
    page: page,
    sort: {createdAt: -1},
    select: 'title createdAt views category posts',
    populate: {path: 'posts.post', select: 'createdAt user', populate: {path: 'user', select: 'profile name'}},
    limit: 20,
    collation: {
      locale: 'en',
    },
    lean: true
  };

  try {
    const threads = await Thread.paginate({user: req.params.id, 'settings.status': 'public'}, options)

    res.json(threads);
  } catch (err) {
    console.error(err);
    res.status(500).json('Erro de Servidor');
  }
});

// @route    GET /
// @desc     Fetch user posts
// @access   Public
router.get('/member/posts/:id', checkObjectId('id'), async(req, res) => {
  //Pagination
  let page = Number(req.query.page);
  if(!page) {
    page = 1;
  }

  const options = {
    page: page,
    sort: {createdAt: -1},
    select: 'user thread content createdAt',
    populate: {path: 'thread', select: 'title category'},
    limit: 20,
    collation: {
      locale: 'en',
    },
    lean: true
  };

  try {
    const posts = await Post.paginate({user: req.params.id, status: 'public'}, options)
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json('Erro de Servidor');
  }
});
 
// @route    GET /
// @desc     Fetch category data
// @access   Public
router.get('/categories/:category', async (req, res) => {
  //Pagination
  try {
    const category = req.params.category;
    
    const [threadCount, postCount, lastPost] = await Promise.all([
      Thread.countDocuments({category: category}),
      Post.countDocuments({category: category}),
      Post.find({category: category})
        .populate([{path: 'thread', select: 'title'}, {path: 'user', select: 'name'}])
        .select('createdAt')
        .sort({createdAt: -1})
        .limit(1)
        .lean()
    ]);

    res.json({threadCount, postCount, lastPost})
  } catch (err) { 
      console.error(err.message)
      res.status(500).json('Erro de Servidor');

  }

});


module.exports = router;