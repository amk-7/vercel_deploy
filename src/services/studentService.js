import Database from "../config/database.js";
import StudentRepository from "../repositories/studentRepository.js";

 export default class StudentService {

    studentRepository;

    constructor(){
        this.studentRepository = new StudentRepository();
    }

    async getAll(){
        const db = await Database.getDatabaseInstance();
        return await db.connection.all('SELECT * FROM students;');
    }

    async get(id){    
        const db = await Database.getDatabaseInstance();
        return await db.connection.get(
            "SELECT * FROM students WHERE id=:student_id;", 
            {
                ':student_id': id
            }
        );   
    }

    async create(student_data){
        const id = await this.studentRepository.save(student_data);
        return this.get(id);
    }

    async update(id, student_data){
        const student = this.get(id);
                
        if (student !== undefined){
            this.studentRepository.update(id, student_data);
        }

    }

    async delete(id) {
        const student = this.get(id);
        const insert_sql = `
                DELETE * FROM students
                WHERE id = :id;
            `;

        const { lastID } = await db.connection.run(insert_sql, {
            ':id': id,
            ':firstname': firstname,
            ':lastname': lastname,
            ':sexe': sexe,
            ':birth_day': birth_day,
        });
    }
}

