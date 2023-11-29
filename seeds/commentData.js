const { Comment } = require('../models');

const commentdata = [
  {
    id: 1,
    content: 'This is a test comment string.',
    comment_date: new Date(),
    blog_id: 1,
    user_id: 1,
  },
  {
    id: 2,
    content: 'This is another test comment string.',
    comment_date: new Date(),
    blog_id: 2,
    user_id: 1,
  },
  {
    id: 3,
    content: 'This is yet another test comment string.',
    comment_date: new Date(),
    blog_id: 2,
    user_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
