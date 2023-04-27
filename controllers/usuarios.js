const { response, request } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0} = req.query        //query params (datos opvionales en la url) (igual se puede destructurar)
  const query = { estado: true};
  
  //agrupamos las promesas para que se ejecuten en paralelo
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)    //en el filtro agregamos query (estado:true), para que no muestre los "borrados"
    .skip(Number(desde))  
    .limit(Number(limite))
  ]);

  res.json({
    total,
    usuarios
  });
};

const usuariosPost = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body        //filtramos datos de la entrada
    const usuario = new Usuario({nombre, correo, password, rol});
    
    //bcryptjs -> ecnriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    
    
    //mongoose -> graba los cambios
    await usuario.save();

    res.json({
      usuario
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //TODO validar contra la base de datos
  if( password ){
    //encriptar contraseña en 'resto'
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate( id, resto );     //resto es todo lo que actualizaremos

  res.json({
    usuario
  });
};
const usuariosDelete = async (req, res = response) => {
  const {id} = req.params;

  //borara fisicamente
  //const usuario = await Usuario.findByIdAndDelete(id);

  //solo cambiar el estado del usuario (simularemos eliminarlo)
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false});
  res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API",
  });
};


module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
};
