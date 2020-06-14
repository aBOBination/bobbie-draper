module.exports = function(sequelize, DataTypes) {
  var MenuItem = sequelize.define('menu_items', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
  });

  MenuItem.associate = function(models) {
    MenuItem.belongsTo(models.trucks, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return MenuItem;
};
