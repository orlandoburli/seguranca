import { BlocoDao } from './bloco.dao';
import { Router, Request, Response, NextFunction } from 'express';

export class BlocoRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    // Métodos

    getById(req: Request, res: Response, next: NextFunction) {
        let query = parseInt(req.params.id);
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        let dao: BlocoDao = new BlocoDao();

        dao.getAll().subscribe(lista => {
            if (!lista) {
                res.send("Erro")
            } else {
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

const blocRoutes = new BlocoRouter();
blocRoutes.init();

export default blocRoutes.router;