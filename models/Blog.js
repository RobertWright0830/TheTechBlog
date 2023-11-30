const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//define the blog model
class Blog extends Model {}

//initialize the model's data and configuration
Blog.init(
  {
    //unique identifier for the blog post
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //title of the blog post
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //content of the blog post
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //date the blog post was created
    blog_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    //user ID of the user who created the blog post
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    //pass in the imported sequelize connection
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "blog",
  }
);

//export the model
module.exports = Blog;
