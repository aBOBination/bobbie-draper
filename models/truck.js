module.exports = function(sequelize, DataTypes) {
  var Truck = sequelize.define('trucks', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    website: DataTypes.STRING,
    img_url: DataTypes.STRING
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
