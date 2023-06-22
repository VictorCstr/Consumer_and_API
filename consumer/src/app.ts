import http from "http";
import { QueueRabbitProvider } from "./providers/QueueRabbitProvider";
import { createUserUseCase } from "./useCases/createUserUseCase";
import { MySqlUserRepository } from "./repositories/MySqlUserRepository";
import { updateUserUseCase } from "./useCases/updateUserUseCase";
import { cancelUserUseCase } from "./useCases/cancelUserUseCase";

const host = "localhost";
const port = 9090;

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end("Server running and receiving messages from the api");
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

const config = {
  exchanges: [
    { name: "event-create", type: "direct" },
    { name: "create.ttl", type: "direct" },
    { name: "create.dlx", type: "fanout" },

    { name: "event-cancel", type: "direct" },
    { name: "cancel.ttl", type: "direct" },
    { name: "cancel.dlx", type: "fanout" },
  ],
  queues: [
    { name: "create" },
    { name: "cancel" },
    { name: "cancel-retry-30s", dlx: "cancel.dlx", ttl: 30000 },
    { name: "create-retry-30s", dlx: "create.dlx", ttl: 30000 },
  ],
  bindings: [
    {
      exchange: "event-create",
      target: "create",
    },
    {
      exchange: "event-cancel",
      target: "cancel",
    },
    {
      exchange: "cancel.dlx",
      target: "cancel",
    },
    {
      exchange: "create.dlx",
      target: "create",
    },
    {
      exchange: "cancel.ttl",
      target: "cancel-retry-30s",
      key: "retry-1",
    },
    {
      exchange: "create.ttl",
      target: "create-retry-30s",
      key: "retry-1",
    },
  ],
};

const rabbitprovider = new QueueRabbitProvider();

rabbitprovider
  .initialize(config)
  .then(() =>
    rabbitprovider.listenQueue({
      queue: "create",
      action: async (msg) => {
        const data = msg.content.toString();
        const user = JSON.parse(data);
        try {
          const existUser = await MySqlUserRepository.existUser(user.username);
          if (existUser == true) {
            const result = await updateUserUseCase.execute({
              id: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
              birthdate: new Date(user.birthdate),
              password: user.password,
            });
            console.log("Mensagem consumida com sucesso - Update");
          } else {
            const result = await createUserUseCase.execute({
              id: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
              birthdate: new Date(user.birthdate),
              password: user.password,
            });
            console.log("Mensagem consumida com sucesso - Create");
          }
        } catch (e) {
          let retry = user.retry ?? 0;
          retry += 1;
          const routingKey = `retry-1`;
          while (retry <= 1) {
            await rabbitprovider.publish({
              exchange: "create.ttl",
              routingKey,
              content: { ...user, retry },
            });
          }
          console.error(e);
        }
      },
    })
  )
  .then(() => {
    rabbitprovider.listenQueue({
      queue: "cancel",
      action: async (msg) => {
        const data = msg.content.toString();
        const username = JSON.parse(data);
        try {
          const result = await cancelUserUseCase.execute({
            username,
          });
          console.log("Mensagem consumida com sucesso - Cancel");
        } catch (e) {
          let retry = username.retry ?? 0;
          retry += 1;
          const routingKey = `retry-1`;
          while (retry <= 1) {
            await rabbitprovider.publish({
              exchange: "cancel.ttl",
              routingKey,
              content: { ...username, retry },
            });
          }
          console.error(e);
        }
      },
    });
  });
