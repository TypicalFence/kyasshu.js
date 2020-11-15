import type { CacheBackend } from "./cacheBackend";

export class Cache {
    private backend: CacheBackend;

    public constructor(backend: CacheBackend) {
        this.backend = backend;
    }

    public async fetch(key: string): Promise<string|null> {
        const value = await this.backend.fetch(key);

        if (value == null) {
            return null;
        }

        return JSON.parse(value);
    }

    public contains(key: string): Promise<boolean> {
        return this.backend.contains(key);
    }

    public save(key: string, value: any, ttl:number|null = null): Promise<boolean> {
        const jsonValue = JSON.stringify(value);
        return this.backend.save(key, jsonValue, ttl);
    }

    public delete(key: string): Promise<boolean> {
        return this.backend.delete(key);
    }
}
