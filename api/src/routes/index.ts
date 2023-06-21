import { createUserUseCase } from "../useCases/createUserUseCase";
import { createUserOpts } from "../entities/createUser/createUserOpts";
import { cancelUserUseCase } from "../useCases/cancelUserUseCase";
import { cancelUserOpts } from "../entities/cancelUser/cancelUserOpts";
import { loginUserOpts } from "../entities/loginUser/loginUserOpts";
import { loginUseCase } from "../useCases/loginUseCase";

async function routes(fastify, options) {
  fastify.post(
    "/user",
    {
      preValidation: [fastify.validateCreateInput],
      schema: createUserOpts,
    },
    async (request, reply) => {
      const { username, email, name, password, birthdate } = request.body;

      const execute = await createUserUseCase.execute({
        username,
        name,
        email,
        password,
        birthdate,
      });

      return reply.send(execute);
    }
  );

  fastify.post(
    "/user/cancel",
    {
      onRequest: [fastify.authenticateUser],
      schema: cancelUserOpts,
    },
    async (request, reply) => {
      const { username, password } = request.body;

      const execute = await cancelUserUseCase.execute({
        username,
        password,
      });

      return reply.send(execute);
    }
  );

  fastify.post("/user/login", loginUserOpts, async (request, reply) => {
    const { username, password } = request.body;

    const execute = await loginUseCase.execute({
      username,
      password,
    });

    const token = await fastify.jwt.sign({
      id: execute.id,
      username: execute.username,
    });

    return reply.send(token);
  });
}

export { routes };
