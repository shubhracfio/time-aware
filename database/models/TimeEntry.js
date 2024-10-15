const { DataTypes } = require('sequelize');

module.exports = function(sequelize){
  return sequelize.define('TimeEntry', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    entry_id: { // clockify entry id
      type: DataTypes.STRING,
      allowNull: false,
    },
    project: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    nth_hour: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {
    tableName: 'time_entries',
    timestamps: false,
  });
};
