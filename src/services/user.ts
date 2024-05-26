import type { Role } from "@prisma/client";
import { genSalt, hash } from "bcrypt";

import { prisma } from "../config/db";


class UserService {
    async getUser(username: string) {
        return await prisma.user.findUnique({ where: { username } })
    }


    async createUser(username: string, password: string, role: Role) {
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        return await prisma.user.create({ data: { username, password: hashedPassword, role } })
    }
}



export const userService = new UserService();