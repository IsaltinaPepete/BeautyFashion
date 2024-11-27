import Fastify from 'fastify'
import { routes } from './routes'

const fastify = Fastify({
    logger: true
})


// // Declare a route
// fastify.get('/', (request, reply) => {
//     reply.send({ hello: 'world' })
// })

fastify.register(routes);

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err;
    console.log("server run");
    // Server is now listening on ${address}
})