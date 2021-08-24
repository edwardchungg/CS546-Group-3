const express = require("express");
const router = express.Router();
const data = require("../data");
const orderdata = data.order;
const inventorydata = data.inventory;
const { ObjectId } = require("mongodb");
const xss = require("xss");

router.get("/:id", async (req, res) => {
    if (req.session.user) {
        res.render("pages/buyInventory");
      } else {
        res.status(500).redirect("/login");
    }
    
});

router.post("/:pid", async (req, res) => {
    let newInventory = JSON.parse(JSON.stringify(req.body));
    console.log(newInventory);
    if (!req.body) {
        res.status(400).json({ error: "You must provide all information" });
        return;
    }
    try {
        let orderInventory = await inventorydata.getInventoryById(ObjectId(req.params.pid),newInventory);
        if(orderInventory){


            // let order_cost = newInventory.totalQty * orderInventory.price
            await orderdata.addOrder(
            xss(req.session.user._id),
            xss(orderInventory._id),
            xss(newInventory.totalQty),
            xss(newInventory.unit_price),
            xss(newInventory.shipping_cost),
            xss(newInventory.address),
            xss(newInventory.deliveryDate),
            xss(req.session.user.firstName),
            xss(orderInventory.productId),
          );

            return  res.redirect("/inventory/all");
        } else {
            return res.render("errors/common_error", {
                error: { message: "The product  is not available ." },
              });
        }
    } catch (e) {
        return res.render("errors/common_error", {
            error: { message: e},
          });
    }
});

router.get("/all", async (req, res) => {
    if (req.session.user) {

        const allOrder = await orderdata.getAllOrder();
        
        res.render("pages/orderList", {
            inventory: allOrder,
        });
    } else {
        res.status(500).redirect("/private");
    }
});

router.get("/allorder", async (req, res) => {
    res.render("pages/orderList");
});

router.get("/allorder", async (req, res) => {
    if (req.session.user) {

        const allOrder = await orderdata.getAllOrder();
        
        res.render("pages/orderList", {
            inventory: allOrder,
        });
    } else {
        res.status(500).redirect("/private");
    }
});

module.exports = router;


  