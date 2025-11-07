import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import fs from 'fs/promises';
import path from 'path';

export default class Database {

    connection;

    static instance;
    static db_path = "/home/malik-kondi/ifnti/2025-2026/cours_api/api_rest/gestion_note/src/db.sqlite";

    constructor(){}

    static async getDatabaseInstance(){
        if (Database.instance === undefined){
            Database.instance = new Database();
            await Database.instance.openDb(Database.db_path);
        }
        return Database.instance;
    }

    async openDb (db_path) {
        this.connection = await open({
            filename: db_path,
            driver: sqlite3.Database
        });

        // await this.initDb();
    }

    async initDb(){
        const base_dir = path.dirname((new URL(import.meta.url)).pathname);

        // Créer les tables ddl.sql
        console.log('Création des tables');
        const ddl_sql = await fs.readFile(path.join(base_dir, 'ddl.sql'), {
            encoding: 'utf-8'
        });
        await this.connection.exec(ddl_sql);

        // Insérer des n-uplet dml.sql
        console.log('Insertion des données');
        const dml_sql = await fs.readFile(path.join(base_dir, 'dml.sql'), {
            encoding: 'utf-8'
        });
        await this.connection.exec(dml_sql);
    }
}


