import React from "react";
import { useForm } from "react-hook-form";

export default function FormularioDeUsuario() {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
     
    return (
     <div>
       <h1>Alta de usuario</h1>     
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Nombre" {...register("nombre")} />
        <input placeholder="Apellido" {...register("apellido")} />
        <input placeholder="Nick" {...register("nick")} />
        <select placeholder="Roles" {...register("losRoles")}>
          <option value="Administrador">administrador</option>
          <option value="Doctor">doctor</option>
          <option value="other">other</option>
        </select>
        <input placeholder="Contrasenia" {...register("contrasenia")} />
        <input placeholder="Mail" {...register("mail")} />
        <input placeholder="Activo" {...register("activo")} />
        <input placeholder="Tipodocumento" {...register("tipodocumento")} />
        <input placeholder="Numerodocumento" {...register("numerodocumento")} />
        <input type="submit" />
      </form> 
     </div>
    );
}

// //nombre,
// apellido,
// nick,
// roles,
// contrasenia,
// mail,
// tipodocumento,
// numerodocumento,