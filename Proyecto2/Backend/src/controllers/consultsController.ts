import { json, Request, Response } from "express";
import { connection } from "../dbconfig";
import convert from "xml-js";
import { Entrada } from "../interface/entrada";
import { Correo } from "../Confirmacion/correo";



 class ConsultController {



  public async index(res: Response, req: Request) {
    var consultaTipoUsuario = await connection.connect(
      "select * from rol"
    );
    console.log(consultaTipoUsuario);
    res.json(consultaTipoUsuario);
  }

  public async allUsers(req: Request, res: Response) {
    var consultaAllUsers = await connection.connect("select * from usuario");
    res.json(consultaAllUsers);
  }

  public async allAplyers(req: Request, res: Response) {
    var consultaAplyers = await connection.connect("select * from aplicante");
    res.json(consultaAplyers);
  }

  public async sendMail(req: Request, res: Response) {
    var correo = new Correo (req.body.nombre, req.body.apellido, req.body.correo);
    var contra: string = await correo.enviarCorreo();

    var insert: string =
      "insert into usuario (username, password, fecha_inicio, fecha_baja, estado, id_rol) values ('" +
      req.body.nombre +
      req.body.apellido +
      "', '" +
      contra+
      "',CURRENT_DATE,CURRENT_DATE,'T',2)";
    var consulta = await connection.connect(insert);
    console.log(consulta);
    res.json(consulta);
  }


  public async sendRejMail(req: Request, res: Response) {
    var correo = new Correo (req.body.nombre, req.body.apellido, req.body.correo);
    var contra: string = await correo.enviarCorreo();

    var insert: string =
      "insert into usuario (username, password, fecha_inicio, fecha_baja, estado, id_rol) values ('" +
      req.body.nombre +
      req.body.apellido +
      "', '" +
      contra+
      "',CURRENT_DATE,CURRENT_DATE,'T',2)";
    var consulta = await connection.connect(insert);
    console.log(consulta);
    res.json(consulta);
  }

  public async cargaMasiva(req: Request, res: Response) {
    var xml = req.body.xml;
    var json;
    json = convert.xml2json(xml, { compact: true, spaces: 4 });
    var entrada: Entrada | any = JSON.parse(json);
    console.log(entrada);
    var controller = new ConsultController();
    await controller.meterDatos(entrada, controller);
    res.json(entrada);
  }

  async meterDatos(json: any, controller: ConsultController) {
    if (json.departamentos.departamento[0] != undefined) {
      for (let i = 0; i < json.departamentos.departamento.length; i++) {
        await controller.leerDepartamento(
          json.departamentos.departamento[i],
          controller
        );
      }
    } else {
      await controller.leerDepartamento(
        json.departamentos.departamento,
        controller
      );
    }
  }

  async leerDepartamento(entrada: any, controller: ConsultController) {
    //TODO aqui tengo que pasarle el puesto o puestos
    const nombre = entrada.nombre._text;
    const capital = entrada.capital_total._text;
    const consulta =
      "insert into departamento (nombre_departamento, capital) values ('" +
      nombre +
      "', " +
      capital +
      ")";
      console.log("******DEPTOS*************");
      console.log(consulta);
      console.log("*******************");

    var response = await connection.connect(consulta);
    if (entrada.puestos.puesto[0] != undefined) {
      for (let i = 0; i < entrada.puestos.puesto.length; i++) {
        await controller.leerPuesto(entrada.puestos.puesto[i], controller);
        await controller.conexionDepartamentoPuesto(
          entrada.puestos.puesto[i].nombre._text,
          entrada.nombre._text
        );
      }
    } else {
      await controller.leerPuesto(entrada.puestos.puesto, controller);
      await controller.conexionDepartamentoPuesto(
        entrada.puestos.puesto.nombre._text,
        entrada.nombre._text
      );
    }
    if (entrada.departamentos != undefined) {
      if (entrada.departamentos.departamento[0] != undefined) {
        for (let i = 0; i < entrada.departamentos.departamento.length; i++) {
          await controller.leerDepartamento(
            entrada.departamentos.departamento[i],
            controller
          );
          await controller.conexionDepartamentoPadreHijo(
            entrada.nombre._text,
            entrada.departamentos.departamento[i].nombre._text
          );
        }
      } else if (entrada.departamentos.departamento != undefined) {
        await controller.leerDepartamento(
          entrada.departamentos.departamento,
          controller
        );
        await controller.conexionDepartamentoPadreHijo(
          entrada.nombre._text,
          entrada.departamentos.departamento.nombre._text
        );
      }
    }
    // console.log(response);
  }
  async leerPuesto(entrada: any, controller: ConsultController) {
    const nombre = entrada.nombre._text;
    const salario = entrada.salario._text;
    const consulta =
      "insert into puesto (nombre_puesto, salario) values ( '" +
      nombre +
      "', " +
      salario +
      ")";
    await connection.connect(consulta);
    if (entrada.categorias.categoria[0] != undefined) {
      for (let i = 0; i < entrada.categorias.categoria.length; i++) {
        await controller.leerCategoria(
          entrada.categorias.categoria[i],
          controller
        );
        await controller.conexionPuestoCategoria(
          entrada.nombre._text,
          entrada.categorias.categoria[i].nombre._text
        );
      }
    } else {
      await controller.leerCategoria(entrada.categorias.categoria, controller);
      await controller.conexionPuestoCategoria(
        entrada.nombre._text,
        entrada.categorias.categoria.nombre._text
      );
    }
    if (entrada.requisitos.requisito[0] != undefined) {
      for (let i = 0; i < entrada.requisitos.requisito.length; i++) {
        await controller.leerRequisito(
          entrada.requisitos.requisito[i],
          controller
        );
        await controller.conexionPuestoRequisito(
          entrada.nombre._text,
          entrada.requisitos.requisito[i].nombre._text
        );
      }
    } else {
      await controller.leerRequisito(entrada.requisitos.requisito, controller);
      await controller.conexionPuestoRequisito(
        entrada.nombre._text,
        entrada.requisitos.requisito.nombre._text
      );
    }
  }
  async leerCategoria(entrada: any, controller: ConsultController) {
    const nombre = entrada.nombre._text;
    const consulta =
      "insert into categoria (nombre_categoria) values ('" + nombre + "')";
    await connection.connect(consulta);
  }
  async leerRequisito(entrada: any, controller: ConsultController) {
    const nombre = entrada.nombre._text;
    const tamano = entrada.tamaño._text;
    const obligatorio = entrada.obligatorio._text;
    const consulta =
      "insert into requisito (nombre_requisito, tamanio, obligatorio) values ('" +
      nombre +
      "'," +
      tamano +
      "," +
      obligatorio +
      ")";
    await connection.connect(consulta);
    if (entrada.formatos.formato[0] != undefined) {
      for (let i = 0; i < entrada.formatos.formato.length; i++) {
        await controller.leerFormato(entrada.formatos.formato[i], controller);
        await controller.conexionRequisitoFormato(
          entrada.nombre._text,
          entrada.formatos.formato[i].nombre._text
        );
      }
    } else {
      await controller.leerFormato(entrada.formatos.formato, controller);
      await controller.conexionRequisitoFormato(
        entrada.nombre._text,
        entrada.formatos.formato.nombre._text
      );
    }
  }
  async leerFormato(entrada: any, controller: ConsultController) {
    const nombre = entrada.nombre._text;
    const consulta =
      "insert into formato (nombre_formato) values ('" + nombre + "')";
    await connection.connect(consulta);
  }

  async conexionRequisitoFormato(requisito: string, formato: string) {
    var consulta1 =
      "select * from requisito where nombre_requisito = '" + requisito + "'";
    var consulta2 = "select * from formato where nombre_formato = '" + formato + "'";
    var respuesta1: any = await connection.connect(consulta1);
    var respuesta2: any = await connection.connect(consulta2);
    if (respuesta1.data != undefined && respuesta2.data != undefined) {
      var insert1 =
        "insert into requisitoformato (id_requisito, id_formato) values (" +
        respuesta1.data[0].ID_REQUISITO +
        "," +
        respuesta2.data[0].ID_FORMATO +
        ")";
      await connection.connect(insert1);
      // console.log(insert1);
    }
  }
  async conexionPuestoRequisito(puesto: string, requisito: string) {
    var consulta1 = "select * from puesto where nombre_puesto = '" + puesto + "'";
    var consulta2 =
      "select * from requisito where nombre_requisito = '" + requisito + "'";
    var respuesta1: any = await connection.connect(consulta1);
    var respuesta2: any = await connection.connect(consulta2);
    console.log(respuesta1.data[0].ID_PUESTO);
    console.log(respuesta2.data[0].ID_REQUISITO);
    if (respuesta1.data != undefined && respuesta2.data != undefined) {
      var insert1 =
        "insert into puestorequisito (id_puesto, id_requisito) values ( " +
        respuesta1.data[0].ID_PUESTO +
        "," +
        respuesta2.data[0].ID_REQUISITO +
        ")";
      await connection.connect(insert1);
      // console.log(insert1);
    }
  }
  async conexionPuestoCategoria(puesto: string, categoria: string) {
    console.log(puesto);
    console.log(categoria);
    var consulta1 = "select * from puesto where nombre_puesto = '" + puesto + "'";
    var consulta2 =
      "select * from categoria where nombre_cateogira = '" + categoria + "'";
    var respuesta1: any = await connection.connect(consulta1);
    var respuesta2: any = await connection.connect(consulta2);
    if (respuesta1.data != undefined && respuesta2.data != undefined) {
      var insert1 =
        "insert into puestocategoria  (id_puesto, id_categoria)  values (" +
        respuesta1.data[0].ID_PUESTO +
        "," +
        respuesta2.data[0].ID_CATEGORIA +
        ")";
      await connection.connect(insert1);
      // console.log(insert1);
    }
  }
  async conexionDepartamentoPuesto(puesto: string, departamento: string) {
    var consulta1 = "select * from puesto where nombre_puesto = '" + puesto + "'";
    var consulta2 =
      "select * from departamento where nombre_departamento = '" + departamento + "'";
    var respuesta1: any = await connection.connect(consulta1);

    console.log("***************************");
    console.log(respuesta1);
    console.log("***************************");

    var respuesta2: any = await connection.connect(consulta2);

    console.log("***************************");
    console.log(consulta2);
    console.log("***************************");

    if (respuesta1.data != undefined && respuesta2.data != undefined) {
      var insert1 =
        "insert into DepartamentoPuesto (id_departamento, id_puesto) values (" +
        respuesta2.data[0].ID_DEPARTAMENTO +
        "," +
        respuesta1.data[0].ID_PUESTO +
        ")";

      await connection.connect(insert1);
    }
  }

  async conexionDepartamentoPadreHijo(padre: string, hijo: string) {
    var consulta1 = "select * from departamento where nombre_departamento = '" + padre + "'";
    var consulta2 = "select * from departamento where nombre_departamento = '" + hijo + "'";
    var respuesta1: any = await connection.connect(consulta1);
    var respuesta2: any = await connection.connect(consulta2);
    if (respuesta1.data != undefined && respuesta2.data != undefined) {
      var insert1 =
        "insert into departamentop (id_departamento, id_departamento) values (" +
        respuesta1.data[0].ID_DEPARTAMENTO +
        "," +
        respuesta2.data[0].ID_DEPARTAMENTO +
        ")";
      await connection.connect(insert1);
    }
  }

  async agregarCoordinador(req: Request, res: Response) {
    const usuario = req.body.user;
    const pass = req.body.password;
    const dep = req.body.dep;
    const consultaDepartamento =
      "select * from departamento where nombre_departamento = '" + dep + "'";
    const resDep: any = await connection.connect(consultaDepartamento);
    if (resDep.data[0].COORDINADOR != null) {
      console.log("existe coordinador");
      res.json({ text: "error ya existe un coordinador" });
      return;
    }
    console.log(resDep.data.length);
    if (resDep.data.length == 0) {
      console.log("no hay departamento");
      res.json({ text: "error el departamento no existe" });
      return;
    }
    const consulta =
      "insert into usuario (username, password, fecha_inicio, fecha_baja,estado, id_rol) values ('" +
      usuario +
      "', '" +
      pass +
      "',CURRENT_DATE,CURRENT_DATE,'T',3)";
    const getIdUser =
      "select id_usuario from usuario where username = '" +
      usuario +
      "' and password = '" +
      pass +
      "'";
    console.log(consulta);
    await connection.connect(consulta);
    var IdUser: any = await connection.connect(getIdUser);
    console.log("hasta aqui");
    const asignarUsuario =
      "update departamento set coordinador = " +
      IdUser.data[0].ID_USUARIO +
      " where id_departamento = " +
      resDep.data[0].ID_DEPARTAMENTO;
    var update = await connection.connect(asignarUsuario);
    console.log(update);
    res.json({ text: "todo bien" });
  }

  async modificarCoordinador(req: Request, res: Response) {}
  async eliminarCoordinador(req: Request, res: Response) {}

  async agregarRevisor(req: Request, res: Response) {
    const usuario = req.body.user;
    const pass = req.body.password;
    const dep = req.body.dep;
    const consultaDepartamento =
      "select * from departamento where nombre_departamento = '" + dep + "'";
    const resDep: any = await connection.connect(consultaDepartamento);
    console.log(resDep.data.length);
    if (resDep.data.length == 0) {
      console.log("no hay departamento");
      res.json({ text: "error el departamento no existe" });
      return;
    }
    const consulta =
      "insert into usuario (username, password, fecha_inicio, fecha_baja,estado, id_rol) values ('" +
      usuario +
      "', '" +
      pass +
      "',CURRENT_DATE,CURRENT_DATE,'T',5)";
    const getIdUser =
      "select id_usuario from usuario where username = '" +
      usuario +
      "' and password = '" +
      pass +
      "'";
    await connection.connect(consulta);
    var IdUser: any = await connection.connect(getIdUser);
    var asignarUsuario =
      "insert into departamentousuario (id_usuario, id_departamento, revisor) values (" +
      IdUser.data[0].ID_USUARIO +
      "," +
      resDep.data[0].ID_DEPARTAMENTO +
      ",'T')";
    await connection.connect(asignarUsuario);
    res.json({ text: "todo bien" });
  }
















  async modificarRevisor() {}
  async eliminarRevisor() {}



  //-----------------------------------------MAIL---------------

  // transport: any = nodemailer.createTransport({
  //  service: 'gmail',
  //  port: 2525,
  //  secure: false,
  //  auth: {
   //     type: "login",
   //        user: 'mia2021p2@gmail.com',
   //     pass: 'Elite4yuwc'  //-activar el acceso de aplicaciones no seguras a su cuenta de google
   // }
//})


}

export const consultController = new ConsultController();