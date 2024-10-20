
const router = require("express").Router();
const main_controller = require("../controllers/main_controller");


router.get("/",main_controller.home);
router.get("/login",main_controller.login_page);
router.get("/register",main_controller.register_page);

router.get("/emailverification",main_controller.email_verification)

router.get("/all-apikeys",main_controller.all_apikeys_page);

router.post("/login",main_controller.login);
router.post("/register",main_controller.register);
router.post("/logout",main_controller.logout);

router.get("/api-request",main_controller.api_request);

router.get("/documentation",main_controller.documentation_page);





module.exports=router;