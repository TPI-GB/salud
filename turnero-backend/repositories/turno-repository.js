const Turno = require("../models/turno-model");

class TurnoRepository {
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
    const { fecha, lugar, medico } = data;
    try {
      let newData = {};

      newData.fecha = fecha;
      newData.lugar = lugar;
      newData.medico = medico;

      await Turno.findByIdAndUpdate({ _id: id }, newData);

      const turnoStored = await Turno.findById(id);

      return turnoStored;
    } catch (err) {
      console.log(err);
    }
  }

  async asignarTurno(data) {
    const { paciente } = data;
    try {
      let newData = {};

      newData.paciente = paciente;
      newData.disponible = false;

      await Turno.findByIdAndUpdate({ _id: id }, newData);

      const turnoStored = await Turno.findById(id);

      return turnoStored;
    } catch (err) {
      console.log(err);
    }
  }

  async liberarTurno() {
    try {
      let newData = {};

      newData.paciente = null;
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
    const turnosFilter = turnos.filter(
      (t) =>
        t.medico === medico &&
        t.fecha.getDay() === fecha.getDay() &&
        t.fecha.getMonth() === fecha.getMonth() &&
        t.fecha.getYear() === fecha.getYear()
    );
    return turnosFilter;
  }
  async anularTurno() {
    try {
      let newData = {};

      newData.paciente = null;
      newData.disponible = null;

      await Turno.findByIdAndUpdate({ _id: id }, newData);

      const turnoStored = await Turno.findById(id);

      return turnoStored;
    } catch (err) {
      console.log(err);
    }
  }

  async anularTodosLosTurnos(data) {
    let newData = {};

    newData.paciente = null;
    newData.disponible = null;

    let turnos = this.getTurnoPorNombreYFecha(data);

    turnos.array.forEach((t) => {
      t.anularTurno(data), newData;
    });

    return turnos;
  }
  catch(error) {
    console.log(err);
  }
}

module.exports = TurnoRepository;
