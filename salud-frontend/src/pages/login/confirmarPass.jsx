import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton
} from "@mui/material";
import "./Login.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Alerta from "./Alerta";

export default function ConfirmarPass() {
  const [contrasenia, setContrasenia] = useState('');
  const [contrasenia2, setContrasenia2] = useState('');
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [tokenValido, setTokenValido] = useState(false)
  const [contraseniaModificada, setContraseniaModificada] = useState(false)
  const [alerta, setAlerta] = useState({})

  const { token } = useParams()

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await axios(`http://localhost:8080/users/reset/${token}`)
        setTokenValido(true)
        console.log(tokenValido)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken()
  }, [])

  const handleClickMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if ([contrasenia, contrasenia2]) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }
    if (contrasenia !== contrasenia2) {
      setAlerta({
        msg: 'Las contraseñas no coinciden',
        error: true
      })
      return
    }

    if(contrasenia.length < 6) {
      setAlerta({
          msg: 'La contraseña debe tener un minimo de 6 caracteres',
          error: true
      })
      return
  }
    try {

      const { data } = await axios.post((`http://localhost:8080/users/reset/${token}`), { contrasenia })
      setAlerta({
        msg: data.msg,
        error: false
      })
      setContraseniaModificada(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

const { msg } = alerta

return (
  <div className="loginBackground">
    <h1 className="titulo">
      Crea tu nueva contraseña
    </h1>
    {tokenValido && (
      <Box component="form" className="loginForm">
        
        {msg && <Alerta alerta={alerta} />}

        <TextField
          fullWidth
          sx={{ marginTop: "20px" }}
          required
          type={mostrarContrasenia ? "text" : "password"}
          label="Nueva contraseña"
          name="contrasenia"
          value={contrasenia}
          onChange={e => setContrasenia(e.target.value)}
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
        <TextField
          fullWidth
          sx={{ marginTop: "20px" }}
          required
          type={mostrarContrasenia ? "text" : "password"}
          label="Repita su nueva contraseña"
          name="contrasenia2"
          value={contrasenia2}
          onChange={e => setContrasenia2(e.target.value)}
        />
        <Button
          type="submit"
          sx={{ marginTop: "20px" }}
          variant="contained"
          color="success"
          onClick={handleSubmit}
        >
          Reestablecer contraseña
        </Button>
      </Box>
      )}
    {contraseniaModificada && (
      <Link
        className='home'
        to="/"
      >Iniciar Sesión
      </Link>
    )}
  </div>
);
}
