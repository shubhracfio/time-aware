const { DataTypes } = require('sequelize');

module.exports = function(sequelize){
  return sequelize.define('Accounts', {
    id: {
      type: DataTypes.UUID,
      allowNull: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    provider: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    providerAccountId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    access_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    expires_at: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    token_type: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    scope: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    id_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    session_state: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  });
};
