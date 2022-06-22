import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = process.env.REACT_APP_BASE_URL;

export async function AsignarTurno(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/turns/asignar`,
      method: "PUT",
      data: data,
    });
    Swal.fire({
      title: "Hecho!",
      text: "El turno se asigno correctamente",
      icon: "success",
      confirmButtonText: "Regresar",
    });
    return response;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Error al asignar",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}

export async function GetTurnos() {
  try {
    const response = await axios({
      url: `${baseUrl}/turns`,
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function GetTurnoById(id) {
  try {
    const response = await axios({
      url: `${baseUrl}/${id}`,
      method: "GET",
    });
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function EditarTurnoRequest(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/turns/edit`,
      method: "PUT",
      data: data,
    });
    Swal.fire({
      title: "Hecho!",
      text: "El turno se edito correctamente",
      icon: "success",
      confirmButtonText: "Regresar",
    });
    return response;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Error al editar",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}

export async function GetTurnosFilter(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/turns/buscador`,
      method: "POST",
      data: data,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

export async function AnularTurnoRequest(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/turns/anular`,
      method: "PUT",
      data: data,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

export async function LiberarTurnoRequest(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/turns/liberar`,
      method: "PUT",
      data: data,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

export async function CrearDisponibilidadRequest(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/disponibilidadUsuario`,
      method: "POST",
      data: data,
    });
    Swal.fire({
      title: "Hecho!",
      text: "La disponibilidad fue cargada",
      icon: "success",
      confirmButtonText: "OK",
    });
    return response.data;
  } catch (err) {
    Swal.fire({
      title: "Error!",
      text: "La disponibilidad no pudo ser cargada",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error(err);
  }
  return [];
}
