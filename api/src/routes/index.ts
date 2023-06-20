import fastify from "fastify";
import { createUserUseCase } from "../useCases/createUserUseCase";
import { opts } from "../entities/createUser/createUserOpts";

async function routes(fastify, options) {
  fastify.post("/user", opts, async (request, reply) => {
    const { username, email, name, password, birthdate } = request.body;

    const execute = await createUserUseCase.execute({
      username,
      name,
      email,
      password,
      birthdate,
    });

    return reply.send(execute);
  });
}

export { routes };
