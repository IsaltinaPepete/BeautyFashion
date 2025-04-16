import { FastifyInstance } from "fastify";
import { UserController } from "../Controllers/UserController";
import { AuthController } from "../Controllers/AuthController";
import { authHook } from "../hooks/authHook";
import { uploadHook } from "../hooks/uploadHook";


const userController = new UserController();
const authController = new AuthController();

export async function userRoutes(fastify: FastifyInstance) {

    fastify.post('/', (request, reply) => userController.create(request, reply));
    fastify.get('/', { preHandler: authHook }, (request, reply) => userController.show(request, reply));
    fastify.get('/getAll', (request, reply) => userController.getAll(request, reply));
    fastify.put('/', { preHandler: authHook }, (request, reply) => userController.update(request, reply));
    fastify.patch('/', { preHandler: authHook }, (request, reply) => userController.changePassword(request, reply));
    fastify.post('/auth', (request, reply) => authController.index(request, reply));
    fastify.delete('/', { preHandler: authHook }, (request, reply) => userController.delete(request, reply));
    fastify.patch('/avatar', { preHandler: [authHook, uploadHook('avatar')], }, (request, reply) => userController.avatar(request, reply));

}

