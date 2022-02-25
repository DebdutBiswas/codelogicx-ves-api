// router.get('/', visitorsController.getAllVisitors);
// router.post('/', visitorsController.addNewVisitor);
// router.get('/:id', visitorsController.getVisitorById);

// router.post('/search', visitorsController.searchVisitorByParams);
// router.post('/checkout', visitorsController.checkoutVisitor);

const { Op, literal } = require('sequelize');
const db = require('../configs/database');
const { checkDateFormat, getISOTimeStamp, getISODate } = require('../utils/timelib');
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
        first_name: req.body?.first_name ?? req.body.first_name ? req.body.first_name?.trim?.() : '',
        last_name: req.body?.last_name ?? req.body.last_name ? req.body.last_name?.trim?.() : '',
        phone: req.body?.phone ?? req.body.phone ? req.body.phone?.trim?.() : '',
        last_met_with: req.body?.last_met_with ?? req.body.last_met_with ? req.body.last_met_with?.trim?.() : '',
        checkout_count: 0,
        last_checkout_time: null
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
    const {
        first_name,
        phone
    } = {
        first_name: req.body?.first_name ?? req.body.first_name ? req.body.first_name?.trim?.() : '',
        phone: req.body?.phone ?? req.body.phone ? req.body.phone?.trim?.() : '',
    };

    if (!first_name && !phone) {
        return res.status(400).send({
            message: 'Please upload valid JSON format!'
        });
    }

    let searchParams = {};

    if (first_name) searchParams = { ...searchParams, first_name };
    if (phone) searchParams = { ...searchParams, phone };

    await visitorsModel.findAll({where: searchParams, order: [['id', 'DESC']]})
    .then(visitors => {
        if (visitors !== null) res.send({'data': visitors});
        else {
            res.status(500).send({
                message: 'No visitors exist!'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting list of visitors!'
        });
    });
};

exports.checkoutVisitor = async (req, res) => {
    const {
        id,
        checkout_done,
        out_time
    } = {
        id: req.body?.id ?? req.body.id ? req.body.id : 0,
        checkout_done: 1,
        out_time: checkDateFormat(req.body?.out_time?.trim?.() ?? '') ? getISODate(req.body.out_time.trim?.()) : getISOTimeStamp()
    };

    if (id === 0) {
        return res.status(400).send({
            message: 'Please upload valid JSON format!'
        });
    }

    console.log({id, out_time});

    logSearchParams = {
        id,
        checkout_done: 0
    };

    await logsModel.update({
        checkout_done,
        out_time
    }, {where: logSearchParams}, { fields: ['checkout_done', 'out_time']})
    .then(async logUpdateQueryResult => {
        [ logUpdateResult ] = logUpdateQueryResult;
        console.log(logUpdateResult);

        if (!logUpdateResult) {
            res.status(500).send({
                message: 'The log does not exist or already checked out!'
            });
        } else {
            await logsModel.findOne({where: {id}, include: [{model: visitorsModel, as: 'visitor_info', where: {}, attributes: {exclude: ['id']}}]})
            .then(async log => {
                if (log !== null) {
                    await visitorsModel.update({
                        checkout_count: literal('checkout_count + 1'),
                        last_checkout_time: out_time
                    }, {where: {id: log.dataValues.visitor_id}}, { fields: ['checkout_done', 'out_time']})
                    .then(visitorUpdateQueryResult => {
                        [ visitorUpdateResult ] = visitorUpdateQueryResult;

                        if (!visitorUpdateResult ) {
                            res.status(500).send({
                                message: 'The visitor does not exist or already checked out!'
                            });
                        } else {
                            res.send({
                                'data': {
                                    ...log.dataValues,
                                    visitor_info: {
                                        ...log.dataValues.visitor_info.dataValues,
                                        checkout_count: (+log.dataValues.visitor_info.dataValues.checkout_count + 1),
                                        last_checkout_time: out_time
                                    }
                                }
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            data: {...log.dataValues},
                            message: err.message || 'Something went wrong while updating visitor!'
                        });
                    });
                }
                else {
                    res.status(500).send({
                        message: 'The log does not exist!'
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Something went wrong while getting the updated log!'
                });
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while updating log!'
        });
    });
};