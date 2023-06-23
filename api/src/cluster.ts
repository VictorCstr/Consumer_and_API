import cluster from "cluster";
import os from "os";
import app from "./app";
import fs from "fs";

const port = 8081;

if (cluster.isPrimary) {
  console.log(`Running on master ${process.pid} and now creating workers`);

  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  }
} else {
  app.listen({ port }, function (err, address) {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  });
}
