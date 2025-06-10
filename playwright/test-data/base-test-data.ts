export class BaseTestData {
    /**
     * Get test data with optional overrides
     * @param defaultData - The default data object
     * @param overrides - Partial data to override default values
     * @returns Data with overridden values
     */
    getData<T>(defaultData: T, overrides?: Partial<T>): T {
        return {
            ...defaultData,
            ...overrides
        }
    }

    /**
     * Get test data excluding specified fields
     * @param defaultData - The default data object
     * @param excludes - Array of fields to exclude from the data
     * @returns Data with specified fields excluded
     */
    getDataWithExcludes<T>(defaultData: T, excludes: (keyof T)[]): Partial<T> {
        const data = { ...defaultData }
        excludes.forEach(field => {
            delete data[field]
        })
        return data
    }

    /**
     * Get test data with specific overrides and exclusions
     * @param defaultData - The default data object
     * @param overrides - Partial data to override default values
     * @param excludes - Array of fields to exclude from the data
     * @returns Data with overridden values and specified fields excluded
     */
    getDataWithOverridesAndExcludes<T>(
        defaultData: T,
        overrides: Partial<T>,
        excludes: (keyof T)[]
    ): Partial<T> {
        const data = this.getData(defaultData, overrides)
        excludes.forEach(field => {
            delete data[field]
        })
        return data
    }
}