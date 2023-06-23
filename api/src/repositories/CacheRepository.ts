import Redis from "ioredis";
import { ICacheRepository } from "../interfaces/ICacheRepository";

export class CacheRepository implements ICacheRepository {
  private _client;

  constructor() {
    this._client = new Redis(process.env.REDIS_URL);
    this._client.on("error", (err) => console.error("Redis Client Error", err));
  }

  async get(key: string) {
    const getKey = await this._client.get(key).then((result) => {
      return result;
    });
    return getKey;
  }

  async set(key: string, value: string): Promise<Boolean> {
    await this._client.set(key, value);
    await this._client.expire(key, 86400);
    return true;
  }
}
