import type { CacheBackend } from "./cacheBackend";

export interface CacheItem {
    value: string;
    added: Date;
    ttl: number|null;
}

export function createCacheItem(value: string, ttl: number|null): CacheItem {
    return {
        value,
        ttl,
        added: new Date()
    };
}

export function isItemAlive(item: CacheItem) {
    const { added, ttl } = item;

    if (ttl === null) {
        return true;
    }

    const expiryDate = new Date(added.getTime() + (ttl * 1000));
    const now = new Date();
    return expiryDate > now;
}

export class MemoryBackend implements CacheBackend {
    private map: Map<string, CacheItem>;

    constructor() {
        this.map = new Map<string, CacheItem>();
    }

    async contains(key: string): Promise<boolean> {
        return await this.fetch(key) !== null;
    }

    async delete(key: string): Promise<boolean> {
        return this.map.delete(key);
    }

    async fetch(key: string): Promise<string | null> {
        const item = this.map.get(key);

        if (typeof item === "undefined") {
            return null;
        }

        if (!isItemAlive(item)) {
            await this.delete(key);
            return null;
        }

        return item.value;
    }

    save(key: string, value: string, ttl: number | null): Promise<boolean> {
        this.map.set(key, createCacheItem(value, ttl));
        return Promise.resolve(true);
    }
}
