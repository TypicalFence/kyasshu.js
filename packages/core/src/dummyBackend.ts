import type { CacheBackend } from "./cacheBackend";

/* eslint-disable @typescript-eslint/no-unused-vars */

export class DummyBackend implements CacheBackend {
    contains(_key: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    delete(_key: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    fetch(_key: string): Promise<string | null> {
        return Promise.resolve(null);
    }

    save(_key: string, _value: string, _ttl: number | null): Promise<boolean> {
        return Promise.resolve(false);
    }
}
