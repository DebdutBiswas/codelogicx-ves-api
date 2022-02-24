// router.get('/', logsController.getAllLogs);
// router.post('/', logsController.addNewLog);
// router.get('/:id', logsController.getLogById);

// router.post('/search', logsController.searchLogByParams);

const { Op } = require('sequelize');
const db = require('../configs/database');
const { getISOTimeStamp } = require('../utils/timelib');
const initModels = require('../models/initModels');

const { logsModel, visitorsModel } = initModels(db);

exports.getAllLogs = async (req, res) => {
    await logsModel.findAll({order: [['id', 'DESC']]})
    .then(logs => {
        if (logs === null || logs.length === 0) {
            res.status(500).send({
                message: 'No logs exist!'
            });
        } else {
            res.send({'data': logs});
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting list of logs!'
        });
    });
};

exports.addNewLog = async (req, res) => {
    const {
        visitor_id,
        meet_with,
        checkout_purpose,
        checkout_done,
        in_time,
        out_time
    } = {
        visitor_id: req.body?.visitor_id,
        meet_with: req.body?.meet_with,
        checkout_purpose: req.body?.checkout_purpose ?? '',
        checkout_done: req.body?.checkout_done ?? 0,
        in_time: req.body?.in_time ?? getISOTimeStamp(),
        out_time: req.body?.out_time ?? null,
    };

    if (!visitor_id || !meet_with) {
        return res.status(400).send({
            message: 'Please upload valid JSON format!'
        });
    }

    await logsModel.create({
        visitor_id,
        meet_with,
        checkout_purpose,
        checkout_done,
        in_time,
        out_time
    }, { fields: ['visitor_id', 'meet_with', 'checkout_purpose', 'checkout_done', 'in_time', 'out_time'] })
    .then(async queryResult => {
        await logsModel.findOne({where: {id: queryResult.id}})
        .then(log => {
            if (log !== null) res.send({'data': log});
            else {
                res.status(500).send({
                    message: 'The log does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while getting the newly created log!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while creating new log!'
        });
    });
};

exports.getLogById = async (req, res) => {
    await logsModel.findOne({where: {id: req.params.id}})
    .then(log => {
        if (log !== null) res.send({'data': log});
        else {
            res.status(500).send({
                message: 'The log does not exist!'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting the log!'
        });
    });
};

exports.searchLogByParams = async (req, res) => {

};