import sv from "./sv.json";
import en from "./en.json";

const locale:any = {
    sv: sv,
    en: en,
    lang: "sv",
    fallbackLang: "en",
} as const;



function findDeepKey(obj:any, keyToFind:string):string | undefined {
    // Loop through each key in the object
    for (let key in obj) {
      if (key === keyToFind) {
        return obj[key]; // Return the value if the key is found
      }
      
      // If the current value is an object, search recursively
      if (typeof obj[key] === "object" && obj[key] !== null) {
        const result = findDeepKey(obj[key], keyToFind);
        if (result !== undefined) {
          return result;
        }
      }
    }
}

function t(key:string) {
    const slicedKey = key.split(".");
    if(slicedKey.length !== 0) {
        return findDeepKey(locale[locale.lang],slicedKey[slicedKey.length - 1]) || findDeepKey(locale[locale.fallbackLang],slicedKey[slicedKey.length - 1]) || ""
    }
    return locale[locale.lang][key] || locale[locale.fallbackLang][key] || ""
}

function setLocale(lang:string) {
    if(locale[lang]){
        locale.lang = lang;
    } else {
        return false;
    }
}

function getLocale(){
    return locale.lang || locale.fallbackLang;
}

export {t,getLocale, setLocale};