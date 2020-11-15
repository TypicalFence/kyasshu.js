/**
 * A CacheBackend implements the actual storing and retrieving of values to be cached.
 *
 * Values are expected to be JSON strings.
 * This should make implementing them easier, as they only have to worry about storing strings.
 */
export interface CacheBackend {
    /**
     * Fetches the cached value of the given key.
     *
     * The value must be encoded as a JSON string.
     *
     * @param key
     * @returns A Promise containing the cached value or null if the key doesn't exist
     */
    fetch(key: string): Promise<string|null>

    /**
     * Checks if a key exists in the cache.
     *
     * @param key
     * @returns A Promise containing true if found
     */
    contains(key: string): Promise<boolean>

    /**
     * Adds a new value to the cache.
     *
     * Overwrites a value if the key already exists.
     *
     * @param key The key of the value
     * @param value The value to cache
     * @param ttl How long the value is valid (time to live)
     * @returns a Promise containing true if saved
     */
    save(key: string, value: string, ttl:number|null): Promise<boolean>

    /**
     * Removes the value with the given key
     * @param key
     * @returns a Promise containing true if deleted, false if couldn't be removed.
     */
    delete(key: string): Promise<boolean>
}
