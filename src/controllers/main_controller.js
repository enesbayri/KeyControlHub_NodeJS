const user_repo = require("../repository/user_repo");

const home = async (req,res,next) => {
    if(req.session.token){
        let user = await user_repo.request_auth_token_control(req.session.token);
        if(user){
            if(user.is_Admin){
                let users = await user_repo.find_all_users();
                res.render("admin_page",{"users":users,"user":user});
            }else{
                let apikey = await user_repo.find_apikey_from_userid(user.id);
                res.render("user_page",{"user":user,"apikey":apikey});
            }
            
        }else{
            req.session.msg = "Lütfen önce giriş yapın!";
            res.redirect("/login");
        }
    }else{
        req.session.msg = "Lütfen önce giriş yapın!";
         res.redirect("/login");
    }
    
    
}

const all_apikeys_page = async (req,res,next) => {
    if(req.session.token){
        let user = await user_repo.request_auth_token_control(req.session.token);
        if(user){
            if(user.is_Admin){
                let apikeys = await user_repo.find_all_apikeys();
                res.render("all_apikeys_page",{"apikeys":apikeys,"user":user});
            }else{
                res.redirect("/");
            }
            
        }else{
            req.session.msg = "Lütfen önce giriş yapın!";
            res.redirect("/login");
        }
    }else{
        req.session.msg = "Lütfen önce giriş yapın!";
         res.redirect("/login");
    }
}

const api_request = async (req,res,next) =>{
    if(req.query.apikey){ 
        let apikey = await user_repo.user_api_request(req.query.apikey);
        res.json({
            "Msg":"Api istek hakkınız kullanıldı...",
            "Apikey_credit_balance":apikey.apikey_credit_balance,
        });
    }else{
        res.json({
            "Code":"404",
            "Msg":"Api istek hakkınız kullanılamadı. Lütfen apikeyinizi eksiksiz ve doğru girin...",
            "Api_Usage": "/api-request?apikey=YOURAPIKEY",
        });
    }
}

const register_page = async (req,res,next) => {
    let token_control_user = await user_repo.request_auth_token_control(req.session.token);
    if(token_control_user){
        res.redirect("/");
    }else{
        let msg = undefined;
        if(req.session.msg){
            msg = req.session.msg;
            req.session.msg = undefined;
        }
       res.render("register_page",{layout:"./layout/auth_layout.ejs",msgDanger:msg});
    }
    
}

const login_page = async (req,res,next) => {
    let token_control_user = await user_repo.request_auth_token_control(req.session.token);
    if(token_control_user){
        res.redirect("/");
    }else{
        let msg = undefined;
        if(req.session.msg){
            msg = req.session.msg;
            req.session.msg = undefined;
        }
        res.render("login_page",{layout:"./layout/auth_layout.ejs",msgDanger:msg});
    }
    
}

const register = async (req,res,next) => {  
    try {
        let user = await user_repo.create_user(req.body);
        if(user){
            await user_repo.send_mail_verification(user);
            req.session.msg = "Üye olundu! Aktivasyon onay linki mail adresinize gönderildi lütfen onaylayıp giriş yapın.";
            res.redirect("/login");
        }else if(user === undefined){
            req.session.msg = "E-mail zaten kullanımda!";
            res.redirect("/register");
        }else{
            req.session.msg = "Kullanıcı Oluşturulamadı!";
            res.redirect("/register");
        }
    } catch (error) {
        console.log("Kullanıcı oluşturulamadı:", error);
        req.session.msg = "Kullanıcı Oluşturulamadı!";
        res.redirect("/register");
    }
    
}

const login = async (req,res,next) => {
    try {
        let token_control_user = await user_repo.request_auth_token_control(req.session.token);
        if(token_control_user){
            res.redirect("/");
        }else{
            const user = await user_repo.login_user(req.body);
            if(user){
                req.session.token = user_repo.create_token(user.id);
                res.redirect("/");
            }else if(user === undefined){
                req.session.msg = "Lütfen önce mail adresinizi onaylayın!";
                res.redirect("/login");
            }else{
                req.session.msg = "Email yada Şifre hatalı!";
                res.redirect("/login");
            }
            }
            
        } catch (error) {
            console.log("Kullanıcı Bulunamadı:", error);
            req.session.msg = "Email yada Şifre hatalı!";
            res.redirect("/login");
    }
}

const email_verification = async (req,res,next) => {
    if(req.query.token){
        let decoded_token = user_repo.decode_token(req.query.token);
        if(decoded_token != null){
            let user = await user_repo.email_verified(decoded_token.id);
            if(user){
                req.session.msg = "Email adresiniz onaylandı lütfen giriş yapın...";
                res.redirect("/login");
            }else{
                req.session.msg = "Kullanıcı bulunamadı!";
                res.redirect("/login");
            }

        }else{
            req.session.msg = "Geçersiz token bilgisi! Doğru token ile deneyin";
            res.redirect("/login");
        }
    }else{
        req.session.msg = "Lütfen mail adresinizideki geçerli url ile onaylamayı deneyin!"
        res.redirect("/login")
    }
}

const logout = (req,res,next ) => {
    req.session.msg = "Çıkış yapıldı";
    req.session.token = null;
    res.redirect("/login");
}

const documentation_page = (req,res,next) => {
    res.render("documentation_page");
}
 


module.exports = {
    home,
    login_page,
    register_page,
    register,
    login,
    email_verification,
    logout,
    all_apikeys_page,
    api_request,
    documentation_page
}