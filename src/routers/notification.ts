/**
 * Router for Firebase Messaging Register
 */
import { Router } from "express";
import DB from "../data/db/db";

const router = Router();

const notificationRouter = (db : DB) => {
    
    router.post("/register", async (req, res) => {
        const { address, token, birthYear } : NotificationRegister = req.body;
        if(!address || !token || birthYear) return res.sendStatus(400);
        const c = await db.getCollection("noti");
        await c.insert({ address, token, birthYear });
        res.sendStatus(200);
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