import languagesJson from "../../public/content/languages.json";
import { getProjectGeoForLang } from "../utils/localeMap";

export const PROJECT_NAME = "SlotsDJ";
export const PROJECT_URL = "slotsdj-online.com";

export const PROJECT_GEO = getProjectGeoForLang(
  languagesJson.defaultLang || "au"
);
