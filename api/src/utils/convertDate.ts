import { ValidationError } from "../errors";

const fp = require("fastify-plugin");

export default fp(function (fastify, opts, done) {
  fastify.decorate("convertDate", async (request, reply) => {
    let birthdateToConvert = request.body.birthdate.toString().split("-");

    let birthdate = new Date(
      `${birthdateToConvert[2]}-${birthdateToConvert[1]}-${birthdateToConvert[0]}`
    );

    return (request.body.birthdate = birthdate);
  });
  done();
});
