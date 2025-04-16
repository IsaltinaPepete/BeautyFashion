import { User } from "@prisma/client";
import { prisma } from "../db";
import bcrypt from "bcrypt";

interface saveUserProps {
    name: string,
    email: string,
    phone?: string,
    provinceId?: string,
    bairro?: string,
    password: string,

};
interface UpdateUserProps {
    name?: string,
    email?: string,
    phone?: string,
    provinceId?: string,
    bairro?: string,
    password?: string,
    avatarId?:string
}



export class UserRepository {
    client = prisma.user;

    async create(data: saveUserProps) {
        const { name, email, password, phone, provinceId, bairro } = data

        const savedUser = await this.client.create({

            data: {
                name,
                email,
                password,
                phone,
                provinceId,
                bairro
            }

        })

        return this.returnUser(savedUser);

    }

    async changePassword(userId: string, hash: string) {
        const updatedUser = await this.client.update({
            where: {
                id: userId,
            },
            data: {
                password: hash,
            }
        });

        return updatedUser;
    }

    async update(user: User, data: UpdateUserProps) {
        console.log(user)


        const updatedUser = await this.client.update({
            where: {
                id: user.id,
            },
            data: {
                name: data.name ? data.name : user.name,
                email: data.email ? data.email : user.email,
                phone: data.phone ? data.phone : user.phone,
                provinceId: data.provinceId ? data.provinceId : user.provinceId,
                bairro: data.bairro ? data.bairro : user.bairro,
                avatarId: data.avatarId ? data.avatarId : user.avatarId
            }
        });

        return updatedUser;
    }

    async get(id: string) {

        const user = await this.client.findUnique({
            where: { id: id }
        });
        if (!user) {
            console.log(`No user found with ID: ${id}`);
            return null;
        }

        return user

    }

    async findByEmail(email: string) {

        const user = await this.client.findUnique({
            where: { email: email }
        });

        return user
    }

    async returnUser(user: User) {
        const { password, ...rest } = user;

        return rest;
    }

    async getAll() {
        return await this.client.findMany();
    }

    async delete(user: User) {
        await this.client.delete({
            where: { id: user.id }
        })

    }
}