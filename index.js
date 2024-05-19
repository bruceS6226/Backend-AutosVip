const express = require('express');
const cors = require('cors');
const router = require('./src/routes/repuestos-routes');
const dotenv = require('dotenv').config();
const path = require('path')

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
    }
    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Servidor funcionando en el puerto ${this.port}`)
        })
    }
    routes(){
        this.app.use(process.env.API, router);
        this.app.use(`${process.env.API}uploads`, express.static(path.join(__dirname,'/uploads')));
    }
    midlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }
}

const server = new Server();