import React from "react";
import MedicalGenericList from "../MedicalGenericList";
import MasksIcon from "@mui/icons-material/Masks";

export default function MedicalConsultationList(props) {
  const { consultas } = props;
  const links = {
    create: "/",
    edit: "/",
  };

  return (
    <MedicalGenericList
      data={consultas}
      icon={<MasksIcon size={"large"} />}
      title="Consultas"
      links={links}
      borderColor="green"
      idScroll="consultationsList"
    />
  );
}
