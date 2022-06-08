import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  Collapse,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom";
import loginImg from "../../assets/img/loginlogo.svg";
import { loginUser } from "../../services/user-service";
import "./Login.scss";
import "./resetPass";

export default function Login() {
  const [valores, setValores] = useState({
    email: "",
    contrasenia: "",
  });
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [mostrarErrorAlIngresar, setMostrarErrorAlIngresar] = useState(false);
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValores({ ...valores, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(valores)
      .then((usuario) => {
        // Guarga los datos del usuario registrado en localStorage
        sessionStorage.setItem("user", JSON.stringify(usuario));
        // Para que el hook useHistory funcione, este componente debe estar envuelto
        // en un componente Router, de lo contrario history quedara indefinido
        history.push("/Home");
      })
      .catch((err) => {
        setMostrarErrorAlIngresar(true);
        console.log(err);
      });
  };

  const handleClickMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="loginBackground">
      <h1 className="titulo">
        BIENVENIDOS A SALUD GB
      </h1>
      <Box component="form" className="loginForm">
        <div className="loginForm-logo">
          <img src={loginImg} />
        </div>
        <TextField
          fullWidth
          sx={{ marginTop: "20px" }}
          required
          label="E-mail"
          name="email"
          value={valores.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          sx={{ marginTop: "20px" }}
          required
          type={mostrarContrasenia ? "text" : "password"}
          label="Contraseña"
          name="contrasenia"
          value={valores.contrasenia}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickMostrarContrasenia}
                  onMouseDown={handleMouseDownPassword}
                >
                  {mostrarContrasenia ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Collapse in={mostrarErrorAlIngresar} sx={{ mt: "20px" }}>
          <Alert
            variant="filled"
            severity="error"
            onClose={() => {
              setMostrarErrorAlIngresar(false);
            }}
          >
            Usuario o contraseña incorrectos, por favor, inténtelo nuevamente.
          </Alert>
        </Collapse>
        <Link className="reset" to="./resetPass">
          He olvidado mi contraseña
        </Link>
        <Button
          type="submit"
          sx={{ marginTop: "20px" }}
          variant="contained"
          color="success"
          onClick={handleSubmit}
        >
          INGRESAR
        </Button>
      </Box>
    </div>
  );
}
