
// const privateRoute = require("./private");
const userDeleteRoute = require("./userDeleteRoute");
const userRoutes = require("./user");
const inventoryRoutes = require("./inventory");
// const orderRoutes = require("./orderRoutes");

const constructorMethod = (app) => {
  app.get("/", function (req, res) {
    res.render("pages/index");
  });
  app.use("/user", userRoutes);
  // app.use("/register", registerRoute);
  // app.use("/login", loginRoute);
  // app.use("/logout", logoutRoute);
  // app.use("/private", privateRoute);
  // app.use("/userDelete", userDeleteRoute);
  // app.use("/userUpdate", userUpdateRoute);
  app.use("/inventory", inventoryRoutes);
  // app.use("/order", orderRoutes);
  app.get("/getSession", async (req, res) => {
    if (req.session.user) {
      res.json({ result: true, name: req.session.user.email });
      return;
    }
    res.json({ result: false });
    //res.json({};)
    return;
  });
};

module.exports = constructorMethod;
