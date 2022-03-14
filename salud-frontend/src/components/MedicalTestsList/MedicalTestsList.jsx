import React from "react";
import MedicalGenericList from "../MedicalGenericList";
import BiotechIcon from "@mui/icons-material/Biotech";

export default function MedicalTestsList(props) {
  const { estudios } = props;
  const links = {
    create: "/",
    edit: "/",
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
