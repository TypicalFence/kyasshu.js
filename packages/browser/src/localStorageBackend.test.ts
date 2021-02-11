import { LocalStorageBackend } from "./localStorageBackend";
import { LocalStorage } from "node-localstorage";

describe(LocalStorageBackend.name, () => {
    const getBackend = (name = "test"): LocalStorageBackend => new LocalStorageBackend(name, new LocalStorage("./.localstorage"));

    afterAll(() => {
        return (new LocalStorage("./.localstorage") as any).__deleteLocation();
    });

    describe("save", () => {
        it("should save a value", async() => {
            const backend = getBackend();
            await backend.save("save1", "hi", null);
            const contains = await backend.contains("save1");
            expect(contains).toBeTruthy();
        });
    });

    describe("fetch", () => {
        it("should get a value when it exists", async() => {
            const backend = getBackend();
            await backend.save("fetch1", "hi", null);
            const contains = await backend.contains("fetch1");
            expect(contains).toBeTruthy();
        });

        it("should return null when a key does not exist", async() => {
            const backend = getBackend();
            const contains = await backend.fetch("this does not exist");
            expect(contains).toBeNull();
        });
    });

    describe("contains", () => {
        it("should return true when the cache contains a given key", async() => {
            const backend = getBackend();
            await backend.save("contains1", "hi", null);
            const contains = await backend.contains("contains1");
            expect(contains).toBeTruthy();
        });

        it("should return true when the cache does not contain a given key", async() => {
            const backend = getBackend();
            const contains = await backend.contains("this does not exist");
            expect(contains).toBeFalsy();
        });
    });

    describe("delete", () => {
        it("should delete cached items", async() => {
            const backend = getBackend();
            await backend.save("delete1", "hi", null);
            const contains = await backend.contains("delete1");
            await backend.delete("delete1");
            const containsAfterDelete = await backend.contains("delete1");
            expect(contains).toBeTruthy();
            expect(containsAfterDelete).toBeFalsy();
        });
    });
});
