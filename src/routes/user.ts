import { FastifyInstance } from "fastify";
import { UserController } from "../Controllers/UserController";

const usersController = new UserController();

export async function userRoutes(fastify: FastifyInstance) {

    fastify.post('/', (request, reply) => usersController.create(request, reply));
    fastify.get('/', (request, reply) => usersController.show(request, reply));
    fastify.get('/all', (request, reply) => usersController.getAll(request, reply));
    fastify.put('/', (request, reply) => usersController.update(request, reply));

}

