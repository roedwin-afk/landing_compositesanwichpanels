import { en } from "./en";
import { es } from "./es";
import type { TranslationKeys } from "./en";

export const languages = {
  en: "English",
  es: "Español",
} as const;

export type Lang = keyof typeof languages;

const translations: Record<Lang, TranslationKeys> = {
  en,
  es,
};

/**
 * Detecta el idioma desde la URL usando el BASE_URL de Astro.
 * Inglés es la ruta por defecto (/), español usa prefijo (/es/).
 */
export function getLang(url: URL, base: string = "/"): Lang {
  const pathname = url.pathname.replace(base, "") || "";
  if (pathname.startsWith("es/") || pathname === "es") {
    return "es";
  }
  return "en";
}

/**
 * Devuelve el objeto de traducciones para el idioma dado.
 */
export function useTranslations(lang: Lang): TranslationKeys {
  return translations[lang];
}

/**
 * Devuelve la ruta alternativa (EN ↔ ES) para el hreflang.
 * Inglés es la ruta raíz, español usa prefijo /es/.
 */
export function getAlternatePath(url: URL, base: string = "/"): string {
  const pathname = url.pathname.replace(base, "") || "";

  if (pathname.startsWith("es/") || pathname === "es") {
    // Estamos en ES → devolver ruta EN
    const enPath = pathname.replace(/^es\/?/, "") || "";
    return `${base}${enPath}`;
  } else {
    // Estamos en EN → devolver ruta ES
    return `${base}es/${pathname}`.replace(/\/$/, "");
  }
}