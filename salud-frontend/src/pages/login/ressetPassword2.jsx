import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
} from "@mui/material";
import { loginUser } from "../../services/user-service";
import "./Login.scss";

export default function ResetPassword() {
    const [mostrarContrasenia] = useState(false);
    const [setMostrarErrorAlIngresar] = useState(false);
    const [valores, setValores] = useState({
        contrasenia: "",
        contrasenia2: "",
    });
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
            history.push("/login");
          })
          .catch((err) => {
            setMostrarErrorAlIngresar(true);
            console.log(err);
          });
      };

    return (
        <div className="loginBackground">
            <Box component="form" className="loginForm">
                <TextField
                    fullWidth
                    sx={{ marginTop: "20px" }}
                    required
                    type={mostrarContrasenia ? "text" : "password"}
                    label="Nueva contraseña"
                    name="contrasenia"
                    value={valores.contrasenia}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    sx={{ marginTop: "20px" }}
                    required
                    type={mostrarContrasenia ? "text" : "password"}
                    label="Repita su nueva contraseña"
                    name="contrasenia2"
                    value={valores.contrasenia}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    sx={{ marginTop: "20px" }}
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                >
                    Recuperar
                </Button>
            </Box>
        </div>
    );
}
