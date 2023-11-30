const router = require('express').Router();
const { Blog, Comment } = require('../models');

// GET all user blogs for dashboard
router.get('/dashboard', async (req, res) => {
  try {

    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
    });

   } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET new post form
router.get('/newpost', async (req, res) => {
  try {

    res.render('newpost', {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Submit new blog
router.post('/blog', async (req, res) => {
  try {

      const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
      blog_date: new Date(),
    });

    // Redirect the user to the dashboard route
    res.redirect(`/dashboard`);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



// Submit comment
router.post('/blog/:id/comment', async (req, res) => {
  try {

    // Log the received blog post ID
    console.log('Received Blog Post ID:', req.params.id);
    
      const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      blog_id: req.params.id,
      comment_date: new Date(),
    });

    // Redirect the user to the updated /blog/:id route
    res.redirect(`/blog/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET all blogs for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      include: [
        {
          model: Comment,
          attributes: ['content', 'user_id', 'blog_id'],
        },
      ],
    });

    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
    );
    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get('/blog/:id', async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ['content', 'user_id', 'blog_id'],
        },
      ],
    }); 

    const blog = dbBlogData.get({ plain: true });

// Log the template context before rendering the template
console.log('Template Context:', { blog, loggedIn: req.session.loggedIn });

    res.render('blog', { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
