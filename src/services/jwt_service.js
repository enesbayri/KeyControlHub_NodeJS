const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const create_token = (content) => {
    let token = jwt.sign(content,process.env.SECRET_JWT_KEY);
    return token;
}

const verify_token = (token) => {
    try {
        let decoded = jwt.verify(token,process.env.SECRET_JWT_KEY);
        return decoded;
    } catch (error) {
        return null;
    }
}

const create_token_url = (content) => {
    let token_url = process.env.URL + "emailverification?token=" + create_token(content);
    return token_url;
}

module.exports = {
    create_token,
    verify_token,
    create_token_url,
}