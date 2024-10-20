// express includes and start
const dotenv = require("dotenv").config();
const express = require("express");
const app = express();


// router and middleware includes
const router = require("./src/routers/main_router");
const route_error_middleware = require("./src/middlewares/error_route");


// ejs includes
const ejs = require("ejs");
const express_layout = require("express-ejs-layouts");
const path = require("path");


// session include
const session = require("express-session");




// server configs
app.use(express.static("public"));

app.use(session(
    {
        secret: process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: true,
        cookie: {  }
    }
));

app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"./src/views"));

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use(express_layout);
app.use("/",router);
app.use(route_error_middleware);



// start server
app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT + " Port server aktif");
});
