type Language = "EN" | "ZH_CN";

type Multilingual<T> = Partial<Record<Language, T>> & { "ZH_CN": T };