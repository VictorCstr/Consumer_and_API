import { Channel, Connection, connect } from "amqplib";

type Action = (msg: any, channel: Channel) => Promise<void>;

export class QueueRabbitProvider {
  private _conn: Connection;
  private _channel: Channel;

  async initialize(config): Promise<any> {
    const { QUEUE_URL } = process.env;

    this._conn = await connect(QUEUE_URL);
    this._channel = await this._conn.createChannel();

    this._conn.on("error", (err) => {
      if (err.message !== "Connection closing") {
        console.error("[AMQP] conn error", err.message);
      }
    });

    this._conn.on("close", function () {
      console.error("[AMQP] reconnecting");
      return setTimeout(() => this.initialize(config), 1000);
    });

    console.log("[AMQP] connected");
  }

  async listenQueue({ queue, action }: { queue: string; action: Action }) {
    console.log(this._channel);
    this._channel.consume(queue, (msg) => {
      try {
        action(msg, this._channel);
        this._channel.ack(msg);
      } catch (e) {
        console.error(e);
      }
    });
  }

  async publish({
    exchange,
    routingKey,
    content,
    options,
  }: {
    exchange: string;
    routingKey?: string;
    content: any;
    options?: any;
  }): Promise<void> {
    await this._channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(content)),
      { persistent: true, ...options }
    );
  }
}
