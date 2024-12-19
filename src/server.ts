import Fastify from 'fastify'
import { routes } from './routes'

const fastify = Fastify({
    logger: true
})



fastify.register(routes, {prefix: "api/v1"});

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err;
    console.log("server run");
    // Server is now listening on ${address}
})