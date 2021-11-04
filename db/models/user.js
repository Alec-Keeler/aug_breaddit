'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Post, { foreignKey: 'userId' } )

    const columnMapping = {
      through: 'Subscription',
      foreignKey: 'userId',
      otherKey: 'subId'
    }

    User.belongsToMany(models.Subbreaddit, columnMapping)
  };
  return User;
};