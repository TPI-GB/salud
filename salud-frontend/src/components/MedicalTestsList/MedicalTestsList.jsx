import React from "react";
import MedicalGenericList from "../MedicalGenericList";
import BiotechIcon from "@mui/icons-material/Biotech";

export default function MedicalTestsList(props) {
  const { estudios, idHistoria } = props;
  const links = {
    create: `/HistoriasClinicas/${idHistoria}/estudios`,
    edit: `/HistoriasClinicas/${idHistoria}/estudios/`,
  };

  return (
    <MedicalGenericList
      data={estudios}
      icon={<BiotechIcon size={"large"} />}
      title="Estudios"
      links={links}
      borderColor="blue"
      idScroll="TestsList"
    />
  );
}
