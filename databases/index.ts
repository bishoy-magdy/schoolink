import SQLDataBase from './sql';

class DataBases {
    static sqlite: SQLDataBase;

    static async initDB() {
        DataBases.sqlite = await new SQLDataBase().openDB();
    }
}

export default DataBases;
