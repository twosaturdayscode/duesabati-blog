export interface Cache {
  set<Value>(key: string, value: Value, ttl?: number): Promise<void>
  get<Value>(key: string): Promise<Value>
  del(key: string): Promise<void>
  has(key: string): Promise<boolean>
}
