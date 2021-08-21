const express = require('express');
const connection = require('./config/mongoConnection');

const app = express();


app.listen(3000, () => {
    async () => {
        const db = await connection();
        await db.serverConfig.close();
    }


    console.log("The server is up and running !!!");
    console.log("The routes are running on http://localhost:3000");
})