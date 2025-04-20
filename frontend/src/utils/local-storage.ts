export function setLocalStorageItem(key: string, value: unknown) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
}

export function getLocalStorageItem(key: string) {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
    } catch (error) {
        console.log(error);
    }
}

export function removeLocalStorageItem(key: string) {
    window.localStorage.removeItem(key);
}
