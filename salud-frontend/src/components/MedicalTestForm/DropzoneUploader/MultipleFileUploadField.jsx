import React from "react";
import { DropzoneArea } from "react-mui-dropzone";

export default function MultipleFileUploadField({ ...props }) {
  function getFileAddedMessage(fileName) {
    return `El archivo ${fileName} se añadió con exito!`;
  }

  function getFileRemovedMessage(fileName) {
    return `El archivo ${fileName} ha sido removido!`;
  }

  return (
    <DropzoneArea
      dropzoneText="Arrastra y solta un archivo aquí o hace click"
      useChipsForPreview
      getFileAddedMessage={getFileAddedMessage}
      getFileRemovedMessage={getFileRemovedMessage}
      {...props}
    />
  );
}
