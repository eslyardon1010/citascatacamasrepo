//Modelos
const Usuario = require("../models/usuario");
require('dotenv').config()

//Metodo para agregar un tecnico a la base de datos
exports.postAgregartecnico = (req, res, next) => {
  const usuario = new Usuario(
    req.body.nombre,
    req.body.ap_paterno,
    req.body.ap_materno,
    req.body.email,
    req.body.password,
    req.body.telefono,
    `https://api.multiavatar.com/${req.body.nombre}.png?apikey=${process.env.MULTIAVATAR_API_KEY}`
  );
  usuario
    .Agregartecnico()
    .then(() => {
      res.end();
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
exports.puttecnico = (req, res) => {
  const usuario = new Usuario(
    req.body.nombre,
    req.body.ap_paterno,
    req.body.ap_materno,
    req.body.email,
    req.body.password,
    req.body.telefono,
    req.body.foto
  );
  usuario
    .Actualizartecnico(req.params.id)
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

exports.deletetecnico = (req, res) => {
  Usuario.Borrartecnico(req.params.id)
    .then((respuesta) => {
      res.json(respuesta[0]);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
