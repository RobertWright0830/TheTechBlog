const router = require('express').Router();
const { Blog } = require('../models');

// Get all user blogs
router.get('/', async (req, res) => {
    try {
      const userBlogs = await Blog.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
  
      res.render('dashboard', {
        userBlogs,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  // Add more routes for creating, updating, and deleting blog posts
  
  module.exports = router;