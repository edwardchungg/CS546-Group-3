const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const exphbs = require("express-handlebars");
const session = require("express-session");
const configRoutes = require('./routes');

const applyMiddleware = (app) =>
  app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(
      session({
        name: "AuthCookie",
        secret: "some secret string!",
        resave: false,
        saveUninitialized: true,
      })
    )
    .engine("handlebars", exphbs({ defaultLayout: "welcome", layoutsDir: __dirname + '/views' }))
    .set("view engine", "handlebars");


// to  use  static css or js 
const static = express.static(__dirname + "/public");
app.use("/public", static);

app.use(cookieParser());

app.use( async(req, res, next) =>{
  let currentTimestamp = new Date().toUTCString();
  let requestMethod = req.method;
  let requestRoutes = req.originalUrl;
  let Authenticated;
  
  if(req.session){
    Authenticated="Authenticated User"
  } else {
    Authenticated="Non-Authenticated User"
  }
  console.log(`[${currentTimestamp}]: ${requestMethod} ${requestRoutes} (${Authenticated})`)
  next();
});

app.use("/auth/login", (req, res, next) => {
  if (req.method === "GET") {
    return res.status(200).render("auth/login");
  } else {
    next();
  }
});

app.use("/auth/register", (req, res, next) => {
  if (req.method === "GET") {
    return res.status(200).render("auth/signup");
  } else {
    next();
  }
});

applyMiddleware(app);
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});