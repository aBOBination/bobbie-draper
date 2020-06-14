module.exports = function(sequelize, DataTypes) {
  var Truck = sequelize.define('trucks', {
    name: DataTypes.STRING,
    street1: DataTypes.STRING,
    street2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postcode: DataTypes.STRING,
    country: DataTypes.STRING,
    phone_number: DataTypes.STRING
  });

  // Truck.associate = function(models) {
  //   Truck.belongsTo(models.users, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  Truck.associate = function(models) {
    Truck.hasMany(models.menu_items, {
      onDelete: 'cascade'
    });
  };

  return Truck;
};
