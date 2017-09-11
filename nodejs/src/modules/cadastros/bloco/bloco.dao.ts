import { Bloco } from './bloco.model';
import { Observable } from 'Rxjs';
import { ConnectionFactory } from './../../geral/dao/connection.factory';

export class BlocoDao {

    getAll(): Observable<Bloco[]> {
        let ob = Observable.create(observer => {
            let cf = ConnectionFactory.get();

            cf.get().subscribe(client => {

                if (client) {
                    client.query('SELECT * FROM bloco')
                        .then(value => {
                            let lista : Bloco[] = [value.rowCount];
                            for (let i = 0; i < value.rowCount; i++) {
                                console.log(value.rows[i]);

                                lista[i] = {
                                    id : value.rows[i].id,
                                    nome : value.rows[i].nome,
                                    ativo : value.rows[i].ativo
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
                } else {
                    observer.complete();
                }
            });
        });
        return ob;
    }
}