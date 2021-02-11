const express = require('express');
const router = express.Router();


const Thread = require('../models/thread');
const Post = require('../models/post');

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
        select: 'title createdAt views category',
        populate: [
          {path: 'user', select: 'name profile'},
          {path: 'posts.post', select: 'createdAt user', populate: {path: 'user', select: 'profile name'}}
        ],
        limit: 15,
        collation: {
          locale: 'en',
        },
        lean: true
      };
      
    try {
        let pages;
        if(req.params.category !== 'vale-tudo') {
          pages = await Thread.paginate({category: req.params.category}, options);
        } else {
          pages = await Thread.paginate({}, options);
        }
     
        res.json(pages);
    } catch (err) { 
        console.error(err.message)
        res.status(500).json('Erro de Servidor');

    }

})

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
      const threadInfo = await Thread.findById({_id: req.params.id}).select('title createdAt');
      const posts = await Post.paginate({thread: req.params.id}, options)
      const thread = {id: threadInfo.id, createdAt: threadInfo.createdAt, title: threadInfo.title, posts: posts.docs}
      res.json(thread);
      

  } catch (err) {
      console.error(err)
      res.status(500).json('Erro de Servidor');

  }

})

module.exports = router;