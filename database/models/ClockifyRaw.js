const { DataTypes } = require('sequelize');

module.exports = function(sequelize){
  return sequelize.define('ClockifyRaw', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    Department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Project: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Task: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Tags: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    Billable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    StartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    StartTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    EndDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    EndTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  }, {
    tableName: 'clockify_raw',
    timestamps: false,
  });
};
