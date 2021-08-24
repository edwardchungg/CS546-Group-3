const mongoCollections = require("../config/mongoCollection");
const inventory = mongoCollections.inventory;
const order = mongoCollections.order;
const user = mongoCollections.user;


var BSON = require("mongodb");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

let exportedMethods = {

    async getAllOrder() {
        const orderCollection = await order();
        const allOrder = await orderCollection.find({}).toArray();
        if (!allOrder) throw "empty database";
        return allOrder;
    },

    async getOrderById(id) {
        const orderCollection = await order();
        const orderbyId = await orderCollection.findOne({ _id: ObjectId(id) });
        if (!orderbyId) throw "Order not found";
        return orderbyId;
    },
    async getOrderByUserId(id) {
        const orderCollection = await order();
        const order = await orderCollection.find({ sellerId: id }).toArray();
        if (!order) throw "user has no Order";
        return order;
    },

    async addOrder(sellerId, product_id, totalQty, order_cost, address, deliveryDate, orderOwner, productId) {
        if (!ObjectId.isValid(sellerId)) throw "invalid sellerId";
        if (!ObjectId.isValid(product_id)) throw "invalid product_id";
        if (typeof totalQty != "string") throw "invalid totalQty";
        if (typeof order_cost != "string") throw "invalid order_cost";
        if (typeof address != "string") throw "invalid address";
        if (typeof deliveryDate != "string") throw "invalid deliveryDate";
        if (typeof orderOwner != "string") throw "invalid orderOwner";
        if (typeof productId != "string") throw "invalid productId";


        const orderCollection = await order();

        let newOrder = {
            sellerId: sellerId,
            product_id: product_id,
            totalQty: totalQty,
            order_cost: order_cost,
            address: address,
            deliveryDate: deliveryDate,
            orderOwner: orderOwner,
            productId: productId,
        };

        const newInsertInformation = await orderCollection.insertOne(newOrder);
        if (newInsertInformation.insertedCount === 0) throw "Insert failed!";
        return newInsertInformation.insertedId;
    },
    async removeOrder(id) {
        const orderCollection = await order();
        // const userCollection = await user();


        curr_order = await this.getOrderById(id);
        if (curr_order) {
            const deleteOrder = await orderCollection.removeOne({ _id: ObjectId(id) });
            if (deleteOrder) {
                return true;
            } else {
                throw 'Order cannot be deleted';
            }
        }
        else {
            throw 'Given order id does not exist';
        }

    },


    async updateOrder(id, updatedOrder) {
        if (!ObjectId.isValid(sellerId)) throw "invalid sellerId";
        if (!ObjectId.isValid(product_id)) throw "invalid product_id";
        if (typeof totalQty != "string") throw "invalid totalQty";
        if (typeof order_cost != "string") throw "invalid order_cost";
        if (typeof address != "string") throw "invalid address";
        if (typeof deliveryDate != "string") throw "invalid deliveryDate";
        if (typeof orderOwner != "string") throw "invalid orderOwner";
        if (typeof productId != "string") throw "invalid productId";

        let updateOrder = {
            sellerId: updatedOrder.sellerId,
            product_id: updatedOrder.product_id,
            totalQty: updatedOrder.totalQty,
            order_cost: updatedOrder.order_cost,
            address: updatedOrder.address,
            deliveryDate: updatedOrder.deliveryDate,
            orderOwner: updatedOrder.orderOwner,
            productId: updatedOrder.productId,

        };

        const orderCollection = await order();
        const updatedInfo = await orderCollection.updateOne(
            { _id: ObjectId(id) },
            { $set: updateOrder }
        );
        if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount)
            throw "Update failed";

        return;
    },


};

module.exports = exportedMethods;
