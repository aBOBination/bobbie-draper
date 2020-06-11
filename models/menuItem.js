module.exports = function(sequelize, DataTypes) {
  var MenuItem = sequelize.define('menu_items', {
    name: DataTypes.STRING
  });

  MenuItem.associate = function(models) {
    MenuItem.belongsTo(models.menus, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return MenuItem;
};
