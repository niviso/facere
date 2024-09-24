import CryptoES from 'crypto-es';

const Encryption = {
    key: "tasse",
    encrypt: (value:string) => {
        const result = CryptoES.AES.encrypt(value, Encryption.key);
        return result;
    },
    decrypt: (encrypted:any) => {
        const decrypted =  CryptoES.AES.decrypt(encrypted, Encryption.key);
        return decrypted.toString(CryptoES.enc.Utf8);
    }
}

function setKey(key:CryptoKey){

}



export default Encryption;