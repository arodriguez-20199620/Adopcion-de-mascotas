const express = require('express');
const { dbConnection } = require('../db/config');
const cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.conectarDB();
        this.middlewares();

    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutado y escuchando en el puerto', this.port);
        });
    }

}

module.exports = Server;