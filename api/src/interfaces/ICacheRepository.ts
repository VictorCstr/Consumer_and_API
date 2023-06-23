export interface ICacheRepository {
  get(key: string): Promise<string>;
  set(key: string, value: string): Promise<Boolean>;
}
