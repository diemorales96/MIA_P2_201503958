import { Router } from "express";
import { indexController } from "../controllers/indexController";

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/", indexController.index);
    this.router.post("/user", indexController.user);
    this.router.post("/nuevoAplicante", indexController.nuevoAplicante);
    this.router.get("/puestos", indexController.mostrarPuestos);
    this.router.get("/allUsers", indexController.allUsers);
    this.router.post("/buscarUsuario", indexController.buscarUsuario);
    this.router.post("/buscarPuesto", indexController.buscarPuesto); 
    this.router.post("/infoUser", indexController.getUser); 

  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;