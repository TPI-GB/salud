const Turno = require("../models/turno-model");

class TurnoRepository {
  async getTurnoById(id) {
    try {
      const turno = await Turno.findById(id);

      return turno;
    } catch (err) {
      console.log(err);
    }
  }

  async getTurnos() {
    return await Turno.find();
  }

  async crearTurno(data) {
    const { fecha, lugar, medico } = data;
    try {
      const turno = await Turno.create({
        fecha,
        lugar,
        medico,
        disponible: true,
        esSobreTurno: false,
      });
      return await turno.save();
    } catch (err) {
      console.log(err);
    }
  }

  async crearSobreTurno(data) {
    const { fecha, lugar, medico, paciente } = data;
    try {
      const turno = await Turno.create({
        fecha,
        lugar,
        medico,
        paciente,
        disponible: false,
        esSobreTurno: true,
      });
      return await turno.save();
    } catch (err) {
      console.log(err);
    }
  }

  async editarTurno(data) {
    const { id, paciente } = data;
    try {
      let newData = {};

      newData.paciente = paciente;

      await Turno.findByIdAndUpdate({ _id: id }, newData);

      const turnoStored = await Turno.findById(id);

      return turnoStored;
    } catch (err) {
      console.log(err);
    }
  }

  async asignarTurno(data) {
    const {id, pacienteNombre, pacienteApellido, pacienteObraSocial, pacienteDni, pacienteTelefono } = data;
    try {
      let newData = {};

      newData.paciente = {nombre: pacienteNombre, apellido: pacienteApellido, obraSocial: pacienteObraSocial, dni: pacienteDni, telefono: pacienteTelefono};
      newData.disponible = false;

      await Turno.findByIdAndUpdate({ _id: id }, newData);

      const turnoStored = await Turno.findById(id);

      return turnoStored;
    } catch (err) {
      console.log(err);
    }
  }

  async liberarTurno(data) {
    try {
      const { id } = data;

      let newData = {};

      newData.paciente = "";
      newData.disponible = true;

      await Turno.findByIdAndUpdate({ _id: id }, newData);

      const turnoStored = await Turno.findById(id);

      return turnoStored;
    } catch (err) {
      console.log(err);
    }
  }

  async borrarTurno(data) {
    const { id } = data;
    try {
      return await Turno.deleteOne({ _id: id });
    } catch (err) {
      console.log(err);
    }
  }

  async getTurnoPorNombreYFecha(data) {
    const { fecha, medico } = data;
    const turnos = await Turno.find();
    const fechaDate = new Date(fecha);
    const turnosFilter = turnos.filter(
      (t) =>
        t.medico === medico &&
        t.fecha.getDate() === fechaDate.getDate() &&
        t.fecha.getMonth() === fechaDate.getMonth() &&
        t.fecha.getFullYear() === fechaDate.getFullYear()
    );
    return turnosFilter;
  }
  async anularTurno(data) {
    try {
      let newData = {};
      const { id } = data;

      newData.paciente = "";
      newData.lugar = "";
      newData.disponible = false;
      newData.anulado = true;

      await Turno.findByIdAndUpdate({ _id: id }, newData);

      const turno = Turno.findById({ _id: id });

      return turno;
    } catch (err) {
      console.log(err);
    }
  }

  async anularTodosLosTurnos(data) {
    let newData = {};
    const { id } = data;

    newData.paciente = "";
    newData.lugar = "";
    newData.disponible = false;
    newData.anulado = true;

    await Turno.findByIdAndUpdate({ _id: id }, newData);

    const turno = Turno.findById({ _id: id });

    return turno;
  }
  catch(err) {
    console.log(err);
  }
}

module.exports = TurnoRepository;
