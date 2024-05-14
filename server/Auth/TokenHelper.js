const jwt = require('jsonwebtoken');

const CreateToken = (uid, secret_key) => {
    const payload = {
        uid: uid
    };

    const token = jwt.sign(payload, secret_key, { expiresIn: '1w' });

    return token;
}

const AuthenticateToken = async (token, secretKey) => {
    try {
        const user = await jwt.verify(token, secretKey);
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = { CreateToken, AuthenticateToken };