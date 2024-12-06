import { prisma } from "../db";
import bcrypt from 'bcrypt'

interface saveUserProps {
    name?: string,
    email?: string,
    phone?: string,
    provinceId?: string,
    bairro?: string,
    password?: string,

};
interface UpdateUserProps {
    name?: string,
    email?: string,
    phone?: number,
    provinceId?: string,
    bairro?: string,
    password?: string,
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

        return savedUser;

    }

    async getAll(){
        return await this.client.findMany();
    }
}