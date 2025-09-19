type CacheStore<T> = Map<string, { value: T; expiry: number }>;

class Cache<T> {
  private store: CacheStore<T>;
  private ttl: number;
  constructor(ttl: number = 2 * 60 * 1000) {
    this.store = new Map();
    this.ttl = ttl;
  }
  private makeKey(key: string) {
    return key.trim().toLowerCase();
  }
  get(key: string): T | undefined {
    const entry = this.store.get(this.makeKey(key));
    if (!entry) return undefined;
    if (Date.now() > entry.expiry) {
      this.store.delete(this.makeKey(key));
      return undefined;
    }
    return entry.value;
  }
  set(key: string, value: T) {
    this.store.set(this.makeKey(key), {
      value,
      expiry: Date.now() + this.ttl,
    });
  }
  has(key: string): boolean {
    return this.get(key) !== undefined;
  }
  clear() {
    this.store.clear();
  }
}

export default Cache;
