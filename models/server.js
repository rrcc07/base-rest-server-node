const express = require('express')
const cors = require('cors')


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        
        //middlewares
        this.middlewares();
        
        //rutas de la aplicacion
        this.routes();
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