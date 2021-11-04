'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subbreaddit = sequelize.define('Subbreaddit', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    safeForBread: DataTypes.BOOLEAN
  }, {});
  Subbreaddit.associate = function(models) {
    // associations can be defined here
    Subbreaddit.hasMany(models.Post, { foreignKey: 'subId' })

    const columnMapping = {
      through: 'Subscription',
      foreignKey: 'subId',
      otherKey: 'userId'
    }

    Subbreaddit.belongsToMany(models.User, columnMapping)
  };
  return Subbreaddit;
};