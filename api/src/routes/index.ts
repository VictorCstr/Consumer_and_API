import { createUserUseCase } from "../useCases/createUserUseCase";
import { createUserOpts } from "../entities/createUser/createUserOpts";
import { cancelUserUseCase } from "../useCases/cancelUserUseCase";
import { cancelUserOpts } from "../entities/cancelUser/cancelUserOpts";
import { loginUserOpts } from "../entities/loginUser/loginUserOpts";
import { loginUseCase } from "../useCases/loginUseCase";
import logger from "../utils/logger";

async function routes(fastify, options) {
  fastify.post(
    "/user",
    {
      preValidation: [fastify.validateCreateInput, fastify.convertDate],
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

      logger.info("Received request on route POST /USER/");
      logger.info("request: " + request.body);
      logger.info("reply: " + reply);

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

      logger.info("Received request on route POST /USER/CANCEL");
      logger.info("request: " + request.body);
      logger.info("reply: " + reply);

      return reply.send(execute);
    }
  );

  fastify.post("/user/login", loginUserOpts, async (request, reply) => {
    const { username, password } = request.body;

    const execute = await loginUseCase.execute({
      username,
      password,
    });

    const token = await fastify.jwt.sign(
      {
        id: execute.id,
        username: execute.username,
      },
      { expiresIn: "1h" }
    );

    logger.info("Received request on route POST /USER/LOGIN");
    logger.info("request: " + request.body);
    logger.info("reply: " + reply);

    return reply.send(token);
  });
}

export { routes };
