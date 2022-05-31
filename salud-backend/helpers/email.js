const nodemailer = require("nodemailer");

 emailResetPass = async (datos) => {
    const { email, token } = datos;
    
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "afe4b52e0f288e",
          pass: "8e918a41b607b4"
        }
      });

    //Información del email
    const info = await transport.sendMail({
        from: '"Salud GB" <cuentas@saludgb.com.ar>',
        to: email,
        subject: "Salud GB - Reestablece tu contraseña",
        text: "Reestablece tu contraseña en Salud Gb",
        html: `<p>Hola ${email} Reestablece tu contraseña en Salud Gb</p>
            <p>Haz click en el siguiente enlance para generar tu nueva contraseña:</p>
            <a href="${process.env.REACT_APP_API_URL}:${REACT_APP_API_PORT}/confirmarPass/${token}">Reestablecer Contraseña</a>
        `
    })

};

module.exports=emailResetPass;
