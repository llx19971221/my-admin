
export default {
    set(key, value) {
        let flag = true;
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }catch {
            flag = false;
        }
        return flag;
    },

    get(key) {
        return JSON.parse(localStorage.getItem(key))
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
        }catch {
            return false;
        }
    }
}