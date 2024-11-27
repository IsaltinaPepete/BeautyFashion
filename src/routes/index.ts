import Fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./user";


export async function routes(fastify: FastifyInstance) {

    fastify.get('/', (request, reply) => {
        return reply.send('Hello Fastifiy');
    });

    fastify.register(userRoutes, {
        prefix: "/users"
    })

}