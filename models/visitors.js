const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('visitor_info', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(127),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(127),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    reg_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    last_met_with: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    checkout_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    last_checkout_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'visitor_info',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
