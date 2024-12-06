import { FastifyInstance } from "fastify";
import { UserController } from "../Controllers/UserController";

const userController = new UserController();

export async function userRoutes(fastify: FastifyInstance) {

    fastify.post('/create', (request, reply) => userController.create(request, reply));
    fastify.get('/', (request, reply) => userController.show(request, reply));
    fastify.get('/getAll', (request, reply) => userController.getAll(request, reply));
    fastify.put('/', (request, reply) => userController.update(request, reply));

}

