import sv from "./sv.json";
import en from "./en.json";

const locale:any = {
    sv: sv,
    en: en,
    lang: "sv",
    fallbackLang: "en",
} as const;


function t(key:string) {
    return locale[locale.lang][key] || locale[locale.fallbackLang][key] || ""
}

export default t;