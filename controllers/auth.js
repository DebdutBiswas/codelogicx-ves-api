// router.post('/getToken', authController.getToken);
// router.post('/refreshToken', authController.refreshToken);
// router.delete('/invalidateToken', authController.invalidateToken);

const { Op } = require('sequelize');
const { bcryptHashCheck } = require('../utils/hashlib');
const { generateAccessToken, generateRefreshToken, verifyAccessToken } = require('../configs/auth');
const db = require('../configs/database');
const initModels = require('../models/initModels');

const { usersModel } = initModels(db);

exports.getToken = async (req, res) => {
    if (!req.body?.username || !req.body?.password) {
        return res.status(400).send({
            message: 'Please upload valid JSON format!'
        });
    }
    
    await usersModel.findOne({where: {username: req.body.username?.trim()}})
    .then(user => {
        if (user !== null) {
            const {password, ...userData} = user.dataValues;

            bcryptHashCheck(req.body.password?.trim(), password, (err, hashCheckResult) => {
                if (err) {
                    return res.status(401).send({
                        message: 'Unauthorized!'
                    });
                }

                if (hashCheckResult) {
                    const accessToken = generateAccessToken(userData, '1d');
                    const refreshToken = generateRefreshToken(userData);
        
                    res.send({accessToken, refreshToken});
                } else {
                    res.status(401).send({
                        message: 'Unauthorized!'
                    });
                }
            });
        }
        else {
            res.status(401).send({
                message: 'Unauthorized!'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong!'
        });
    });
};

exports.refreshToken = async (req, res) => {

};

exports.invalidateToken = async (req, res) => {

};