import cluster from "cluster";
import os from "os";
import http from "http";
import listenQueue from "./app";
import logger from "./utils/logger";

const host = "localhost";
const port = 8082;

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end("Server running and receiving messages from the api");
};

if (cluster.isPrimary) {
  logger.info(`Running on master ${process.pid}`);

  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();

    cluster.on("exit", (worker, code, signal) => {
      logger.info(`Worker ${worker.process.pid} died`);
    });
  }
} else {
  const server = http.createServer(requestListener);
  server.listen(port, host);
  listenQueue();
}
