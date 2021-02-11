import { CacheBackend, createCacheItem, isItemAlive } from "@kyasshu/core";

export class LocalStorageBackend implements CacheBackend {
    private readonly name: string;
    private readonly storage: Storage;

    constructor(name: string, storage?: Storage) {
        this.name = name;
        if (storage) {
            this.storage = storage;
        } else {
            if (typeof window !== "undefined") {
                this.storage = window.localStorage;
            } else {
                throw new Error("window object not defined");
            }
        }
    }

    private getKey(key: string) {
        // maybe find a better solution to this issue
        if (key.startsWith("kyasshu_")) {
            return key;
        }

        return "kyasshu_" + this.name + "_" + key;
    }

    async contains(key: string): Promise<boolean> {
        return (await this.fetch(this.getKey(key))) !== null;
    }

    async delete(key: string): Promise<boolean> {
        if (await this.contains(this.getKey(key))) {
            this.storage.removeItem(this.getKey(key));
            return true;
        }

        return false;
    }

    async fetch(key: string): Promise<string | null> {
        const json = this.storage.getItem(this.getKey(key));

        if (!json) {
            return null;
        }

        const item = JSON.parse(json);

        if (!isItemAlive(item)) {
            this.storage.removeItem(this.getKey(key));
            return null;
        }
        return item.value;
    }

    async save(key: string, value: string, ttl: number | null): Promise<boolean> {
        const item = createCacheItem(value, ttl);
        const json = JSON.stringify(item);
        this.storage.setItem(this.getKey(key), json);
        return true;
    }
}
