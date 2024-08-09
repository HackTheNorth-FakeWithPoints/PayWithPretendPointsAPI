const { Model, DataTypes } = require("sequelize");
const sequelize = require("../index");

class User extends Model {}

User.init(
  {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
