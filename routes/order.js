const data = require('../data');
const inventoryData = data.inventory;
const userData = data.users;
const orderData = data.orderData;
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const listOfAllOrder = await orderData.get();
        res.status(200).json(listOfAllOrder);
    } catch (e) {
        res.status(500);
    }
});


 //   To add order 

router.post('/', async (req, res) => {
    let orderInfo = req.body;

    if (!orderInfo) {
        res.status(400).json({error: "orderInfo is must to create a order"});
    }
    if (!orderInfo.product_id) {
        res.status(400).json({error: "Product id is must to create a order for the prduct"});
    }   
    if (!orderInfo.seller_id) {
        res.status(400).json({error: "seller id is must to create a product"});
    }
    if (!orderInfo.totalQty) {
        res.status(400).json({error: "totalQty is must to create a product"});
    }
    if (!orderInfo.order_cost) {
        res.status(400).json({error: "order_cost is must to create a product"});
    }
    if (!orderInfo.address) {
        res.status(400).json({error: "address is must to create a product"});
    }
	if (!orderInfo.delivery_date) {
        res.status(400).json({error: "delivery_date is must to create a product"});
    }
    if (!orderInfo.shipping_cost) {
        res.status(400).json({error: "shipping_cost is must to create a product"});
    }
    if (!orderInfo.total_of_Order) {
        res.status(400).json({error: "total_of_Order is must to create a product"});
    }
    if (!orderInfo.order_status) {
        res.status(400).json({error: "order_status is must to create a product"});
    }

    try {
        const createOrder = await orderData.create(orderInfo.product_id, orderInfo.seller_id, orderInfo.totalQty, orderInfo.order_cost, orderInfo.address, orderInfo.delivery_date, orderInfo.shipping_cost, orderInfo.total_of_Order, orderInfo.order_status);
        res.status(200).json(createOrder);
    } catch (e) {
        res.status(400).json({error: e});
    }
});


 // To get order by order_id 

router.get('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'order_Id is must' });
    }

    try {
        const order = await orderData.read(req.params.id);
        res.status(200).json(order);
    } catch (e) {
        res.status(404).json({error: `order not found with order_id: ${req.params.id}.`});
    }
});


 // A put request, to update information for the order,

router.put('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'order_Id is must' });
    }

    let orderInfo = req.body;

    if (!orderInfo) {
        res.status(400).json({error: "orderInfo is must to create a order"});
    }
    if (!orderInfo.product_id) {
        res.status(400).json({error: "Product id is must to create a order for the prduct"});
    }   
    if (!orderInfo.seller_id) {
        res.status(400).json({error: "seller id is must to create a product"});
    }
    if (!orderInfo.totalQty) {
        res.status(400).json({error: "totalQty is must to create a product"});
    }
    if (!orderInfo.order_cost) {
        res.status(400).json({error: "order_cost is must to create a product"});
    }
    if (!orderInfo.address) {
        res.status(400).json({error: "address is must to create a product"});
    }
	if (!orderInfo.delivery_date) {
        res.status(400).json({error: "delivery_date is must to create a product"});
    }
    if (!orderInfo.shipping_cost) {
        res.status(400).json({error: "shipping_cost is must to create a product"});
    }
    if (!orderInfo.total_of_Order) {
        res.status(400).json({error: "total_of_Order is must to create a product"});
    }
    if (!orderInfo.order_status) {
        res.status(400).json({error: "order_status is must to create a product"});
    }

    try {
        await orderData.read(req.params.id);
    } catch (e) {
        res.status(404).json({error: `order not found with order_id: ${req.params.id}.`});
        return;
    }

    try {
        const order = await orderData.update(req.params.id, orderInfo);
        res.status(200).json(order);
    } catch (e) {
        res.status(400).json({error: e});
    }
});


 //  patch request

router.patch('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'order_Id is must' });
        return;
    }

    const requestBody = req.body;
    let updateorder= {};

    try { // see if you can find the order and then set values to what's changed
        const theorder = await orderData.read(req.params.id);

        if (requestBody.productName && requestBody.productName !== theorder.title) updateorder.productName = requestBody.productName;
		if (requestBody.woodType && requestBody.woodType !== theorder.woodType) updateorder.woodType = requestBody.woodType;
		if (requestBody.color && requestBody.color !== theorder.color) updateorder.color = requestBody.color;
		if (requestBody.manufacturer && requestBody.manufacturer !== theorder.manufacturer) updateorder.manufacturer = requestBody.manufacturer;
		if (requestBody.stock && requestBody.stock !== theorder.stock) updateorder.stock = requestBody.stock;
		if (requestBody.unitCost && requestBody.unitCost !== theorder.unitCost) updateorder.unitCost = requestBody.unitCost;
		if (requestBody.createdBy && requestBody.createdBy !== theorder.createdBy) updateorder.createdBy = requestBody.createdBy;
		

    } catch (e) {
        res.status(404).json({error: `order not found with order_id: ${req.params.id}.`});
    }

    if (Object.keys(updateorder).length !== 0) {
        try {
            const updateorder = await orderData.update(req.params.id, requestBody);
            res.status(200).json(updateorder);
        } catch (e) {
            res.status(400).json({error: e});
        }
    } else {
        res.status(400).json({error: "CurrentDetails = NewDetails, No change has been Given"});
    }
});

router.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'order Id is must' });
    }

    try {
         await orderData.read(req.params.id);
    } catch (e) {
        res.status(404).json({error: `product not found with order_id: ${req.params.id}.`});
    }
    try {
        let deleteorder = await orderData.delete(req.params.id);
        res.status(200).json(deleteInventor);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

module.exports = router;