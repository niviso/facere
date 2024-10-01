import sv from "./sv.json";
import en from "./en.json";
import {LocaleProps} from "@/types";

const locales = [
  "en",
  "sv"
];

const locale:LocaleProps = {
    locales: {
      sv: sv,
      en: en,
    },
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

function t(key:string,variables?:any) {
    const slicedKey = key.split(".");
    let localeStr = "";
    if(slicedKey.length !== 0) {
      localeStr = findDeepKey(locale.locales[locale.lang],slicedKey[slicedKey.length - 1]) || findDeepKey(locale.locales[locale.fallbackLang],slicedKey[slicedKey.length - 1]) || key
    } else {
      localeStr = locale.locales[locale.lang][key] || locale.locales[locale.fallbackLang][key] || key
    }
    if(variables) {
      variables.forEach((variable:Record<string , any>) => {
        localeStr = localeStr.replace(`@${variable.name}`,variable.value);
      });
    }

    return localeStr;

}

function setLocale(lang:string) {
    if(locale.locales[lang]){
        locale.lang = lang;
    } else {
        return false;
    }
}

function getLocale(){
    return locale.lang || locale.fallbackLang;
}

export {t,getLocale, setLocale};