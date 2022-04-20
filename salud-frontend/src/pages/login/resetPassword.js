import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
} from "@mui/material";
import { loginUser } from "../../services/user-service";
import "./Login.scss";
import Alerta from "./Alerta";

export default function ResetPassword() {

    const [email, setEmail] = useState('');
	const [alerta, setAlerta] = useState({});
    
    const handleSubmit = async e => {
        e.preventDefault();
        
	if(email === '' || email.length <6) {
		setAlerta({
			msg: 'El Email es obligatorio',
			error: true
		});
        console.log({handleSubmit});
		return
	}
      }
	
	const { msg } = alerta

    return (
        <>
        <div className="loginBackground">
            <Box component="form" className="loginForm">
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
                    ENVIAR INSTRUCCIONES
                </Button>
            </Box>
            { msg && <Alerta alerta={Alerta} />}
        </div>
    </>
	);
}
