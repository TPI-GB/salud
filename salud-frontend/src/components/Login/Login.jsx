import React, { useState } from "react"
import { Box, TextField, Button, InputAdornment, IconButton } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { ReactComponent as LoginLogo } from "../../assets/img/login-logo.svg";
import "./Login.scss"

export default function Login() {
    const [valores, setValores] = useState({
        usuario: "",
        contrasenia: "",
    })
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false)

    const handleChange = (event) => {
        const {name, value} = event.target
        setValores({ ...valores, [name]: value })
    }

    const handleClickMostrarContrasenia = () => {
      setMostrarContrasenia(!mostrarContrasenia)
    }

    const handleMouseDownPassword = (event) => {
      event.preventDefault()
    }

  return (
    <div className="loginBackground">
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
            type={mostrarContrasenia ? 'text' : 'password'}
            label="Contraseña"
            name="contrasenia"
            value={valores.contrasenia}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickMostrarContrasenia}
                  onMouseDown={handleMouseDownPassword}
                >
                  {mostrarContrasenia ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>,
            }}
          />
          <Button 
            sx={{marginTop: "20px"}}
            variant="outlined"
          >
            Ingresar
          </Button>
      </Box>
    </div>
  )
}