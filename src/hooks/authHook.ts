import { FastifyError, FastifyRequest, FastifyReply } from "fastify";
import jwt  from "jsonwebtoken";
import { security } from "../utilts/contants";

export async function authHook (request:FastifyRequest, reply: FastifyReply) {

    try {
        const auth = request.headers.authorization;
        
        if(!auth) throw new Error("Token not found!")
        
        const [_, token] = auth.split(" ");
    
        if(!token) throw new Error("Token not found!")
        
        const {id} = jwt.verify(token, security.SECRET_KEY) as {id:string}

        request.userId = id;
        

        
    } catch (error) {
        console.log(error);
        reply.status(401).send( error );
    }
    
}