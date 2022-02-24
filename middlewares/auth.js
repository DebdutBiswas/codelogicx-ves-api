const { accessTokenSecret, verifyAccessToken } = require('../configs/auth');

module.exports = (req, res, next) => {
    const bearerHeader = req.headers?.authorization;
    const bearerToken = bearerHeader?.split(' ')?.[1];

    if (bearerToken == null) {
        return res.status(403).send({
            message: 'No token provided!'
        });
    }

    verifyAccessToken(bearerToken, accessTokenSecret, (err, authData) => {
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized!'
            });
        }

        req.authData = authData;
        next();
    });
};