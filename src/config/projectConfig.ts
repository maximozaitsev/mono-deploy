import languagesJson from "../../public/content/languages.json";
import { getProjectGeoForLang } from "../utils/localeMap";

export const PROJECT_NAME = "Ozwin Casino";
export const PROJECT_URL = "ozwin-casino-win.com";

export const PROJECT_GEO = getProjectGeoForLang(
  languagesJson.defaultLang || "au"
);
