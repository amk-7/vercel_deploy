import Repository from "./repository.js";

export default class StudentRepository extends Repository  {
    constructor() {
        super()
    }

    async save(student){
        const db = await Database.getDatabaseInstance();
        const { firstname, lastname, sexe, birth_day } = student_data;
        
        const insert_sql = `
        INSERT INTO students(firstname, lastname, sexe, birth_day)
        VALUES (:firstname, :lastname, :sexe, :birth_day);
        `;

        const { lastID } = await db.connection.run(insert_sql, {
            ':firstname': firstname,
            ':lastname': lastname,
            ':sexe': sexe,
            ':birth_day': birth_day,
        });

        return lastID;
    }
}