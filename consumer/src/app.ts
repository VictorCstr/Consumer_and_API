import http from "http";
import { QueueRabbitProvider } from "./providers/QueueRabbitProvider";
import { createUserUseCase } from "./useCases/createUserUseCase";
import { MySqlUserRepository } from "./repositories/MySqlUserRepository";
import { updateUserUseCase } from "./useCases/updateUserUseCase";
import { cancelUserUseCase } from "./useCases/cancelUserUseCase";
import { ApiError } from "./errors";

const config = {
  exchanges: [
    { name: "event-create", type: "direct" },
    { name: "create-ttl", type: "direct" },
    { name: "create-dlx", type: "direct" },

    { name: "event-cancel", type: "direct" },
    { name: "cancel-ttl", type: "direct" },
    { name: "cancel-dlx", type: "direct" },
  ],
  queues: [
    { name: "create" },
    { name: "cancel" },
    { name: "create.dlx" },
    { name: "cancel.dlx" },
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
      exchange: "cancel-dlx",
      target: "cancel.dlx",
    },
    {
      exchange: "create-dlx",
      target: "create.dlx",
    },
    {
      exchange: "cancel-ttl",
      target: "cancel-retry-30s",
      key: "retry-1",
    },
    {
      exchange: "create-ttl",
      target: "create-retry-30s",
      key: "retry-1",
    },
  ],
};

async function listen() {
  await QueueRabbitProvider.getInstance().initialize(config);

  await QueueRabbitProvider.getInstance().listenQueue({
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
        if (e.msg == "Already Cancelled") {
          await QueueRabbitProvider.getInstance().publish({
            exchange: "cancel-dlx",
            content: {
              username: username,
              action: "Cancel User - Already Canceled",
            },
          });
          console.log(
            "Cancelamento movido para fila morta, usuário já cancelado"
          );
        } else {
          await QueueRabbitProvider.getInstance().publish({
            exchange: "cancel.ttl",
            routingKey: "retry-1",
            content: { ...username, retry: "retry" },
          });
        }
      }
    },
  });
  await QueueRabbitProvider.getInstance().listenQueue({
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
        await QueueRabbitProvider.getInstance().publish({
          exchange: "create.ttl",
          routingKey: "retry-1",
          content: { ...user, retry: "retry" },
        });
      }
    },
  });
}

listen();
