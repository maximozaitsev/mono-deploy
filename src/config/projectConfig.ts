import languagesJson from "../../public/content/languages.json";
import { getProjectGeoForLang } from "../utils/localeMap";

export const PROJECT_NAME = "Chicken Royal Casino";
export const PROJECT_URL = "chicken-royal-online.com";

export const PROJECT_GEO = getProjectGeoForLang(
  languagesJson.defaultLang || "en"
);
