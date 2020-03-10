/**
 * Router for Firebase Messaging Register
 */
import { Router } from "express";
import DB from "../data/db/db";

const router = Router();

const notificationRouter = (db : DB) => {
    
    router.post("/register", async (req, res) => {
        const { address, token, birthYear } : NotificationRegister = req.body;
        if(!address || !token || !birthYear) return res.sendStatus(400);
        const c = await db.getCollection("noti");
        await c.insertOne({ address, token, birthYear });
        res.sendStatus(200);
    });

    router.patch("/register", async (req, res) => {
        const { address, token, birthYear } : NotificationRegister = req.body;
        if(!token) return res.sendStatus(400);
        const c = await db.getCollection("noti");
        const update : any = {};
        if(!address) update["address"] = address;
        if(!birthYear) update["birthYear"] = birthYear;
        try{
            await c.updateOne({ token }, { $set : update });
            res.sendStatus(200);
        }catch(e){
            res.sendStatus(500);
        }
    });

    router.delete("/register", async (req, res) => {
        const { token } = req.body;
        if(!token) return res.sendStatus(400);
        const c = db.getCollection("noti");
        try{
            await c.remove({ token });
            res.sendStatus(200);
        } catch (e){
            res.sendStatus(500);
        }
    });

    return router;
}

export default notificationRouter;