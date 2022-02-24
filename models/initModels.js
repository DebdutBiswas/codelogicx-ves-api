const { DataTypes } = require('sequelize');

const _usersModel = require('./users');
const _visitorsModel = require('./visitors');
const _logsModel = require('./logs');

module.exports = (sequelize) => {
  const usersModel = _usersModel(sequelize, DataTypes);
  const visitorsModel = _visitorsModel(sequelize, DataTypes);
  const logsModel = _logsModel(sequelize, DataTypes);

  logsModel.belongsTo(visitorsModel, { as: "visitor", foreignKey: "visitor_id"});
  visitorsModel.hasMany(logsModel, { as: "visitor_logs", foreignKey: "visitor_id"});

  // visitor_log.belongsTo(visitor_info, { as: "visitor", foreignKey: "visitor_id"});
  // visitor_info.hasMany(visitor_log, { as: "visitor_logs", foreignKey: "visitor_id"});

  return {
    usersModel,
    visitorsModel,
    logsModel
  };
}
