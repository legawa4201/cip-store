import sqlite3 from "sqlite3";
import { open } from "sqlite";

class Connection {
    public static connection: any;

    public static async connect() {
        try {
            if(this.connection) return this.connection
            this.connection = await open<sqlite3.Database, sqlite3.Statement>({
                filename: `database/test.db`,
                driver: sqlite3.Database
            })
            return this.connection
        } catch (error) {
            throw error
        }
    }
}

export default Connection;