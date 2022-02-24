const { createHash } = require('crypto');
const bcrypt = require('bcryptjs');

const sha256HashGen = (data, digestType = 'hex', encoding = 'utf-8') => {
    if (!data) return;
    return createHash('sha256').update(data, encoding).digest(digestType);
};

const sha256HashCheck = (data, orginalHash, digestType = 'hex', encoding = 'utf-8') => {
    if (!data) return;
    if (!orginalHash) return;
    let hash = createHash('sha256').update(data, encoding).digest(digestType);
    return (orginalHash === hash);
};

const bcryptHashGen = async (data, saltRounds = 10, callback) => {
    if (!data) return;

    try {
        if (!callback) return await bcrypt.hash(data, saltRounds);
        return await bcrypt.hash(data, saltRounds, callback);
    } catch {
        return;
    }
};

const bcryptHashCheck = async (data, hash, callback) => {
    if (!data) return;
    if (!hash) return;

    try {
        if (!callback) return await bcrypt.compare(data, hash);
        return await bcrypt.compare(data, hash, callback);
    } catch {
        return false;
    }
};

module.exports = {
    sha256HashGen,
    sha256HashCheck,
    bcryptHashGen,
    bcryptHashCheck
};