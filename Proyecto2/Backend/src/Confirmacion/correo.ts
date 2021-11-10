import nodemailer from "nodemailer";


export class Correo{

    nombre: string;
    apellido: string;
    correo: string;



  constructor(nombre: string, apellido: string, correo: string) {
    this.apellido = apellido;
    this.nombre = nombre;
    this.correo = correo;
  }

  transport: any = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: '',
        pass: ''  //-activar el acceso de aplicaciones no seguras a su cuenta de google
    }
});



async enviarCorreo(){
    console.log("ENTREEEEEEEEEEEE")

    var password : string = "password"
    var contenido= "Buen dia, es un gusto que forme parte de nuestro proceso de seleccion, tu usuario para ingresar a la plataforma es  : "+ this.nombre+"005  y tu contreasena es: " +password + "\n Saludos, TOTONET SA.";

    var mailOptions = {
        from : "mia2021p2@gmail.com",
        to : this.correo,
        subject: "Nuevas Credenciales TOTONET SA",
        text: contenido
    };


    await this.transport.sendMail(mailOptions, (error: any, info: any)=>{

        if(error){

            console.log("Ha ocurrido un error al enviar correo");
        }else{
            console.log("Correo enviado con exito , ", info.response)
        }

    });

    return password;
}


async EnviarContenido(){
    console.log("ENTREEEEEEEEEEEEEEEEEE");

    var contenido= "Notificacion de ingreso: Nuevo aplicante, se detalla la informacion: \n"+
    "Nombre: "+ this.nombre + "\n Apellido: " +this.apellido + "\n Correo: "+this.correo;

    var mailOptions ={
        from: "mia2021p2@gmail.com",
        to: "mia2021p2@gmail.com",
        subject: "Nuevo APlicante",
        text: contenido,
    };

    await this.transport.sendMail(mailOptions, (error: any, info: any)=>{
        if (error){
            console.log("Ha ocurrido un error");
        }else{
            console.log("Correo de nuevo aplicante enviado :", info.response)
        }


    });
}



}
