// Este archivo solo esta para poder encriptar una contraseña cualquiera
// y asi poder agregar el primer usuario admin desde mongoDB

const bcrypt = require('bcryptjs');

async function contraseniaEncriptada(contrasenia) {
    const contra = await bcrypt.hash(contrasenia, 10).then((contra) => console.log(contra))

    
}

contraseniaEncriptada("jmh")

const admin = {
    "nombre": "Juan",
    "apellido": "String",
    "nick": "juanelvasco",
    "roles": ["admin"],
    "contrasenia": "$2a$10$dZGY3emHoNIB9ipp3FCq5u/HjbVs0UCef0TwtoWPxh6FHaYE2kYZ6",
    "mail": "juanelvasco@gmail.com",
    "tipodocumento": "DNI",
    "numerodocumento": "34791729"
}
