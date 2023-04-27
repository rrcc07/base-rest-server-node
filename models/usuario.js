/**{
    nombre: '',
    corre: '',
    password: '',
    img: '',
    rol:'',
    estado: false,
    google: false
}*/

const { Schema, model } = require('mongoose');
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'La contraseña es obligatorio']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
// sobreescribir el metodo para hacer un filtro y quitar algunos atributos
UsuarioSchema.methods.toJSON = function(){
    const { __v, password, ...usuario } = this.toObject();  //quita __v, password, ..usuario ( y lo demas se va a usuario)
    return usuario;
}


//mongoose configura'Usuario' 
module.exports = model( 'Usuario', UsuarioSchema)