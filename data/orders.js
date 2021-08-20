const mongoCollections = require('../config/mongoCollections');
const mongo = require('mongodb');
const {ObjectId} = require('mongodb');
const orders = mongoCollections.orders;
const userMethods = require('./users');
const inventoryMethods = require('./inventory');

let exportedMethods = {
    async get() {
        const orderCollection = await orders();
        const orderArray = await ordedrCollection.find({}).toArray();
        if (!orderArray) throw 'No orders in system!';
        return orderArray;
    },
    async getById(id){
        if (!id) throw 'You must provide an id to search for';
        if (typeof id != "string") throw 'Id must be of type string';
        let uid;
        try {
            uid = ObjectId(id);
        }
        catch(e){
            throw 'Id must be of type ObjectId'
        }
        
        const ordedrCollection = await orders();
        const foundOrder = await ordedrCollection.findOne({_id: uid});
        if (!foundOrder ) throw 'Order not found';
        return foundOrder;    
    },
    async create(product_id,seller_id,totalQty,order_cost,address,delivery_date,shipping_cost,total_of_Order, order_status){
        
        if (!product_id) throw 'You must provide a product id!';
        if (!seller_id) throw 'You must provide a seller id!';
        if (!totalQty) throw 'You must provide a quantity!';
        if (!order_cost) throw 'You must provide a the cost of the order!';
        if (!address) throw 'You must provide an address!';
        if (!delivery_date) throw 'You must provide a date of delivery!';
        if (!shipping_cost) throw 'You must provide a cost of shipping!';
        if (!total_of_Order) throw 'You must provide the total cost of the order!';
        if (!order_status) throw 'You must provide the status of the order!';
   

        if (typeof product_id != "string") throw 'You must provide a string for the product id';
        if (typeof seller_id != "string") throw 'You must provide a string for the seller id';
        if (typeof totalQty != "number") throw 'You must provide a number for the quantity';
        if (typeof order_cost != "number") throw 'You must provide a number for the cost of the order';
        if (typeof address != "string") throw 'You must provide a string for the address';
        if (typeof shipping_cost != "number") throw 'You must provide a number for the shipping cost';
        if (typeof total_of_Order != "number") throw 'You must provide a number for the total cost of the order';
        if (typeof order_status != "string") throw 'You must provide a string for the order status';
        if (typeof delivery_date != "string") throw 'You must provide a string for the date';

        // Validate users exists
        if (!userMethods.getByUsername(createdBy)){
            throw 'User does not exist!'
        };

        // Validate product exists
        if (!inventoryMethods.getById(seller_id)){
            throw 'Product does not exist!'
        };

        let newOrder = {
            product_id: product_id,
            seller_id: seller_id,
            totalQty: totalQty,
            order_cost: order_cost,
            address: address,
            delivery_date: delivery_date,
            shipping_cost: shipping_cost,
            total_of_Order: total_of_Order,
            order_status: order_status
        }
        const orderCollection = await orders();
        const insertInfo = await orderCollection.insertOne(newOrder);
        if (insertInfo.insertedCount === 0) throw 'Could not add order';
    
        const newId = insertInfo.insertedId;
        const order = await this.getById(newId.toString());
        return order;    
    },
    async update(id,order){
        if (!id) throw 'An id is required';
    
        if (typeof id != "string"){
            throw 'Provided id must be of type string';
        }
        let uid;
        try {
            uid = ObjectId(id);
        }
        catch(e){
            throw 'Id must be of type ObjectId'
        }
        const oldOrder = await this.getById(id);
        const updatedOrder = {
            product_id: order.product_id,
            seller_id: order.seller_id,
            totalQty: order.totalQty,
            order_cost: order.order_cost,
            address: order.address,
            delivery_date: order.delivery_date,
            shipping_cost: order.shipping_cost,
            total_of_Order: order.total_of_Order,
            order_status: order.order_status
        }
        const orderCollection = await orders();
        const updatedInfo = await orderCollection.updateOne(
            {_id:uid},
            { $set: updatedOrder }
        );
        const foundOrder = await orderCollection.findOne({_id: uid});
        return foundOrder;
    },
    async delete(id){
        if (!id) throw 'An id is required';
    
        if (typeof id != "string"){
            throw 'Provided id must be of type string';
        }
        let uid;
        try {
            uid = ObjectId(id);
        }
        catch(e){
            throw 'Id must be of type ObjectId'
        }
        const orderCollection = await orders();
        const foundOrder = await orderCollection.findOne({_id:uid});
        if (!foundOrder) throw 'Order not found with that id';
        const deletionInfo = await orderCollection.deleteOne({_id:uid});
        const result = {
            order_id: id,
            product_id: foundOrder.product_id,
            seller_id: foundOrder.seller_id,
            address: foundOrder.address,
            deleted: true
        }
        return result;
    }

}

module.exports = exportedMethods;
