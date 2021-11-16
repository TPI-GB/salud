import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Box, Typography } from "@mui/material"
import {getMedicalHistoryById} from "../../services/medicalHistoryService"

export default function MedicalHistory() {
    const [medicalHistory, setMedicalHistory] = useState({});

    const { id } = useParams()

    useEffect(() => {
        const getData = async () => {
            const response = await getMedicalHistoryById(id);
            setMedicalHistory(response.data);
        }
        getData();
    }, [id]);

    return (
        <Box>
            <Typography variant="h4" component="div" gutterBottom>
                {`Numero de historia: ${medicalHistory.numeroHistoriaClinica}`}
            </Typography>
        </Box>
    )
}