"use client"

function get<T>(key: string): (T | undefined) {
    if (typeof window !== undefined) {

        const item = window.localStorage.getItem(key)
        const result = item ? JSON.parse(item) as T : undefined
        return result
    }
}

function set<T>(key: string, value: T | undefined | null) {
    if (typeof window !== undefined) {

        if ( value === null || value === undefined )
        window.localStorage.removeItem(key)
        else 
        window.localStorage.setItem(key, JSON.stringify(value))
    }   
}

function update<T>(key: string, value: Partial<T>) {
    const data = get<T>(key)
    if (data) {
        const updatedData = { ...data, ...value }
        set(key, updatedData)
    }
    else set(key, value)
}
const local = { get, set, update }

export default local