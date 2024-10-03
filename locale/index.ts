import sv from "./sv.json";
import en from "./en.json";
import {LocaleProps} from "@/types";

const locale:LocaleProps = {
    locales: {
      sv: sv,
      en: en,
    },
    lang: "sv",
    fallbackLang: "en",
} as const;



function findDeepKey(obj:Record<string, undefined>, keyToFind:string):string | undefined {
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


function lookForKeyInObj(key:string, obj:any) {
  const slicedKey = key.split(".");
  const slicedKeyTmp = slicedKey[0] || key;
    for (let keyObj in obj) {
      if(keyObj == slicedKeyTmp){
        if(slicedKey.length == 1) {
          return obj[slicedKeyTmp];
        } else {
          return lookForKeyInObj(key.substring(slicedKeyTmp.length + 1,key.length),obj[keyObj]);
        }
      }
    }

    return null;
}

function t(key:string,variables?:Record<string , any>) {
    let localeStr = lookForKeyInObj(key,locale.locales[locale.lang]) || lookForKeyInObj(key,locale.locales[locale.fallbackLang]) || key;
    
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