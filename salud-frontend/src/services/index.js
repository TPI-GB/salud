import axios from 'axios'

export async function loginUser (credentials) {
    const {email, contrasenia} = credentials;

    const token = Buffer.from(email+":"+contrasenia).toString('base64');
    const method = "Basic "
    const encriptado = method+token

    console.log(encriptado)

    try {
        const response = await axios.post("http://localhost:8080/users/login", {}, {headers: {
            "Authorization": encriptado,
            "Content-Type": "application/json"
        }})

        return response
    } catch (e) {
        console.log(e)
    }
}