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
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const correo_1 = require("../Confirmacion/correo");
const dbconfig_1 = require("../dbconfig");
class IndexController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({ text: "server levantado desde node" });
        });
    }
    user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var username = req.body.username;
            var pass = req.body.password;
            var consulta1 = "select count(password) as cuenta from usuario where username = '" +
                username +
                "' and password = '" +
                pass +
                "'";
            var consulta2 = "select id_rol as tipo from usuario where username = '" +
                username +
                "' and password = '" +
                pass +
                "'";
            var result = yield dbconfig_1.connection.connect(consulta1);
            var tipo = yield dbconfig_1.connection.connect(consulta2);
            if (tipo.data.length == 0) {
                tipo.data = [{ TIPO: 0 }];
            }
            if (result.data[0].CUENTA == 1) {
                res.json({ entrada: true, tipo: tipo.data[0].TIPO });
            }
            else {
                res.json({ entrada: false, tipo: tipo.data[0].TIPO });
            }
        });
    }
    //----------TOKEN DE ACCESO-------------
    nuevoAplicante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cui = req.body.cui;
            var nombre = req.body.nombre;
            var apellido = req.body.apellido;
            var correo = req.body.correo;
            var direccion = req.body.direccion;
            var cv = req.body.cv;
            var telefono = req.body.telefono;
            const insert = "insert into aplicante values (" +
                cui +
                ", '" +
                nombre +
                "', '" +
                apellido +
                "', '" +
                correo +
                "', '" +
                direccion +
                "', '" +
                telefono +
                "', '" +
                cv +
                "', 'N')"; //N es que no esta aceptado aun, A, Aceptado, R rechazado
            console.log(insert);
            var res1 = yield dbconfig_1.connection.connect(insert);
            var correoEnv = new correo_1.Correo(nombre, apellido, correo);
            correoEnv.EnviarContenido();
            console.log(res1);
            res.json({ status: res1.status });
        });
    }
    mostrarPuestos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var consulta = "select Puesto.nombre_puesto as puesto, Departamento.nombre_departamento as departamento, Puesto.salario as salario from DepartamentoPuesto    inner join Departamento on Departamento.id_departamento = DepartamentoPuesto.id_departamento    inner join Puesto on Puesto.id_puesto = DepartamentoPuesto.id_puesto";
            var consultaAplyers = yield dbconfig_1.connection.connect(consulta);
            res.json(consultaAplyers);
        });
    }
    //======================GET USER==================
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cui = req.body.cui;
            var consulta = "Select * from aplicante where cui = " + cui;
            console.log(consulta);
            var usuario = yield dbconfig_1.connection.connect(consulta);
            //res.json(usuario);
            console.log(usuario);
            res.json({ user: usuario });
        });
    }
    //--------------------------------------------------------
    allUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var consulta = "select * from usuario";
            var consultUsers = yield dbconfig_1.connection.connect(consulta);
            console.log(consultUsers);
            res.json(consultUsers);
        });
    }
    buscarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var username = req.body.username;
            var consulta = "select * from usuario where username = '" + username + "'";
            console.log(consulta);
            var consultUsers = yield dbconfig_1.connection.connect(consulta);
            res.json(consultUsers);
        });
    }
    buscarPuesto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var nombre = req.body.nombre;
            var consulta = "select * from Puesto where nombre = '" + nombre + "'";
            console.log(consulta);
            console.log("------");
            var consultUsers = yield dbconfig_1.connection.connect(consulta);
            console.log(consultUsers);
            console.log("------");
            res.json(consultUsers);
        });
    }
}
exports.indexController = new IndexController();
