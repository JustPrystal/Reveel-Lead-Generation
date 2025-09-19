// utils/cache.ts
type CacheStore<T> = Map<string, T>;

class Cache<T> {
  private store: CacheStore<T>;

  constructor() {
    this.store = new Map();
  }

  private makeKey(key: string) {
    return key.trim().toLowerCase();
  }

  get(key: string): T | undefined {
    return this.store.get(this.makeKey(key));
  }

  set(key: string, value: T) {
    this.store.set(this.makeKey(key), value);
  }

  has(key: string): boolean {
    return this.store.has(this.makeKey(key));
  }

  clear() {
    this.store.clear();
  }
}

export default Cache;
