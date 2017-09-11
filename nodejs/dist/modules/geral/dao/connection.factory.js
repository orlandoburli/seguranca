"use strict";
// const pg = require('pg');
const pg = require("pg");
const Rxjs_1 = require("Rxjs");
class ConnectionFactory {
    // private connectionString: string = "postgres://localhost:5432/dbseguranca";
    constructor() {
        // 
    }
    get() {
        let ob = Rxjs_1.Observable.create(observer => {
            let config = {
                user: "postgres",
                password: "carol1408",
                database: "dbseguranca",
                port: 5432,
                host: "localhost"
            };
            pg.connect(config, ((err, client, done) => {
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
    static get() {
        return new ConnectionFactory();
    }
}
exports.ConnectionFactory = ConnectionFactory;
