import { Channel, Connection, connect } from "amqplib";

type Action = (msg: any, channel: Channel) => Promise<void>;

export class QueueRabbitProvider {
  private _conn: Connection;
  private _channel: Channel;

  private static _instance;
  private _client;

  static getInstance() {
    if (!QueueRabbitProvider._instance) {
      QueueRabbitProvider._instance = new QueueRabbitProvider();
    }

    return QueueRabbitProvider._instance;
  }

  async initialize(config) {
    const { QUEUE_URL } = process.env;

    this._conn = await connect(QUEUE_URL);
    this._channel = await this._conn.createChannel();

    this._conn.on("error", (err) => {
      if (err.message !== "Connection closing") {
        console.error("[AMQP] conn error", err.message);
      }
    });

    this._conn.on("close", function (err) {
      console.error("[AMQP] reconnecting");
      return setTimeout(
        async () => this.getInstance().initialize(config),
        1000
      );
    });

    console.log("AMQP Running");
  }

  async listenQueue({ queue, action }: { queue: string; action: Action }) {
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
