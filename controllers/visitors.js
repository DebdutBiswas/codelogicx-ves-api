// router.get('/', visitorsController.getAllVisitors);
// router.post('/', visitorsController.addNewVisitor);
// router.get('/:id', visitorsController.getVisitorById);

// router.post('/search', visitorsController.searchVisitorByParams);
// router.post('/checkout', visitorsController.checkoutVisitor);

const { Op } = require('sequelize');
const db = require('../configs/database');
const initModels = require('../models/initModels');

const { visitorsModel, logsModel } = initModels(db);

exports.getAllVisitors = async (req, res) => {
    await visitorsModel.findAll({order: [['id', 'DESC']]})
    .then(visitors => {
        if (visitors === null || visitors.length === 0) {
            res.status(500).send({
                message: 'No visitors exist!'
            });
        } else {
            res.send({'data': visitors});
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting list of visitors!'
        });
    });
};

exports.addNewVisitor = async (req, res) => {
    const {
        first_name,
        last_name,
        phone,
        last_met_with,
        checkout_count,
        last_checkout_time
    } = {
        first_name: req.body?.first_name,
        last_name: req.body?.last_name,
        phone: req.body?.phone,
        last_met_with: req.body?.last_met_with ?? '',
        checkout_count: req.body?.checkout_count ?? 0,
        last_checkout_time: req.body?.last_checkout_time ?? null
    };

    if (!first_name || !last_name || !phone) {
        return res.status(400).send({
            message: 'Please upload valid JSON format!'
        });
    }

    await visitorsModel.create({
        first_name,
        last_name,
        phone,
        last_met_with,
        checkout_count,
        last_checkout_time
    }, { fields: ['first_name', 'last_name', 'phone', 'last_met_with', 'checkout_count', 'last_checkout_time'] })
    .then(async queryResult => {
        await visitorsModel.findOne({where: {id: queryResult.id}})
        .then(visitor => {
            if (visitor !== null) res.send({'data': visitor});
            else {
                res.status(500).send({
                    message: 'The visitor does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while getting the newly created visitor!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while creating new visitor!'
        });
    });
};

exports.getVisitorById = async (req, res) => {
    await visitorsModel.findOne({where: {id: req.params.id}})
    .then(visitor => {
        if (visitor !== null) res.send({'data': visitor});
        else {
            res.status(500).send({
                message: 'The visitor does not exist!'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting the visitor!'
        });
    });
};

exports.searchVisitorByParams = async (req, res) => {

};

exports.checkoutVisitor = async (req, res) => {

};