"use strict";
const bloco_dao_1 = require("./bloco.dao");
const express_1 = require("express");
class BlocoRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    // Métodos
    getById(req, res, next) {
        let query = parseInt(req.params.id);
    }
    getAll(req, res, next) {
        let dao = new bloco_dao_1.BlocoDao();
        dao.getAll().subscribe(lista => {
            if (!lista) {
                res.send("Erro");
            }
            else {
                res.send(lista);
            }
            console.log(lista);
        });
    }
    init() {
        this.router.get('', this.getAll);
        this.router.get('/:id', this.getById);
    }
}
exports.BlocoRouter = BlocoRouter;
const blocRoutes = new BlocoRouter();
blocRoutes.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = blocRoutes.router;
