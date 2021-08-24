const express = require("express");
const router = express.Router();
const data = require("../data");
const orderdata = data.order;

router.get("/", async (req, res) => {
    if (req.session.user) {

        const allOrder = await orderdata.getAllOrder();
        
        res.render("pages/orderList", {
            inventory: allOrder,
        });
    } else {
        res.status(500).redirect("/private");
    }
});


router.get("/deleteOrder/:pid", async (req, res) => {
    if (req.session.user) {
        try {
            const curr_order = await orderdata.removeOrder(req.params.pid);
            if (curr_order) {
                return res.redirect("/allOrder");

            } else {
            
                    res.status(401).render('pages/orderList', { title: 'Failed', error: "Product cannot delete" });
            
            }
        } catch (error) {
            console.log(error);
        }

    } else {
        return res.status(500).redirect("/login");
    }
});

router.get("/:p_id", async (req, res) => {
    try {
        const curr_order = await orderdata.getOrderById(req.params.p_id);
        
        return res.render("pages/order_page", {
            _id: curr_order._id,
            sellerId: curr_order.sellerId,
            product_id: curr_order.product_id,
            totalQty: curr_order.totalQty,
            order_cost: curr_order.order_cost,
            address: curr_order.adress,
            deliveryDate: curr_order.deliveryDate,
            orderOwner: curr_order.orderOwner,
            productId: curr_order.productId
            
        });
    } catch (e) {
        console.log(e);
        return res.status(400).render("errors/common_error", {
            error: { message: "Could not find the inventory of given ID." },
        });
    }
});

module.exports = router;