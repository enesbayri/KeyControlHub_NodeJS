const db = require("../database/db");
const mail_service = require("../services/mail_service");
const token_service = require("../services/jwt_service");


const create_user = async (body) => {
    const new_user = await db.create_user(body);  // Kullanıcıyı oluştur
    return new_user
}

const send_mail_verification = async(user) => {
    await mail_service(user.email,token_service.create_token_url({id:user.id}));
}

const login_user = async (body) => {
    let user = await db.login_user(body);
    return user;
}

const create_token = (userid) => {
    let token = token_service.create_token({id:userid});
    return token;
}

const decode_token = async (token) => {
    let decoded_token = token_service.verify_token(token);
    return decoded_token;
}

const email_verified = async (id) => {
    let user = await db.email_verified(id);
    return user;
}

const request_auth_token_control = async (token) => {
    let decoded = token_service.verify_token(token);
    if(decoded){
        let user = db.find_user_from_id(decoded.id);
        if(user){
            return user;
        }else{
            return null;
        }
    }else{
        return null;
    }
    
}
const find_apikey_from_userid = async (userid) => {
    const find_apikey = await db.find_apikey_from_userid(userid);
    return find_apikey;

}
const find_all_users = async () => {
    const users = await db.find_all_users();
    return users;
}
const find_all_apikeys = async () => {
    const apikeys = await db.find_all_apikeys();
    return apikeys;
}

const user_api_request = async (key) => {
   let apikey = await db.user_api_request(key);
   return apikey;
}






module.exports = {
    create_user,
    send_mail_verification,
    login_user,
    create_token,
    decode_token,
    email_verified,
    request_auth_token_control,
    find_apikey_from_userid,
    find_all_apikeys,
    find_all_users,
    user_api_request,
}