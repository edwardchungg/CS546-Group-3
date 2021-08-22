
const userRoutes = require("./users");
const inventoryRoutes = require("./inventory");
const orderRoutes = require("./order");


const constructorMethod = (app) => {
  app.use("/user", userRoutes);
  app.use("/inventory", inventoryRoutes);
  app.use("/order", orderRoutes);
  
//   app.get("/logout", async (req, res) => {
//     // trigger /logout router to logout
//     res.clearCookie("AuthCookie");
//     res.clearCookie("Build Session");
//     req.session.destroy();
//     res.status(200).redirect("/user");
//   });

  app.use("/", async (req, res) => {
    res.redirect("/user");
  });

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;