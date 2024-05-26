import { app } from "./app";
import { connectToDb } from "./config/db";
import { env } from "./config/env";



function main() {
    // run express app only if db is connectable
    connectToDb().then(() => {
        app.listen(env.PORT, () => console.log("server listening on PORT", env.PORT))
    })
}



main();