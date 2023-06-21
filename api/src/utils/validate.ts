const fp = require("fastify-plugin");

export default fp(function (fastify, opts, done) {
  fastify.decorate("authenticateUser", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
  done();
});
