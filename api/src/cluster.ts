import cluster from "cluster";
import os from "os";
import app from "./app";

const port = 8081;

if (cluster.isPrimary) {
  console.log(`Running on master ${process.pid}`);

  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  }
} else {
  console.log(`Worker ${process.pid} initialized`);
  app.get("/cluster", (req, reply) => {
    let worker = cluster.worker.id;
    reply.send(worker);
  });

  app.listen({ port }, function (err, address) {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  });
}
