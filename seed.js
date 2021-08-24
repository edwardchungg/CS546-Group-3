

const dbConnection = require('./config/mongoConnection');
const data = require('./data/');
const user = data.user;
const inventory = data.inventory;
const orders = data.order;


async function main() {
    const db = await dbConnection();
    await db.dropDatabase();

    //user 1 to 5
    const user1 = await user.addUser("dxp@gmail.com",'12345678','Dixa','patel','owner','hoboken-nj');
    const user2 = await user.addUser("dp@gmail.com",'abcdefg','Diya','patel','manager','KendallPark-nj');
    const user3 = await user.addUser("hpp@gmail.com",'xyzhe','hp','patel','seller','Edison-nj');
    const user4 = await user.addUser("dxp@gmail.com",'12345678','edward','abc','owner','hoboken-nj');
    const user5 = await user.addUser("dxp@gmail.com",'12345678','yang','def','owner','hoboken-nj');
        

    // product 1 to 5

    const product1 = await inventory.addInventory("Tile1","round","red","Abc",60,10,TL1);
    const product2 = await inventory.addInventory("Tile2","square","blue","def",70,50,TL2);
    const product3 = await inventory.addInventory("Tile3","triangle","yellow","pqr",50,10,TL3);
    const product4 = await inventory.addInventory("Tile4","round","black","Abc",60,20,TL4);
    const product5 = await inventory.addInventory("Tile5","square","green","xyz",60,10,TL5);


    // order 1 to 5

    const order1 = await order.addOrder(user1._id, product1._id, 5, 20, "49 Pershing place", "2021-10-21", true, "Dixa", product1.productId);
    const order2 = await order.addOrder(user2._id, product2._id, 1, 50, "50 Pershing place", "2021-10-22", true, "Diya" , product2.productId);
    const order3 = await order.addOrder(user3._id, product3._id, 5, 50, "48 Pershing place", "2022-10-21", false, "yang", product3.productId);
    const order4 = await order.addOrder(user4._id, product4._id, 2, 40, "51 Pershing place", "2023-10-21", true, "edward", product4.productId);
    const order5 = await order.addOrder(user5._id, product5._id, 6, 60, "52 Pershing place", "2025-10-21", true, "hp",product5.productId);


}

main().catch((error) => {
    console.log(error);
});