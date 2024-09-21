import AsyncStorage from '@react-native-async-storage/async-storage';

const Store = {
    baseKey: "@facere/",
    set: async (key:string,data:any) => {
        try {
            const jsonValue = JSON.stringify(data);
            await AsyncStorage.setItem(Store.baseKey + key, jsonValue);
        } catch (e) {
            return e;
        }
    },
    get: async (key:string) => {
        try {
            const jsonValue = await AsyncStorage.getItem(Store.baseKey + key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            return e;
        }
    },
    delete: async (key:string) => {
        try {
             await AsyncStorage.removeItem(Store.baseKey + key);
        } catch (e) {
            return e;
        }
    }
}

export default Store;