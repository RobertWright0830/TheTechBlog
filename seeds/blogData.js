const { Blog } = require('../models');

const blogdata = [
  {
    id:1,
    title: 'Why MVC is so important',
    content: 'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.',
    blog_date: new Date(),
    user_id: 1,
  },
  {
    id:2,
    title: 'Authentication vs. Authorization',
    content: 'There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.',
    blog_date: new Date(),
    user_id: 1,
  },
];

const seedBlog = () => Blog.bulkCreate(blogdata);

module.exports = seedBlog;
