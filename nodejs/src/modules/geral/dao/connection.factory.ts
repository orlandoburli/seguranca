// const pg = require('pg');
import * as pg from 'pg';
import { Observable } from 'Rxjs';

export class ConnectionFactory {
    // private connectionString: string = "postgres://localhost:5432/dbseguranca";

    private constructor() {
        // 
    }

    get(): Observable<pg.Client> {
        let ob = Observable.create(observer => {
            let config: pg.ClientConfig = {
                user: "postgres",
                password: "carol1408",
                database: "dbseguranca",
                port: 5432,
                host: "localhost"
            };

            pg.connect(config, ((err: Error, client: pg.Client, done: (err?: any) => void) => {
                if (err) {
                    console.log(err);
                }
                
                if (client) {
                    observer.next(client);
                }
                
                observer.complete();
            }));
        });

        return ob;
    }

    static get(): ConnectionFactory {
        return new ConnectionFactory();
    }

}