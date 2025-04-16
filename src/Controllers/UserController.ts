import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../Repositories/userRepository";
import { userSchema, userUpdateSchema } from "../validations/userSchema";
import bcrypt from "bcrypt";
import { FileRepository } from "../Repositories/fileRepository";


const userRepository = new UserRepository();
const fileRepository = new FileRepository();
export class UserController {

    async create(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, password, phone, bairro, provinceId } = userSchema.parse(request.body);

        try {
            if (!name) {
                throw new Error("Nome nào pode ser nulo")
            }

            if (!email) {
                throw new Error("Email nào pode ser nulo")
            }
            if (!password) {
                throw new Error("Password nào pode ser nulo")
            }


            const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            const user = await userRepository.create({ name, email, password: hash, phone, bairro, provinceId });
            return reply.send({
                message: "user created",
                user: user,
            });
        } catch (error) {
            console.log(error);
            return reply.send(error)
        }
    }

    async show(request: FastifyRequest, reply: FastifyReply) {
        const userId = request.userId;
        try {

            if (!userId) throw new Error("id nao pode ser nulo")

            const user = await userRepository.get(userId);

            if (!user) throw new Error("Ususario não encontrado")

            return reply.send({
                user
            })

        } catch (error) {
            return reply.send(error)
        }
    }

    async getAll(request: FastifyRequest, reply: FastifyReply) {
        const users = await userRepository.getAll();
        return reply.send(users);
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, oldPassword, newPassword, phone, bairro, provinceId, avatarId } = userUpdateSchema.parse(request.body);
        const userId = request.userId;
        try {

            if (!userId) throw new Error("Id nao pode ser nulo")

            const user = await userRepository.get(userId);

            if (!user) throw new Error("Usuario não encontrado")

            if (newPassword || email) {
                if (!oldPassword) throw new Error("Por favor, Envie o antigo password")
                const match = await bcrypt.compare(oldPassword, user.password);
                if (!match) throw new Error("Autenticação falhada");

            }

            if (newPassword) {
                const hash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
                const updatedUser = await userRepository.changePassword(userId, hash);
            }

            const updatedUser = await userRepository.update(user, { name, email, phone, bairro, provinceId, avatarId });


            return reply.send({
                updatedUser
            })

        } catch (error) {
            return reply.send(error)
        }
    }

    async changePassword(request: FastifyRequest, reply: FastifyReply) {
        const { oldPassword, newPassword } = userUpdateSchema.parse(request.body);
        const userId = request.userId;
        try {

            if (!userId) throw new Error(
                "Autenticação Falhou!"
            )

            const user = await userRepository.get(userId);

            if (!user) throw new Error("Usuario não encontrado")
            if (!newPassword) throw new Error("Por favor, Envie o novo email")
            if (!oldPassword) throw new Error("Por favor, Envie o antigo password")

            const match = await bcrypt.compare(oldPassword, user.password);
            if (!match) throw new Error("Autenticação falhada");

            const hash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
            const updatedUser = await userRepository.changePassword(userId, hash);

            return reply.send({
                updatedUser
            })

        } catch (error) {
            return reply.send(error)
        }
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const userId = request.userId;
        try {

            if (!userId) throw new Error("Autenticação Falhou!")

            const user = await userRepository.get(userId);

            if (!user) throw new Error("Ususario não encontrado")

            await userRepository.delete(user);
            return reply.send({
                message: "Usuario deletado"
            })

        } catch (error) {
            return reply.send(error)
        }
    }

    async avatar(request: FastifyRequest, reply: FastifyReply) {
        
        try {
            const avatar = request.body;
            const userId = request.userId;

            if (!userId) throw new Error("Autenticação Falhou!")

                console.log(userId)
            const user = await userRepository.get(userId);
            console.log(user)
    
            if (!user) throw new Error("Ususario não encontrado")
            
            const savedFile = await fileRepository.create(avatar)
            this.update(request, reply);
        } catch (error) {
            return reply.send(error)
        }
    }
}