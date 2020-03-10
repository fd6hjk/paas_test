import express from "express";
import notificationRouter from "./routers/notification";
import DB from "./data/db/db";

const app = express();

const main = async () => {
    const dbName = process.env.DB_NAME || "test";
    const dbURL = process.env.DB_URL || "mongodb://localhost:27017";

    const db = new DB({ name: dbName, url: dbURL });
    await db.init();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api/notification", notificationRouter(db));
    app.get("/", (req, res) => {
        res.send("welcome");
    });
    app.listen(80);
}

main();