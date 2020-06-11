module.exports = function(sequelize, DataTypes) {
  var Menu = sequelize.define('menus', {
    name: DataTypes.STRING
  });

  Menu.associate = function(models) {
    Menu.belongsTo(models.restaurants, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Menu.associate = function(models) {
    Menu.hasMany(models.menu_items, {
      onDelete: 'cascade'
    });
  };

  return Menu;
};
