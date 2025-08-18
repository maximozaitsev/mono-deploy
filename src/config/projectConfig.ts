import languagesJson from "../../public/content/languages.json";
import { getProjectGeoForLang } from "../utils/localeMap";

export const PROJECT_NAME = "Foxy Gold Casino";
export const PROJECT_URL = "foxygold-online.com ";

export const PROJECT_GEO = getProjectGeoForLang(
  languagesJson.defaultLang || "au"
);
