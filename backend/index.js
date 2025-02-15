"use strict"

const mongoose = require("mongoose");
const app = require("./app.js");
const port = process.env.PORT || 3977;

async function startServer() {
    try {
        await mongoose.connect('mongodb://localhost:27017/distintosBD', {  useUnifiedTopology: true });
        console.log("La base de datos está corriendo perfectamente");

        app.listen(port, function() {
            console.log(`El servidor del API está escuchando en http://localhost:${port}`);
        });
    } catch (err) {
        console.log("La base de datos no está corriendo perfectamente");
        throw err;
    }
}

startServer();