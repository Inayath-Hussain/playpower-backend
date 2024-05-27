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






export const idValidator = (value: any): Valid | InValid => {
    switch (true) {
        case (!value):
            return { valid: false, errorMessage: "assignment id is required" }

        case (typeof value !== "number"):
            return { valid: false, errorMessage: "assignment id is invalid" }

        default:
            return { valid: true }
    }
}


export const contentValidator = (value: any): Valid | InValid => {
    switch (true) {
        case (!value):
            return { valid: false, errorMessage: "content is required" }

        case (typeof value !== "string" && typeof value !== "number"):
            return { valid: false, errorMessage: "content is invalid" }

        default:
            return { valid: true }
    }
}



export const gradeValidator = (value: any): Valid | InValid => {
    switch (true) {
        case (!value):
            return { valid: false, errorMessage: "grade is required" }

        case (typeof value !== "string" && typeof value !== "number"):
            return { valid: false, errorMessage: "grade should be a number or string" }

        case (typeof value === "string" && value.length > 5):
            return { valid: false, errorMessage: "Invalid grade" }

        default:
            return { valid: true }
    }
}