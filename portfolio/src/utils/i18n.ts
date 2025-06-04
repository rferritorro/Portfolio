// src/utils/i18n.ts
import { getCollection } from 'astro:content';

async function loadTranslations(lang: string) {
  try {
    const translations = await getCollection('i18n', (entry) => entry.id === lang);
    // Como se espera un único archivo por idioma, devolvemos el contenido del primer (y único) elemento.
    return translations[0]?.data || {};
  } catch (error) {
    console.error(`Error loading translations for ${lang}:`, error);
    return {};
  }
}

export { loadTranslations };