"use strict";

const { DataTypes, Model } = require("sequelize");

// model needs to be connected to a database, from my understanding, which we pass in options
const { sequelizeInstance } = require("@src/db/database.js");
const passwordService = require("@src/auth/passwordService.js");

class User extends Model {
  toJSON() {
    const attributes = this.get();
    Reflect.deleteProperty(attributes, "password");
    return attributes;
  }
}

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
    changedPasswordAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  // options
  {
    sequelize: sequelizeInstance,
    modelName: "User",
    tableName: "users",
    timestamps: true, // to enable timestamps it must be set to true
    updatedAt: true, // I want to enable updatedAt timestamp to for JWT verification, if user was updated after JWT was issued
    createdAt: true,
    // by default password is hidden even if its required by another table, when I need password, another scope is defined to help with it
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    scopes: {
      withPassword: {
        attributes: {},
      },
    },
  }
);

// eslint-disable-next-line no-unused-vars
User.addHook("beforeSave", "passwordHashOnSaveOrUpdate", async (instance, options) => {
  if (instance.isNewRecord || instance.changed("password")) {
    const hashedPassword = await passwordService.hashPassword(
      instance.password
    );
    instance.password = hashedPassword;
    instance.changedPasswordAt = new Date();
  }
});

module.exports = User;

/* 
  A note for the hooks: 
  I can access properties of an instance like that or directly
  console.log(`Datavalues username?${instance.dataValues.username}`); 

  Instead o figuring how to make 2 hooks not interfering with each other, I can use this 2 properties in ONE hook instead!

  instance.changed("password"); - will be true, if property was changed
  instance.isNewRecord; - will be true, if its a newly created record
  */
