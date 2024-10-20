
const model = require("./models");
const User = model.user;
const Apikey = model.apikey;
const bcrypt_service = require("../services/bcrypt_service");
const apikey_service = require("../services/apikey_service");

const create_user = async (body) => {
    try {
        const findEmail = await User.findOne({where:{email:body.email}});
        if(findEmail){
            return undefined;
        }
        let hashed_password = await bcrypt_service.hash_key(body.password);
        let key = apikey_service.generateApiKey();
        const user = User.build({
            name: body.name,
            surname: body.surname,
            email: body.email,
            password: hashed_password,
            apikey_id: 0,
        });

        await user.save();
        console.log("user created");

        const apikey = Apikey.build({
            userid: user.id,
            apikey: key,
            api_credit_balance: 100
        });

        await apikey.save();
        console.log("apikey created");

        user.apikey_id = apikey.id;
        await user.save();  // Güncellenmiş kullanıcıyı kaydet

        return user;  // Kullanıcıyı döndür
    } catch (error) {
        console.log("Oppss! Error:", error);
        return null;  // Hata durumunda null döndür
    }
}

const login_user = async (body) => {
    try {
        const findUser = await User.findOne({where:{email:body.email}});
        if(findUser){
            let is_compare = await bcrypt_service.compare_key(body.password,findUser.password);
            if(is_compare){
                if(findUser.email_verified){
                    return findUser;
                }else{
                    return undefined; 
                }
            }
            return null
        }
        return null;  // Kullanıcıyı döndür
    } catch (error) {
        console.log("Oppss! Error:", error);
        return null;  // Hata durumunda null döndür
    }
}

const find_user_from_id = async (userid) => {
    try {
        const find_user = await User.findOne({where:{id:userid}});
        if(find_user){
            return find_user;
        }
        else return null;
    } catch (error) {
        return null;
    }
}
const find_apikey_from_userid = async (userid) => {
    try {
        const find_apikey = await Apikey.findOne({where:{userid:userid}});
        if(find_apikey){
            return find_apikey;
        }
        else return null;
    } catch (error) {
        return null;
    }
}
const find_all_users = async () => {
    try {
        const users = await User.findAll();
        if(users){
            return users;
        }
        else return [];
    } catch (error) {
        return null;
    }
}
const find_all_apikeys = async () => {
    try {
        const apikeys = await Apikey.findAll();
        if(apikeys){
            return apikeys;
        }
        else return [];
    } catch (error) {
        return null;
    }
}

const user_api_request = async (key) => {
    try {
        let apikey = await Apikey.findOne({where:{apikey:key}});
        if(apikey){
           const new_apikey = await Apikey.update({api_credit_balance: (apikey.api_credit_balance - 1) },{where:{id:apikey.id}});
            if(new_apikey){
                return new_apikey;
            } 
        }
        else return null;
    } catch (error) {
        return null;
    }
}


const email_verified = async (userid) =>{
    try {
        const user = await User.update({email_verified:true},{where:{id:userid}});
        if(user){
            return user;
        }
        else return null;
    } catch (error) {
        return null;
    }
}


module.exports = {
    create_user,
    login_user,
    find_user_from_id,
    email_verified,
    find_apikey_from_userid,
    find_all_users,
    find_all_apikeys,
    user_api_request,

}
