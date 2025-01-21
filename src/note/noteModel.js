"use strict";

const { DataTypes, Model } = require("sequelize");

// model needs to be connected to a database, from my understanding, which we pass in options
const { sequelizeInstance } = require("@src/db/database.js");

class Note extends Model {}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: "yellow",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "Note",
    tableName: "notes",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

module.exports = Note;
