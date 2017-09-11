"use strict";
const Rxjs_1 = require("Rxjs");
const connection_factory_1 = require("./../../geral/dao/connection.factory");
class BlocoDao {
    getAll() {
        let ob = Rxjs_1.Observable.create(observer => {
            let cf = connection_factory_1.ConnectionFactory.get();
            cf.get().subscribe(client => {
                if (client) {
                    client.query('SELECT * FROM bloco')
                        .then(value => {
                        let lista = [value.rowCount];
                        for (let i = 0; i < value.rowCount; i++) {
                            console.log(value.rows[i]);
                            lista[i] = {
                                id: value.rows[i].id,
                                nome: value.rows[i].nome,
                                ativo: value.rows[i].ativo
                            };
                        }
                        client.end();
                        observer.next(lista);
                        observer.complete();
                    }).catch(reason => {
                        console.log(reason);
                        client.end();
                        observer.complete();
                    });
                }
                else {
                    observer.complete();
                }
            });
        });
        return ob;
    }
}
exports.BlocoDao = BlocoDao;
