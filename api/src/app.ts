import fastify from "fastify";
import { routes } from "./routes";
import { QueueRabbitProvider } from "./providers/QueueRabbitProvider";

const app = fastify({ logger: true });
app.register(require("@fastify/jwt"), {
  secret: process.env.SECRET_KEY,
});

app.register(require("./utils/validate"));
app.register(require("./utils/validateInputs"));

const port = 8081;

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

QueueRabbitProvider.getInstance().initialize(config);

app.register(routes);

app.listen({ port }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
