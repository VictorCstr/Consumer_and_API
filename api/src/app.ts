import fastify from "fastify";
import { QueueRabbitProvider } from "./providers/QueueRabbitProvider";

const app = fastify({ logger: true });

// await QueueRabbitProvider.getInstance().initialize(config);
