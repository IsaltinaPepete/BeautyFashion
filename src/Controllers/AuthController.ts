import { FastifyReply, FastifyRequest } from "fastify";
import { authSchema } from "../validations/authSchema";
import { UserRepository } from "../Repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { security } from "../utilts/contants";


const userRepository = new UserRepository();
export class AuthController {

    async index (request: FastifyRequest, reply:FastifyReply) {
        
        const {email, password} = authSchema.parse(request.body);

        try {
            const user = await userRepository.findByEmail(email);

            if (!user) throw new Error("Autenticação falhada");

            const match = await bcrypt.compare(password, user.password);

            if(!match) throw new Error("Autenticação falhada");

            const token = jwt.sign({id: user.id}, 
                security.SECRET_KEY, 
              { expiresIn: security.EXP });

            
            return reply.send({
                message: "OK", 
                data: {user, token}
            })

        } catch (error) {
            return reply.send(error);
        }

       
    }
}