const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        
        //conectar a BD
        this.conectarDB();

        //middlewares
        this.middlewares();
        
        //rutas de la aplicacion
        this.routes();
    }

    async conectarDB(){
        //se puede crear varias conecciones (prod, dev)
        await dbConnection();
    }
    middlewares() {
        //CORS
        this.app.use( cors() );

        //Lectura y parseo(a json) del body
        this.app.use(express.json());

        //directorio publico
        this.app.use( express.static('public') );
    }

    //creamos las rutas
    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    //levantamos el server
    listen() {
        this.app.listen(this.port)
    }
    
}

module.exports = Server