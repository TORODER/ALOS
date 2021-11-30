export type Language = "EN" | "ZH_CN";

let localLanguage: Language = "ZH_CN";

export function getLocalLanguage<T>(langMap: Multilingual<T>): T {
    return langMap[localLanguage] ?? langMap["ZH_CN"];
}