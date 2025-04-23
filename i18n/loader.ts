/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";

/**
 * Ajoute une propriété imbriquée à un objet.
 * @param obj - L'objet cible.
 * @param keys - Les clés pour accéder à la propriété imbriquée.
 * @returns Un objet contenant l'objet modifié et la dernière clé.
 */
const addNestedProperty = (obj: { [key: string]: any }, keys: string[]) => {
  let current = obj;

  for (const key of keys) {
    if (!current[key]) {
      current[key] = {};
    }
    current = current[key];
  }

  return { obj, lastKey: current };
};

/**
 * Charge les traductions i18n à partir des fichiers JSON dans le dossier spécifié.
 * @param dictionariesPath - Le chemin vers le dossier contenant les fichiers de traduction.
 * @param locale - La locale à charger (par exemple, "fr").
 * @returns Un objet contenant toutes les traductions pour la locale spécifiée.
 */
export const loadI18nTranslations = (
  dictionariesPath: string,
  locale: string,
) => {
  const relativePath = path.join(dictionariesPath, locale);
  const absolutePath = path.join(process.cwd(), relativePath);

  // eslint-disable-next-line prefer-const
  let translations = {};

  try {
    const files = fs.readdirSync(absolutePath, {
      recursive: true,
      encoding: "utf-8",
    });

    files.forEach((file) => {
      if (typeof file === "string" && file.endsWith(".json")) {
        const fileParents = file
          .split(path.sep)
          .filter((parent) => !parent.endsWith(".json"))
          .map((parent) => parent.replace(".json", ""));

        const filePath = path.join(absolutePath, file);
        const fileTranslations = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        const { lastKey } = addNestedProperty(translations, fileParents);
        Object.assign(lastKey, fileTranslations);
      }
    });
  } catch (error) {
    console.error("Erreur lors du chargement des traductions :", error);
  }

  return translations;
};
