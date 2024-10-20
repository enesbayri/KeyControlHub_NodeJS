
const crypto = require('crypto');

const generateApiKey = () => {
    return crypto.randomBytes(256).toString('hex'); // 40 karakterli hex string
};


module.exports = {
    generateApiKey,
}