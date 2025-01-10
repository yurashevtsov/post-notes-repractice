"use strict";

const { DataTypes, Model } = require("sequelize");

// model needs to be connected to a database, from my understanding, which we pass in options
const { sequelizeInstance } = require("@src/db/database.js");

class User extends Model {}

User.init(
  //model properties
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: "username",
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: "email",
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: "default.png",
    },
  },
  // options
  {
    sequelize: sequelizeInstance,
    modelName: "user",
    tableName: "users",
    timestamps: true, // to enable timestamps it must be set to true
    updatedAt: "updated_at", // I want to enable updatedAt timestamp to for JWT verification, if user was updated after JWT was issued
    createdAt: false,
  }
);

module.exports = User;
