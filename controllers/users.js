// router.post('/', usersController.addNewUser);

const { Op } = require('sequelize');
const { bcryptHashGen } = require('../utils/hashlib');
const db = require('../configs/database');
const initModels = require('../models/initModels');

const { usersModel } = initModels(db);

exports.addNewUser = async (req, res) => {
    const {
        username, password, name, active, role, reg_by
    } = {
        username: req.body?.username,
        password: req.body?.password,
        name: req.body?.name,
        active: req.body?.active ?? 1,
        role: req.body?.role ?? 1,
        reg_by: req.body?.reg_by ?? 1
    };

    if (!username || !password || !name) {
        return res.status(400).send({
            message: 'Please upload valid JSON format!'
        });
    }

    const hashedPassword = await bcryptHashGen(password);

    await usersModel.create({
        username,
        password: hashedPassword,
        name,
        active,
        role,
        reg_by
    }, { fields: ['username', 'password', 'name', 'active', 'role', 'reg_by'] })
    .then(async queryResult => {
        await usersModel.findOne({where: {id: queryResult.id}, attributes: {exclude: ['password']}})
        .then(user => {
            if (user !== null) res.send({'data': user});
            else {
                res.status(500).send({
                    message: 'The user does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while getting the newly created user!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while creating new user!'
        });
    });
};