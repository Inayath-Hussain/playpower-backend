import { Role } from "@prisma/client";


interface Valid {
    valid: true
}

interface InValid {
    valid: false
    errorMessage: string
}


export const usernameValidator = (value: any): Valid | InValid => {
    switch (true) {
        case (!value):
            return { valid: false, errorMessage: "username is required" }

        case (typeof value === "number"):
            return { valid: false, errorMessage: "username should contain letters" }

        case (typeof value !== "string"):
            return { valid: false, errorMessage: "username should be of type string" }

        default:
            return { valid: true }
    }
}




export const passwordValidator = (value: any): Valid | InValid => {
    switch (true) {
        // if value is falsy
        case (!value):
            return { valid: false, errorMessage: "password is required" }


        // if value is anything other than number or string
        case (typeof value !== "number" && typeof value !== "string"):
            return { valid: false, errorMessage: "password should numbers or letters" }


        default:
            return { valid: true }
    }
}

