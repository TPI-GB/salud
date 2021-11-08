import React, { useState } from "react"
import { Box, TextField, Button, InputAdornment, IconButton } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useHistory } from "react-router-dom";
import { ReactComponent as LoginLogo } from "../../assets/img/login-logo.svg";
import { loginUser } from '../../services'
import "./Login.scss"

export default function Login() {
    const [valores, setValores] = useState({
        email: "",
        contrasenia: "",
    })
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false)
    const [mostrarErrorAlIngresar, setMostrarErrorAlIngresar] = useState(false)
    const history = useHistory();
  
    const handleChange = (event) => {
        const {name, value} = event.target
        setValores({ ...valores, [name]: value })
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      loginUser(valores).then((usuario) => {
      // Guarga los datos del usuario registrado en localStorage
          localStorage.setItem('user', JSON.stringify(usuario));
      // Para que el hook useHistory funcione, este componente debe estar envuelto
      // en un componente Router, de lo contrario history quedara indefinido
          history.push("/home");
        }
        ).catch( (err) => {
          setMostrarErrorAlIngresar(true)
          console.log(err);
        })
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
            label="E-mail"
            name="email"
            value={valores.email}
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
           {
              mostrarErrorAlIngresar && (
                <h3 className="loginForm-error">E-mail o contraseña inválidos, inténtelo de nuevo.</h3>
              )            
            }
          <Button 
            type="submit"
            sx={{marginTop: "20px"}}
            variant="outlined"
            onClick={handleSubmit}
          >
            Ingresar
          </Button>
      </Box>
    </div>
  )
}