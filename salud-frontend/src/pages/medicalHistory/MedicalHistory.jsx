import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Box, Paper } from "@mui/material";
import { getMedicalHistoryDetailsById } from "../../services/medical-history-service";

//Componentes para la página
import FormHeader from "../../components/FormHeader";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MedicalHistoryData from "../../components/MedicalHistoryData";
import MedicalConsultationList from "../../components/MedicalConsultationsList";
import MedicalTestsList from "../../components/MedicalTestsList";
import Loading from "../../components/Loading";

export default function MedicalHistory() {
  const [medicalHistory, setMedicalHistory] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await getMedicalHistoryDetailsById(id);
      setMedicalHistory(response.data);
      setIsLoading(false);
    };
    getData();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#DFDFDF" }}>
      <FormHeader
        title="Historia clínica"
        subTitle="Datos personales, consultas y estudios."
        icon={<AssignmentIcon fontSize="large" />}
      />
      <Paper sx={{ margin: "16px 32px", padding: "24px" }}>
        <Box sx={{ marginBottom: "8px" }}>
          <MedicalHistoryData data={medicalHistory} />
        </Box>
        <Box sx={{ marginTop: "12px", marginBottom: "12px" }}>
          <MedicalConsultationList consultas={medicalHistory.consultas} />
        </Box>
        <Box sx={{ marginTop: "12px", marginBottom: "12px" }}>
          <MedicalTestsList estudios={medicalHistory.estudios} />
        </Box>
      </Paper>
    </Box>
  );
}
