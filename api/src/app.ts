import fastify from "fastify";
import { QueueRabbitProvider } from "./providers/QueueRabbitProvider";

const app = fastify({ logger: true });
const port = 8080;

// await QueueRabbitProvider.getInstance().initialize(config);

app.listen({ port }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
