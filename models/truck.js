module.exports = function(sequelize, DataTypes) {
  var Restaurant = sequelize.define('trucks', {
    name: DataTypes.STRING,
    street1: DataTypes.STRING,
    street2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postcode: DataTypes.STRING,
    country: DataTypes.STRING,
    phone_number: DataTypes.STRING,
  });

  // Restaurant.associate = function(models) {
  //   Restaurant.belongsTo(models.users, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  Restaurant.associate = function(models) {
    Restaurant.hasMany(models.menu_items, {
      onDelete: 'cascade',
    });
  };

  return Restaurant;
};
