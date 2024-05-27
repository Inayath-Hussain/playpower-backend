import { prisma } from "../config/db";

class SubmitionService {
    async getSubmition(assignmentId: number, studentId: number) {
        return await prisma.submission.findFirst({ where: { assignmentId, studentId } })
    }


    async submitAssignment(assignmentId: number, studentId: number, content: string) {
        return await prisma.submission.create({ data: { content, assignmentId, studentId } })
    }


    async gradeAssignment(assignmentId: number, id: number, grade: string) {
        return await prisma.submission.update({ where: { assignmentId, id }, data: { grade } })
    }
}


export const submitionService = new SubmitionService();