import { MongoClient, Db } from "mongodb";

interface Constructor {
    name : string,
    url : string,
}

class DB {

    constructor({ name, url } : Constructor){
        this.name = name;
        this.url = url;
    }

    name : string;
    url : string;
    db? : Db;

    async init() {
        const client = await MongoClient.connect(this.url);

        this.db = client.db(this.name);
    }

    getCollection(name : string) {
        return this.db!.collection(name);
    }

}

export default DB;