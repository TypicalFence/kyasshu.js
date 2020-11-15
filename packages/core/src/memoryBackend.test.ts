import { createCacheItem, isItemAlive, MemoryBackend } from "./memoryBackend";

describe("MemoryBackend", () => {
    describe("CacheItem", () => {
        describe("createCacheItem", () => {
            it("should create a new CacheItem", () => {
                const item = createCacheItem("2", null);
                expect(item).toHaveProperty("added");
                expect(item).toHaveProperty("value");
                expect(item).toHaveProperty("ttl");
                expect(item.ttl).toBeNull();
                expect(item.value).toEqual("2");
                expect(item.added).toBeInstanceOf(Date);
            });
        });

        describe("isItemAlive", () => {
            it("should return true if ttl is null", () => {
                const item = createCacheItem("2", null);
                const isAlive = isItemAlive(item);
                expect(isAlive).toBeTruthy();
            });

            it("should return true if ttl is still in the future", () => {
                const item = createCacheItem("2", 500);
                const isAlive = isItemAlive(item);
                expect(isAlive).toBeTruthy();
            });

            it("should return true if ttl is in the past", () => {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);

                const item = createCacheItem("2", 500);
                item.added = yesterday;

                const isAlive = isItemAlive(item);
                expect(isAlive).toBeFalsy();
            });
        });
    });

    it("should be able to store a value", async() => {
        const backend = new MemoryBackend();
        const value = JSON.stringify(42);
        const worked = await backend.save("meaningOfLife", value, null);
        expect(worked).toEqual(true);
    });

    it("should be able to fetch a value", async() => {
        const backend = new MemoryBackend();
        const value = JSON.stringify(42);
        await backend.save("meaningOfLife", value, null);
        const fetchedValue = await backend.fetch("meaningOfLife");
        expect(fetchedValue).toEqual(value);
    });

    it("should return null when it fails to fetch a value", async() => {
        const backend = new MemoryBackend();
        const fetchedValue = await backend.fetch("cool key that does not exist");
        expect(fetchedValue).toEqual(null);
    });

    it("should be able to check if a key exists", async() => {
        const backend = new MemoryBackend();
        backend.save("myKey", "300", null);
        const exists = await backend.contains("myKey");
        expect(exists).toBeTruthy();
    });

    it("should be able to check if a key doesn't exists", async() => {
        const backend = new MemoryBackend();
        const exists = await backend.contains("invalidKey");
        expect(exists).toBeFalsy();
    });

    it("should be able to delete a cached value", async() => {
        const backend = new MemoryBackend();
        backend.save("yes", "\"yes\"", null);
        const didDelete1 = await backend.delete("yes");
        const didDelete2 = await backend.delete("no");
        expect(didDelete1).toBeTruthy();
        expect(didDelete2).toBeFalsy();
    });
});
