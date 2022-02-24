const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('visitor_log', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    visitor_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'visitor_info',
        key: 'id'
      }
    },
    meet_with: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    checkout_purpose: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    checkout_done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    entry_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    out_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'visitor_log',
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
      {
        name: "Id_Attribute_On_visitor_log",
        using: "BTREE",
        fields: [
          { name: "visitor_id" },
        ]
      },
    ]
  });
};
