import React, { useState } from "react"
import { Box, TextField, Button } from "@mui/material"
import { ReactComponent as LoginLogo } from "../../assets/img/login-logo.svg";
import "./Login.scss"

export default function Login() {
    const [valores, setValores] = useState({
        usuario: "",
        contrasenia: "",
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setValores({ ...valores, [name]: value })
    }

  return (
      <Box component="form" className="loginForm" >
          <div className="loginForm-logo">
            <LoginLogo />
          </div>
          <TextField
            fullWidth
            sx={{marginTop: "20px"}}
            required
            label="Usuario"
            name="usuario"
            value={valores.usuario}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            sx={{marginTop: "20px"}}
            required
            type="password"
            label="Contraseña"
            name="contrasenia"
            value={valores.contrasenia}
            onChange={handleChange}
          />
          <Button 
            sx={{marginTop: "20px"}}
            variant="outlined"
          >
            Ingresar
          </Button>
      </Box>
  )
}