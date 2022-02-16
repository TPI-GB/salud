## Instalación

El proyecto está compuesto de dos partes principales, cada una con su propio directorio y proyecto npm. Luego de clonar el repositorio debería hacerse un `npm install` en cada directorio.

- /salud-frontend : contiene el front-end. Es un proyecto create-react-app. Iniciarlo con `cd salud-frontend` y `npm start`.
- /salud-backend: contiene el back-end. Es un proyecto que usa express y la base de datos MongoDB a traves de mongoose. Iniciarlo con `cd salud-backend` y `npm run dev`.

Si no existe una base de datos, se crea una automáticamente.

## Usuario inicial

Pasos para crear un usario para entrar en la aplicación: 
- Primero se debe codificar en base64 el email y la contrasenia que queramos usar de la siguiete forma:
mimail@gmail.com:micontrasenia
Link para codificar: https://www.base64encode.org/
- Ahora en Postman hay que crear una nueva petición con los siguientes datos:
  - Método: Post
  - Url: http://localhost:8080/users/register
- En los encabezados agregar los siguientes pares clave-valor:
  - Content-Type | application/json
  - credentials | Basic tuEmailYContraseniaCodificados
- En cuanto al cuerpo de la petición, este debera tener formato raw JSON como el siguiente:
  - {
    "nombre": "Bilbo",
    "apellido": "Bolsón",
    "roles": ["Admin"],
    "tipodocumento": "DNI",
    "numerodocumento": "100200300"
    }
    (Todos estos campos son requeridos, aunque sus valores no se verifican por el momento, es decir, numerodocumento podria tener valor "" e igual funcionaria)
- Por último enviar la petición, deberia devolver el JSON del usuario que se creó. 

## Integrantes

- Almada Fondovila, Martín
- Bassi, Romina
- Hiribarren, Juan Martín
- Trinchero, Tomas
