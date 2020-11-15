import { Cache } from "./cache";
import { DummyBackend } from "./dummyBackend";

describe("Cache", () => {
    it("should work", () => {
        const cache = new Cache(new DummyBackend());
        expect(cache).toBeInstanceOf(Cache);
    });

    it("should be able to cache values", () => {
        const backend = new DummyBackend();
        backend.save = jest.fn(() => Promise.resolve(true));
        const cache = new Cache(backend);
        cache.save("meaning", 42);
        expect(backend.save).toBeCalled();
    });

    it("should be able to fetch values", async() => {
        const backend = new DummyBackend();
        backend.fetch = jest.fn(async(key) => {
            if (key === "number") {
                return JSON.stringify(42);
            }

            if (key === "object") {
                return JSON.stringify({ cool: "cool" });
            }

            return null;
        });
        const cache = new Cache(backend);
        const number = await cache.fetch("number");
        expect(number).toEqual(42);
        const object = await cache.fetch("object");
        expect(object).toEqual({ cool: "cool" });
        const akari = await cache.fetch("akari");
        expect(akari).toEqual(null);
    });
});
