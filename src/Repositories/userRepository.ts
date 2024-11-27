import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class userRepository {

    async create(data) {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                provinceId: data.provinceId,
                bairro: data.bairro
            }
        })

        return user;
    }
}