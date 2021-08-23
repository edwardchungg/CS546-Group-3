const dbConnection = require("../config/mongoConnection")
const users = require("../data/users")
const inventory = require("../data/inventory")
const orders = require("../data/orders")
const mongo = require('mongodb');
const {ObjectId} = require('mongodb');

async function main(){
    console.log("hello");
    const db = await dbConnection();

    await db.dropDatabase();

    /* Users */

    // User 1
    const user1 = await users.create("Edward", "Chung", "echung1@stevens.edu", "echung1", "seller", "1 Castle Point Terrace, Hoboken NJ", "$2y$16$pWqVsqG7uKMVk4GBFs2bBevYUZ3uTvxWplhx28rzbxzz5c8tG6rCW")
    const id1 = user1._id;

    // User 2
    const user2 = await users.create("Dixaben", "Patel", "dpatel@stevens.edu", "dpatel", "manager", "1 Castle Point Terrace, Hoboken NJ", "$2y$16$pWqVsqG7uKMVk4GBFs2bBevYUZ3uTvxWplhx28rzbxzz5c8tG6rCW")
    const id2 = user2._id;

    // User 2
    const user3 = await users.create("Yang", "Dai", "ydai@stevens.edu", "ydai", "manager", "1 Castle Point Terrace, Hoboken NJ", "$2y$16$pWqVsqG7uKMVk4GBFs2bBevYUZ3uTvxWplhx28rzbxzz5c8tG6rCW")
    const id3 = user3._id;

    const allUsers = await users.get();
    /* Inventory */

    // Product 1
    const product1 = await inventory.create('Outdoor Teak Wood Tile','oak', 'black','DDRPL','/images/outdoor_teak_wood_tile', 50, 20, 40, "echung1");
    const p_id1 = product1._id;

    // Product 2
    const product2 = await inventory.create('Indoor Wood Tile','Maple', 'Brown','DDRPL','/images/indoor_wood_tile', 40, 10, 30, "dpatel");
    const p_id2 = product2._id;

    // Product 3
    const product3 = await inventory.create('Indoor Birch Tile','birch', 'red','DDRPL','/images/indoor_birch_tile', 50, 20, 40, "ydai");
    const p_id3 = product3._id;

    const totalInventory = await inventory.get();

    /* Orders */

    // Order 1
    const order1 = await orders.create(ObjectId(p_id1).toString(),ObjectId(id1).toString(),10,500,'address','delivery_date',10,510, true, 50);
    const o_id1 = order1._id;
    
    // Order 2
    const order2 = await orders.create(ObjectId(p_id2).toString(),ObjectId(id2).toString(),10,500,'address','delivery_date',10,510, false, 50);
    const o_id2 = order2._id;

    // Order 3
    const order3 = await orders.create(ObjectId(p_id3).toString(),ObjectId(id3).toString(),10,500,'address','delivery_date',10,510, true, 50);
    const o_id3 = order3._id;

    const allOrders = await orders.get();


}


main().catch((error) => {
    console.error(error);
    return dbConnection().then((db) => {
      return db.serverConfig.close();
    });
  });