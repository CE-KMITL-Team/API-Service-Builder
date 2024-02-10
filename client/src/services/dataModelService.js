import api from "./apiInstance";
import { apiMap } from "../utils/apiPath";

export function getDataModels(modelID) {
  return api.get(apiMap.GET_DATA_MODELS(modelID)).then((response) => {
    return response;
  });
}
