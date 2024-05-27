import { prisma } from "../config/db";

class SubmitionService {
    async getSubmition(assignmentId: number, studentId: number) {
        return await prisma.submission.findFirst({ where: { assignmentId, studentId } })
    }


    async submitAssignment(assignmentId: number, studentId: number, content: string) {
        return await prisma.submission.create({ data: { content, assignmentId, studentId } })
    }

}


export const submitionService = new SubmitionService();