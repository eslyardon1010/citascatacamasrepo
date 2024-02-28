const baseDeDatos = require("../utils/baseDeDatos");
const CryptoJS = require("crypto-js");

class Usuario {
  constructor(nombre, ap_paterno, ap_materno, email, password, telefono, foto) {
    this.nombre = nombre;
    this.ap_paterno = ap_paterno;
    this.ap_materno = ap_materno;
    this.email = email;
    this.password = password;
    this.telefono = telefono;
    this.foto = foto;
  }

  Agregartecnico(id) {
    const hash = CryptoJS.SHA256(this.password);
    const hashString = hash.toString(CryptoJS.enc.Hex);

    return baseDeDatos.execute(
      "INSERT INTO usuario (idUsuario, nombre, ap_paterno, ap_materno, email, password, telefono, foto, estado, idRol) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        null,
        this.nombre,
        this.ap_paterno,
        this.ap_materno,
        this.email,
        hashString,
        this.telefono,
        this.foto,
        1,
        2,
      ]
    );
  }

  static Vertecnicos() {
    return baseDeDatos.execute("SELECT * FROM usuario where idRol = 2");
  }

  static VerCitas(id) {
    return baseDeDatos.execute(
      "SELECT cita.*, cita.duracion AS duracionCita, usuario.nombre AS nombretecnico, usuario.ap_paterno AS ap_paternotecnico, servicio.*, servicio.duracion AS duracionServicio FROM cita JOIN usuario ON cita.idtecnico = usuario.idUsuario JOIN cita_servicio ON cita.idCita = cita_servicio.idCita JOIN servicio ON cita_servicio.idServicio = servicio.idServicio WHERE cita.idCliente = ? ORDER BY cita.fecha DESC, cita.hora DESC",
      [id]
    );
  }

  static getServicios() {
    return baseDeDatos.execute("SELECT * FROM servicio");
  }

  static Borrartecnico(id) {
    return baseDeDatos.execute("DELETE FROM usuario WHERE idUsuario = ?", [id]);
  }

  Actualizartecnico(id) {
    if (this.password != "") {
      const hash = CryptoJS.SHA256(this.password);
      const hashString = hash.toString(CryptoJS.enc.Hex);
      return baseDeDatos.execute(
        "UPDATE usuario SET nombre=?, ap_paterno=?, ap_materno=?, email=?, password=?, telefono=?, foto=? WHERE idUsuario = ?",
        [
          this.nombre,
          this.ap_paterno,
          this.ap_materno,
          this.email,
          hashString,
          this.telefono,
          this.foto,
          id,
        ]
      );
    } else {
      return baseDeDatos.execute(
        "UPDATE usuario SET nombre=?, ap_paterno=?, ap_materno=?, email=?, telefono=?, foto=? WHERE idUsuario = ?",
        [
          this.nombre,
          this.ap_paterno,
          this.ap_materno,
          this.email,
          this.telefono,
          this.foto,
          id,
        ]
      );
    }
  }

  static VerClientes() {
    return baseDeDatos.execute("SELECT * FROM usuario where idRol = 1");
  }

  static GetDatos(id) {
    return baseDeDatos.execute("SELECT * FROM usuario where idUsuario = ?", [
      id,
    ]);
  }
  static GetHorario(idtecnico, idDia) {
    return baseDeDatos.execute(
      "SELECT * from horario where idtecnico = ? AND idDia = ?",
      [idtecnico, idDia]
    );
  }

  static getCitas(idtecnico, fecha) {
    return baseDeDatos.execute(
      "SELECT * from cita where idtecnico = ? AND fecha = ? AND (estado = 0 OR estado = 1) ORDER BY fecha ASC",
      [idtecnico, fecha]
    );
  }

  static GetCitastecnico(idtecnico) {
    return baseDeDatos.execute(
      // "SELECT * from cita where idtecnico = ? ORDER BY fecha ASC",
      "SELECT cita.idCita, cita.estado, cita.fecha_creacion, cita.fecha, cita.hora, cita.duracion AS duracionCita, usuario.idUsuario AS idCliente, usuario.nombre AS nombreCliente, usuario.ap_paterno, usuario.ap_materno, servicio.*, servicio.nombre AS nombreServicio, servicio.duracion AS duracionServicio FROM cita JOIN usuario ON cita.idCliente = usuario.idUsuario JOIN cita_servicio ON cita.idCita = cita_servicio.idCita JOIN servicio ON cita_servicio.idServicio = servicio.idServicio WHERE cita.idtecnico = ? ORDER BY cita.fecha DESC, cita.hora DESC",
      [idtecnico]
    );
  }

  static getCitasClientes() {
    return baseDeDatos.execute(
      "SELECT cita.*, cita.duracion AS duracionCita, usuariotecnico.nombre AS nombretecnico, usuariotecnico.ap_paterno AS ap_paternotecnico, usuarioCliente.nombre AS nombreCliente, usuarioCliente.ap_paterno AS ap_paternoCliente, usuarioCliente.ap_materno AS ap_maternoCliente, servicio.*, servicio.duracion AS duracionServicio FROM cita JOIN usuario AS usuariotecnico ON cita.idtecnico = usuariotecnico.idUsuario JOIN usuario AS usuarioCliente ON cita.idCliente = usuarioCliente.idUsuario JOIN cita_servicio ON cita.idCita = cita_servicio.idCita JOIN servicio ON cita_servicio.idServicio = servicio.idServicio ORDER BY cita.fecha DESC, cita.hora DESC"
    );
  }

  AgregarCliente() {
    const hash = CryptoJS.SHA256(this.password);
    const hashString = hash.toString(CryptoJS.enc.Hex);

    return baseDeDatos.execute(
      "INSERT INTO usuario (idUsuario, nombre, ap_paterno, ap_materno, email, password, telefono, foto, estado, idRol) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        null,
        this.nombre,
        this.ap_paterno,
        this.ap_materno,
        this.email,
        hashString,
        this.telefono,
        this.foto,
        1,
        1,
      ]
    );
  }

  static BorrarPerfilCliente(id) {
    return baseDeDatos.execute(
      "DELETE FROM usuario WHERE idUsuario = ? AND idRol = ?",
      [id, 1]
    );
  }
}

module.exports = Usuario;
