const { DataTypes } = require('sequelize');

module.exports = function(sequelize){
  return sequelize.define('Sessions', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    session_token: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  });
};
