import Fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./user";
import {orderRoutes} from "./order";


export async function routes(fastify: FastifyInstance) {


    fastify.register(userRoutes, {
        prefix: "/users"
    })

}