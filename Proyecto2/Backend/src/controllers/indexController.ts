import { Request, Response } from "express";
import { Correo } from "../Confirmacion/correo";
import { connection } from "../dbconfig";
import {Jwt} from "jsonwebtoken";



interface Result {
  status: number;
  data: Recuperacion[];
}
interface Recuperacion {
  CUENTA: number;
}

class IndexController {
  public async index(req: Request, res: Response) {
    res.json({ text: "server levantado desde node" });
  }
  public async user(req: Request, res: Response) {
    var username: string = req.body.username;
    var pass: string = req.body.password;
    var consulta1: string =
      "select count(password) as cuenta from usuario where username = '" +
      username +
      "' and password = '" +
      pass +
      "'";
    var consulta2: string =
      "select id_rol as tipo from usuario where username = '" +
      username +
      "' and password = '" +
      pass +
      "'";
    var result: any = await connection.connect(consulta1);
    var tipo: any = await connection.connect(consulta2);
    if (tipo.data.length == 0) {
      tipo.data = [{ TIPO: 0 }];
    }
    if (result.data[0].CUENTA == 1) {
      res.json({ entrada: true, tipo: tipo.data[0].TIPO });

    } else {
      res.json({ entrada: false, tipo: tipo.data[0].TIPO });
    }
  }


  //----------TOKEN DE ACCESO-------------
  




  public async nuevoAplicante(req: Request, res: Response) {
    var cui = req.body.cui;
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var correo = req.body.correo;
    var direccion = req.body.direccion;
    var cv = req.body.cv;
    var telefono= req.body.telefono;
    const insert =
      "insert into aplicante values (" +
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
      telefono+
      "', '"+
      cv +
      "', 'N')";      //N es que no esta aceptado aun, A, Aceptado, R rechazado
      console.log(insert);
    var res1 = await connection.connect(insert);
    var correoEnv= new Correo(nombre,apellido,correo);
    correoEnv.EnviarContenido();
    console.log(res1);
    res.json({ status: res1.status });
  }

  public async mostrarPuestos(req: Request, res: Response) {
    var consulta =
      "select Puesto.nombre_puesto as puesto, Departamento.nombre_departamento as departamento, Puesto.salario as salario from DepartamentoPuesto    inner join Departamento on Departamento.id_departamento = DepartamentoPuesto.id_departamento    inner join Puesto on Puesto.id_puesto = DepartamentoPuesto.id_puesto";
    var consultaAplyers = await connection.connect(consulta);
    res.json(consultaAplyers);
  }


//======================GET USER==================
  public async getUser(req: Request, res: Response) {
    var cui=req.body.cui;
    var consulta =
      "Select * from aplicante where cui = "+cui;
    console.log(consulta);  
    var usuario = await connection.connect(consulta);
    //res.json(usuario);
    console.log(usuario);
    res.json({user: usuario})
  }

  //--------------------------------------------------------


  public async allUsers(req: Request, res: Response) {
    var consulta = "select * from usuario";
    var consultUsers = await connection.connect(consulta);
    console.log(consultUsers);
    res.json(consultUsers);
  }

  public async buscarUsuario(req: Request, res: Response) {
    var username: string = req.body.username;
    var consulta = "select * from usuario where username = '"+username+"'";
    console.log(consulta);
    var consultUsers = await connection.connect(consulta);
    res.json(consultUsers);
  }


  public async buscarPuesto(req: Request, res: Response) {
    var nombre: string = req.body.nombre;
    var consulta = "select * from Puesto where nombre = '"+nombre+"'";
    console.log(consulta);
    console.log("------");
    var consultUsers = await connection.connect(consulta);
    console.log(consultUsers);
    console.log("------");

    res.json(consultUsers);
  }

}

export const indexController = new IndexController();