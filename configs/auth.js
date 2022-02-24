const dotEnv = require('dotenv');
const jwt = require('jsonwebtoken');

dotEnv.config({ encoding: 'utf-8' });

const { accessTokenSecret, refreshTokenSecret } = {
    accessTokenSecret: Buffer.from(process.env.JWT_ACCESS_TOKEN_SECRET || 'rANd0m34673', 'base64'),
    refreshTokenSecret: Buffer.from(process.env.JWT_REFRESH_TOKEN_SECRET || 'RanD0M65749', 'base64')
};

const generateAccessToken = (authData, expiresIn = '10s') => {
    return jwt.sign(authData, accessTokenSecret, { expiresIn });
};

const generateRefreshToken = (authData) => {
    return jwt.sign(authData, refreshTokenSecret);
};

const verifyAccessToken = (token, tokenSecret, callback) => {
    jwt.verify(token, tokenSecret, (err, authData) => {
        callback(err, authData);
    });
};

module.exports = {
    accessTokenSecret,
    refreshTokenSecret,
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken
};