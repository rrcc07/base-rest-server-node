const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const query = req.query        //query params (datos opvionales en la url) (igual se puede destructurar)
  res.json({
    msg: "get API - controlador",
    query
  });
};

const usuariosPost = (req, res = response) => {
    const body = req.body;
    // const { nombre, edad } = req.body        //filtramos datos de la entrada
    res.json({
    msg: "post API",
    body        //nombre, edad  //podemos mostrar lo filtrado
  });
};

const usuariosPut = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "put API",
    id
  });
};
const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API",
  });
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
