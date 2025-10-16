import languagesJson from "../../public/content/languages.json";
import { getProjectGeoForLang } from "../utils/localeMap";

export const PROJECT_NAME = "Spinmacho Casino";
export const PROJECT_URL = "spinmacho-online.com";

export const PROJECT_GEO = getProjectGeoForLang(
  languagesJson.defaultLang || "au"
);
