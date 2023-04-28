import { ISqlite } from 'sqlite';
import sqlite3 from 'sqlite3';

export default interface AdminDAO {
    getAdmins(): Promise<any>,
    isAdmin(userId: string): Promise<any>,
    addAdmin(userId: string): Promise<ISqlite.RunResult<sqlite3.Statement>>,
    removeAdmin(userId: string): Promise<ISqlite.RunResult<sqlite3.Statement>>
}
