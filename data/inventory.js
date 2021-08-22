const mongoCollections = require('../config/mongoCollections');
const mongo = require('mongodb');
const {ObjectId} = require('mongodb');
const inventory = mongoCollections.inventory;
const userMethods = require('./users');

let exportedMethods = {
    async getAll() {
        const inventoryCollection = await inventory();
        const inventoryArray = await inventoryCollection.find({}).toArray();
        if (!inventoryArray) throw 'No products in system!';
        return inventoryArray;
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
        
        const inventoryCollection = await inventory();
        const foundProduct = await inventoryCollection.findOne({_id: uid});
        if (!foundProduct ) throw 'Product not found';
        return foundProduct;    
    },
    async create(productName, woodType, color, manufacturer, stock, unitCost, createdBy){
        
        if (!productName) throw 'You must provide a name!';
        if (!woodType) throw 'You must provide a type of wood!';
        if (!color) throw 'You must provide a color!';
        if (!manufacturer) throw 'You must provide a manufacturer!';
        // if (!productImage) throw 'You must provide an image!';
        if (!stock) throw 'You must provide a quantity!';
        if (!unitCost) throw 'You must provide a unit cost!';
        if (!createdBy) throw 'You must provide a user!';
   

        if (typeof productName != "string") throw 'You must provide a string for the first name';
        if (typeof woodType != "string") throw 'You must provide a string for the last name';
        if (typeof color != "string") throw 'You must provide a string for the email';
        if (typeof manufacturer != "string") throw 'You must provide a string for the manufacturer';
        if (typeof stock != "number") throw 'You must provide a string for the last name';
        if (typeof unitCost != "number") throw 'You must provide a string for the password';
        if (typeof createdBy != "string") throw 'You must provide a string for the username';

        // Validate User exists
        if (!userMethods.getByUsername(createdBy)){
            throw 'User does not exist!'
        };


        let newProduct = {
            productName: productName,
            woodType: woodType,
            color: color,
            manufacturer: manufacturer,
            stock: stock,
            unitCost: unitCost,
            createdBy: createdBy
        }
        const inventoryCollection = await inventory();
        const insertInfo = await inventoryCollection.insertOne(newProduct);
        if (insertInfo.insertedCount === 0) throw 'Could not add product';
    
        const newId = insertInfo.insertedId;
        const product = await this.getById(newId.toString());
        return product;    
    },
    async update(id,product){
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
        const oldProduct = await this.getById(id);
        const updatedProduct = {
            productName: product.productName,
            woodType: product.woodType,
            color: product.color,
            manufacturer: product.manufacturer,
            stock: product.stock,
            unitCost: product.unitCost,
            createdBy: product.createdBy
        }
        const inventoryCollection = await inventory();
        const updatedInfo = await inventoryCollection.updateOne(
            {_id:uid},
            { $set: updatedProduct }
        );
        const foundProduct = await inventoryCollection.findOne({_id: uid});
        return foundProduct;
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
        const inventoryCollection = await inventory();
        const foundProduct = await inventoryCollection.findOne({_id:uid});
        if (!foundProduct) throw 'Product not found with that id';
        const deletionInfo = await inventoryCollection.deleteOne({_id:uid});
        const result = {
            productId: id,
            productName: foundProduct.productName,
            deleted: true
        }
        return result;
    }

}

module.exports = exportedMethods;
