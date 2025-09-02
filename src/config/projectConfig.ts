import languagesJson from "../../public/content/languages.json";
import { getProjectGeoForLang } from "../utils/localeMap";

export const PROJECT_NAME = "Nitro Casino";
export const PROJECT_URL = "nitro-cassino.com";

export const PROJECT_GEO = getProjectGeoForLang(
  languagesJson.defaultLang || "au"
);
