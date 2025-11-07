
export default class Repository {
    constructor() {
        if (new.target == Repository){
            throw new Error("This classe is abstract...");
        }        
    }
    save(obj) { throw new Error("This methode isn't implemented") };
    update(id, obj) { throw new Error("This methode isn't implemented") };
    delete(id) { throw new Error("This methode isn't implemented") };
    find(id) { throw new Error("This methode isn't implemented") };
    findAll() { throw new Error("This methode isn't implemented") };
}
