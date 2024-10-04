import AsyncStorage from '@react-native-async-storage/async-storage';
import Encryption from "./Encryption";
const Store = {
    baseKey: "@facere/",
    set: async (key:string,data:Object): Promise<string | unknown> => {
        try {
            const jsonValue = JSON.stringify(data);
            const encryptedData = await Encryption.encrypt(jsonValue);
            await AsyncStorage.setItem(Store.baseKey + key, encryptedData);
        } catch (e: unknown) {
            return e;
        }
    },
    get: async (key:string): Promise<Object | unknown>  => {
        try {
            const jsonValue = await AsyncStorage.getItem(Store.baseKey + key);
            if(!jsonValue){
                return "";
            }

           const decryptedJsonValue = await Encryption.decrypt(JSON.parse(jsonValue));
            return JSON.parse(decryptedJsonValue);
        } catch (e) {
            return e;
        }
    },
    wipe: async (): Promise<void> => {
        await AsyncStorage.clear();
    },
    delete: async (key:string):Promise<unknown> => {
        try {
             await AsyncStorage.removeItem(Store.baseKey + key);
        } catch (e:unknown) {
            return e;
        }
    }
}

export default Store;