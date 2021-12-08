import { computed, ComputedRef, Ref, ref } from "vue";

let localLanguage: Ref<Language> = ref("ZH_CN");

export function getLocalLanguage<T>(langMap: Multilingual<T>): T {
    return langMap[localLanguage.value] ?? langMap["ZH_CN"];
}