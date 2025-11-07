import { json } from "node:stream/consumers";
import StudentService from "../services/studentService.js";
import { HTTP_STATUS_CODE } from "../constants/httpStatus.js";

export default class StudentController {
    studentService;

    constructor(){
        this.studentService = new StudentService();
    }

    async read(req, res) {
        res.writeHead(HTTP_STATUS_CODE.SUCCESS);
        res.end(JSON.stringify(await this.studentService.getAll()));
    }

    async get(req, res){
        const url = new URL(req.url, `http://${req.headers.host}`);   

        const id = Number.parseInt(url.searchParams.get("id"));
        
        const student = await this.studentService.get(id);

        if (student){
            res.writeHead(HTTP_STATUS_CODE.SUCCESS);
            res.end(JSON.stringify(student));
            return;
        } 

        res.writeHead(HTTP_STATUS_CODE.NOT_FOUND);
        res.end(JSON.stringify({
            "message": 'Resource not-found !'
        }));
    }

    async create(req, res){
        const {firstname, lastname, sexe, birth_day} = await json(req);

        const student = {
            'id': null,
            'firstname': firstname !== undefined ? firstname : "" ,
            'lastname': lastname !== undefined ? lastname : "",
            'sexe': sexe !== undefined ? sexe : "M",
            'birth_day': birth_day !== undefined ? birth_day : "",
        };

        const new_student = await this.studentService.create(student);

        res.writeHead(HTTP_STATUS_CODE.CREATED);
        res.end(JSON.stringify(new_student));
    }

    async update(req, res){
        const url = new URL(req.url, `http://${req.headers.host}`);    
        const id = Number.parseInt(url.searchParams.get("id"));
        
        const {firstname, lastname, sexe, brith_day} = await json(req);
        const student = {
            'id': null,
            'firstname': firstname !== undefined ? firstname : "" ,
            'lastname': lastname !== undefined ? lastname : "",
            'sexe': sexe !== undefined ? sexe : "M",
            'brith_day': brith_day !== undefined ? brith_day : "",
        };

        const updated_student = this.studentService.update(id, student);
        if (updated_student){
            res.writeHead(HTTP_STATUS_CODE.SUCCESS);
            res.end(JSON.stringify(updated_student));
            return;
        } 
        res.writeHead(HTTP_STATUS_CODE.NOT_FOUND);
        res.end(JSON.stringify({
            "message": 'Resource not-found !'
        }));
    }

    delete(req, res){
        const url = new URL(req.url, `http://${req.headers.host}`);   

        const id = Number.parseInt(url.searchParams.get("id"));
        
        this.studentService.delete(id);

        res.writeHead(HTTP_STATUS_CODE.NO_CONTENT);
        res.end();
    }
}

