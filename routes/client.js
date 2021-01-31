const express = require('express');
const router = express.Router();


const Thread = require('../models/thread');

// @route    GET /
// @desc     Fetch threads
// @access   Public
router.get('/threads', async (req, res) => {
    //Pagination
    let page = Number(req.query.page);
    if(!page) {
      page = 1;
    }

    const options = {
        page: page,
        sort: {updatedAt: -1},
        populate: {path: 'user', select: '-password -settings'},
        limit: 35,
        collation: {
          locale: 'en',
        },
      };
      
    try {
        const pages = await Thread.paginate({}, options);

        const totalPages = pages.totalPages;
        res.json(pages.docs);
    } catch (err) {
        console.error(err.message)
        res.status(500).json('Erro de Servidor');

    }

})

module.exports = router;