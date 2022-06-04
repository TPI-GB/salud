import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = process.env.REACT_APP_BASE_URL;

export async function AsignarTurno(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/asignar`,
      method: "PUT",
      data: data,
    });
    Swal.fire({
      title: "Hecho!",
      text: "El turno se asigno correctamente",
      icon: "success",
      confirmButtonText: "Regresar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location = "/";
      }
    });
    return response;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Error al editar el lugar, asegurese de no haber ingresado una dirección ya registrada u otro dato incorrecto",
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
    Swal.fire({
      title: "Listo!",
      text: "El turno ha sido editado correctamente",
      icon: "success",
      confirmButtonText: "Regresar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location = "/";
      }
    });
    return response;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Error al editar el turno, asegurese de no haber ingresado datos incorrectos",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}

export async function EditarTurnoRequest(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/turns/edit`,
      method: "PUT",
      data: data,
    });
    return response;
  } catch (err) {
    console.error(err);
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
