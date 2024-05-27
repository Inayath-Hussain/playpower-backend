interface Valid {
    valid: true
}

interface InValid {
    valid: false
    errorMessage: string
}


export const titleOrDescriptionValidator = (value: any, fieldName: "title" | "description"): Valid | InValid => {
    switch (true) {
        case (!value):
            return { valid: false, errorMessage: `${fieldName} is required` }

        case (typeof value !== "string"):
            return { valid: false, errorMessage: `${fieldName} should be string` }

        default:
            return { valid: true }
    }
}



export const dueDateValidor = (value: any): Valid | InValid => {
    console.log(27, new Date(value))
    switch (true) {
        case (typeof value !== "number" && typeof value !== "string"):
            return { valid: false, errorMessage: "dueDate is invalid" }


        case (isNaN(new Date(value).valueOf())):
            return { valid: false, errorMessage: "dueDate is invalid" }

        default:
            return { valid: true }
    }
}