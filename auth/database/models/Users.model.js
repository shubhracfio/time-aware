const { DataTypes } = require('sequelize');
const crypto = require('crypto');

module.exports = function(sequelize){
  return sequelize.define('Users', {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true,
      defaultValue: () => crypto.randomUUID(),
    },
    email: {
      type: DataTypes.TEXT,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email_verified: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
