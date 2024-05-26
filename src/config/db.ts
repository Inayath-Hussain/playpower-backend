import { PrismaClient } from "@prisma/client";


export const prisma = new PrismaClient({
    log: ["query"]
});



export const connectToDb = () =>
    new Promise(resolve => {
        prisma.$connect()
            .then(() => {
                console.log("Connected to DB");
                resolve(true)
            })
            .catch(ex => {
                console.log(ex)
                process.exit(1);
            })
    })