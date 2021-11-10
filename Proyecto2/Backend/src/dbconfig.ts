import oracledb from "oracledb";
import conexion from "./conexion";

class Connection {
  async connect(consulta: string) {
    let conn;

    try {
      conn = await oracledb.getConnection(conexion.database);
      let result = await conn.execute(
        consulta,
        [], 
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
          autoCommit: true,
        }
      );

      return { status: 200, data: result.rows };
    } catch (error) {
      console.log(error);
      return { status: 400, message: error };
    }
  }
}

export const connection = new Connection();