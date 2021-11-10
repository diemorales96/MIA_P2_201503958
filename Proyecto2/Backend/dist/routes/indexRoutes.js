"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", indexController_1.indexController.index);
        this.router.post("/user", indexController_1.indexController.user);
        this.router.post("/nuevoAplicante", indexController_1.indexController.nuevoAplicante);
        this.router.get("/puestos", indexController_1.indexController.mostrarPuestos);
        this.router.get("/allUsers", indexController_1.indexController.allUsers);
        this.router.post("/buscarUsuario", indexController_1.indexController.buscarUsuario);
        this.router.post("/buscarPuesto", indexController_1.indexController.buscarPuesto);
        this.router.post("/infoUser", indexController_1.indexController.getUser);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
