module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });
  // User.associate = function(models) {
  //   User.hasMany(models.restaurants, {
  //     onDelete: 'cascade'
  //   });
  // };
  return User;
};
