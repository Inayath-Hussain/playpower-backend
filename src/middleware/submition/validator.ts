interface Valid {
    valid: true
}

interface InValid {
    valid: false
    errorMessage: string
}


export const assignmentIdValidator = (value: any): Valid | InValid => {
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