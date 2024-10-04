import CryptoES from 'crypto-es';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

const Encryption = {
    encrypt: async (value:string) => {
        const encryptionKey = await getEncryptionKey();
        const result = CryptoES.AES.encrypt(value, encryptionKey);
        return JSON.stringify(result);
    },
    decrypt: async (encrypted:Object) => {
        const encryptionKey = await getEncryptionKey();
        const decrypted =  CryptoES.AES.decrypt(encrypted, encryptionKey);
        return decrypted.toString(CryptoES.enc.Utf8);
    }
};

async function getEncryptionKey():Promise<string> {
    const key = await SecureStore.getItemAsync("facere-encryption-key");
    if(key) {
        return key;
    } else {
        const newKey = Crypto.randomUUID();
        await SecureStore.setItemAsync("facere-encryption-key", newKey);
        return newKey;
    }
}



export default Encryption;