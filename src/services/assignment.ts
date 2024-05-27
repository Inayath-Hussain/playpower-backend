import { prisma } from "../config/db";

class AssignmentService {
    async createAssignment(title: string, description: string, dueDate: string, teacherId: number) {
        return await prisma.assignment.create({ data: { title, description, dueDate: new Date(dueDate), teacherId } })
    }


    async getAssignment(assignmentId: number) {
        return await prisma.assignment.findUnique({ where: { id: assignmentId }, include: { teacher: { select: { username: true } } } })
    }


    async getAllAssignments() {
        return await prisma.assignment.findMany({ include: { teacher: { select: { username: true } } } })
    }


    async deleteAssignment(id: number) {
        return await prisma.assignment.delete({ where: { id } })
    }


    async updateAssignment(id: number, title: string, description: string, dueDate: string) {
        return await prisma.assignment.update({ where: { id }, data: { title, description, dueDate: new Date(dueDate) } })
    }
}


export const assignmentService = new AssignmentService();