import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Alert,
    Collapse
} from "@mui/material";
import "./Login.scss";
import axios from "axios";

export default function ResetPass() {

    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState(false);
    
    const handleSubmit = async e => {
        e.preventDefault();
        
	if(email === '' || email.length <6) {
		setAlerta(true);
		return
	}
    try {
        const { data } = await axios.post(`http://localhost:8080/users/reset`, { email })

    } catch (error) {
        setAlerta(false);
    }
      }

    return (
        <div className="loginBackground">
            <h1 className="titulo">
                Reestablece tu contraseña
            </h1>
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
                <Collapse in={alerta} sx={{ mt: "20px" }}>
                    <Alert
                        variant="filled"
                        severity="error"
                        onClose={() => {
                            setAlerta(false);
                        }}
                    >
                        El email es obligatorio.
                    </Alert>
                </Collapse>
                <Button
                    type="submit"
                    sx={{ marginTop: "20px" }}
                    variant="contained"
                    color="success"
                    onSubmit={handleSubmit}
                >
                    Enviar email
                </Button>
            </Box>
        </div>
	);
}
