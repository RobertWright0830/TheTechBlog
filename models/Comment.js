const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the comment model
class Comment extends Model {}

// Initialize the model's data and configuration
Comment.init(
  {
    // Unique identifier for the comment
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Content of the comment
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Date the comment was created
    comment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // User ID of the user who created the comment
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    // Blog ID of the blog post the comment is associated with
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blog',
        key: 'id',
      },
    },
  },
  {
    // Pass in the imported sequelize connection
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

// Export the model
module.exports = Comment;
