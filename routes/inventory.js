const data = require('../data');
const inventoryData = data.inventory;
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const listOfAllinventory = await inventoryData.getAll();
        res.status(200).json(listOfAllinventory);
    } catch (e) {
        res.status(500);
    }
});


 //   To add inventory 

router.post('/', async (req, res) => {
    let inventoryInfo = req.body;

    if (!inventoryInfo) {
        res.status(400).json({error: "inventoryInfo is must to create a inventory"});
    }
    if (!inventoryInfo.productName) {
        res.status(400).json({error: "Product Name is must to create a inventory"});
    }   
    if (!inventoryInfo.woodType) {
        res.status(400).json({error: "woodType is must to create a inventory"});
    }
    if (!inventoryInfo.color) {
        res.status(400).json({error: "color is must to create a inventory"});
    }
    if (!inventoryInfo.manufacturer) {
        res.status(400).json({error: "manufacturer is must to create a inventory"});
    }
    if (!inventoryInfo.stock) {
        res.status(400).json({error: "stock is must to create a inventory"});
    }
	if (!inventoryInfo.unitCost) {
        res.status(400).json({error: "unitCost is must to create a inventory"});
    }
    if (!inventoryInfo.createdBy) {
        res.status(400).json({error: "createdBy is must to create a inventory"});
    }

    try {
        const createInventory = await inventoryData.create(inventoryInfo.productName, inventoryInfo.woodType, inventoryInfo.color, inventoryInfo.manufacturer, inventoryInfo.stock, inventoryInfo.unitCost, inventoryInfo.createdBy);
        res.status(200).json(createInventory);
    } catch (e) {
        res.status(400).json({error: e});
    }
});


 // To get inventory by id 

router.get('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'inventory_Id is must' });
    }

    try {
        const inventory = await inventoryData.read(req.params.id);
        res.status(200).json(inventory);
    } catch (e) {
        res.status(404).json({error: `inventory not found with inventory_id: ${req.params.id}.`});
    }
});


 // A put request, to update information for the inventory,

router.put('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'inventory_Id is must' });
    }

    let inventoryInfo = req.body;

	if (!inventoryInfo) {
        res.status(400).json({error: "inventoryInfo is must to create a inventory"});
    }
    if (!inventoryInfo.productName) {
        res.status(400).json({error: "Product Name is must to create a inventory"});
    }   
    if (!inventoryInfo.woodType) {
        res.status(400).json({error: "woodType is must to create a inventory"});
    }
    if (!inventoryInfo.color) {
        res.status(400).json({error: "color is must to create a inventory"});
    }
    if (!inventoryInfo.manufacturer) {
        res.status(400).json({error: "manufacturer is must to create a inventory"});
    }
    if (!inventoryInfo.stock) {
        res.status(400).json({error: "stock is must to create a inventory"});
    }
	if (!inventoryInfo.unitCost) {
        res.status(400).json({error: "unitCost is must to create a inventory"});
    }
    if (!inventoryInfo.createdBy) {
        res.status(400).json({error: "createdBy is must to create a inventory"});
    }

    try {
        await inventoryData.read(req.params.id);
    } catch (e) {
        res.status(404).json({error: `inventory not found with inventory_id: ${req.params.id}.`});
        return;
    }

    try {
        const inventory = await inventoryData.update(req.params.id, inventoryInfo.productName, inventoryInfo.woodType, inventoryInfo.color, inventoryInfo.manufacturer, inventoryInfo.stock, inventoryInfo.unitCost, inventoryInfo.createdBy);
        res.status(200).json(inventory);
    } catch (e) {
        res.status(400).json({error: e});
    }
});


 //  patch request

router.patch('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'inventory_Id is must' });
        return;
    }

    const requestBody = req.body;
    let updateInventory= {};

    try { // see if you can find the inventory and then set values to what's changed
        const theInventory = await inventoryData.read(req.params.id);

        if (requestBody.productName && requestBody.productName !== theInventory.title) updateInventory.productName = requestBody.productName;
		if (requestBody.woodType && requestBody.woodType !== theInventory.woodType) updateInventory.woodType = requestBody.woodType;
		if (requestBody.color && requestBody.color !== theInventory.color) updateInventory.color = requestBody.color;
		if (requestBody.manufacturer && requestBody.manufacturer !== theInventory.manufacturer) updateInventory.manufacturer = requestBody.manufacturer;
		if (requestBody.stock && requestBody.stock !== theInventory.stock) updateInventory.stock = requestBody.stock;
		if (requestBody.unitCost && requestBody.unitCost !== theInventory.unitCost) updateInventory.unitCost = requestBody.unitCost;
		if (requestBody.createdBy && requestBody.createdBy !== theInventory.createdBy) updateInventory.createdBy = requestBody.createdBy;
		

    } catch (e) {
        res.status(404).json({error: `inventory not found with inventory_id: ${req.params.id}.`});
    }

    if (Object.keys(updateInventory).length !== 0) {
        try {
            const updateInventory = await InventoryData.update(req.params.id, requestBody);
            res.status(200).json(updateInventory);
        } catch (e) {
            res.status(400).json({error: e});
        }
    } else {
        res.status(400).json({error: "CurrentDetails = NewDetails, No change has been Given"});
    }
});

router.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'Inventory Id is must' });
    }

    try {
         await inventoryData.read(req.params.id);
    } catch (e) {
        res.status(404).json({error: `product not found with inventory_id: ${req.params.id}.`});
    }
    try {
        let deleteInventory = await inventoryData.delete(req.params.id);
        res.status(200).json(deleteInventor);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

module.exports = router;