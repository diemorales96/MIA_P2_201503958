"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Correo = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class Correo {
    constructor(nombre, apellido, correo) {
        this.transport = nodemailer_1.default.createTransport({
            service: "gmail",
            secure: false,
            auth: {
                user: '',
                pass: '' //-activar el acceso de aplicaciones no seguras a su cuenta de google
            }
        });
        this.apellido = apellido;
        this.nombre = nombre;
        this.correo = correo;
    }
    enviarCorreo() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ENTREEEEEEEEEEEE");
            var password = "password";
            var contenido = "Buen dia, es un gusto que forme parte de nuestro proceso de seleccion, tu usuario para ingresar a la plataforma es  : " + this.nombre + "005  y tu contreasena es: " + password + "\n Saludos, TOTONET SA.";
            var mailOptions = {
                from: "mia2021p2@gmail.com",
                to: this.correo,
                subject: "Nuevas Credenciales TOTONET SA",
                text: contenido
            };
            yield this.transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Ha ocurrido un error al enviar correo");
                }
                else {
                    console.log("Correo enviado con exito , ", info.response);
                }
            });
            return password;
        });
    }
    EnviarContenido() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ENTREEEEEEEEEEEEEEEEEE");
            var contenido = "Notificacion de ingreso: Nuevo aplicante, se detalla la informacion: \n" +
                "Nombre: " + this.nombre + "\n Apellido: " + this.apellido + "\n Correo: " + this.correo;
            var mailOptions = {
                from: "mia2021p2@gmail.com",
                to: "mia2021p2@gmail.com",
                subject: "Nuevo APlicante",
                text: contenido,
            };
            yield this.transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Ha ocurrido un error");
                }
                else {
                    console.log("Correo de nuevo aplicante enviado :", info.response);
                }
            });
        });
    }
}
exports.Correo = Correo;
