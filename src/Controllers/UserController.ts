import { UserRepository, userRepository } from "../Repositories/userRepository";

interface IUser{
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    bairro?: string;
    provinceId?: string; 
}

const userRepository = new UserRepository();
export class UserController {

    async create( request, reply) {
        const {name, email, password, phone, bairro, provinceId} = request.body as IUser;
        
        try{
           
            const user = await userRepository.create({ name, email, password, phone, bairro, provinceId });
            return reply.send({
                message: "user created",
                user: user,
            });
        } catch(error) {
            console.log(error);
            return reply.send(error)
        }
    }



    async getAll(request, reply){
        const users = await userRepository.getAll();

        return reply.send(users)
    }
    
}