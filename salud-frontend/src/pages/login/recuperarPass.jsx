import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
} from "@mui/material";
import "./Login.scss";
import Alerta from "./Alerta";
import axios from "axios";

export default function RecuperarPass() {

    const [email, setEmail] = useState('');
	const [alerta, setAlerta] = useState({});
    
    const handleSubmit = async e => {
        e.preventDefault();
        
	if(email === '' || email.length <6) {
		setAlerta({
			msg: 'El Email es obligatorio',
			error: true
		});
		return
	}
    try {
        const { data } = await axios.post(`http://localhost:8080/users/reset`, { email })

        console.log(data)
    } catch (error) {
        console.log(error.response)
    }
      }
	
	const { msg } = alerta

    return (
        <div className="loginBackground">
            <h1 className="titulo">
                Reestablece tu contraseña
            </h1>
            <Box component="form" className="loginForm">
                { msg && <Alerta alerta={alerta} /> }
                <TextField
                    fullWidth
                    sx={{ marginTop: "20px" }}
                    required
                    label="E-mail"
                    name="email"
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
                />
                <Button
                    type="submit"
                    sx={{ marginTop: "20px" }}
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                >
                    Enviar email
                </Button>
            </Box>
        </div>
	);
}
