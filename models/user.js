module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('users', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  });
  // User.associate = function(models) {
  //   User.hasMany(models.restaurants, {
  //     onDelete: 'cascade'
  //   });
  // };
  return User;
};
