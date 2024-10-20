
const bcrypt = require("bcrypt");


const hash_key = async (key) => {
    let hashed = await bcrypt.hash(key,10);
    return hashed;
}

const compare_key = async (key,hash) => {
    let is_comp = await bcrypt.compare(key,hash);
    return is_comp;
}

module.exports = {
    hash_key,
    compare_key,
}