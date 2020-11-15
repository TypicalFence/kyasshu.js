import { DummyBackend } from "./dummyBackend";

describe("DummyBackend", () => {
    const dummy = new DummyBackend();

    it("should implement contains", async() => {
        const result = await dummy.contains("something");
        expect(result).toBe(false);
    });

    it("should implement delete", async() => {
        const result = await dummy.delete("something");
        expect(result).toBe(false);
    });

    it("should implement fetch", async() => {
        const result = await dummy.fetch("something");
        expect(result).toBe(null);
    });

    it("should implement save", async() => {
        const result = await dummy.save("something", "\"my cool value\"", null);
        expect(result).toBe(false);
    });
});
