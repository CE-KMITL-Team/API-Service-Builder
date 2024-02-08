import api from "./apiInstance";
import { apiMap } from "../utils/apiPath";

export function createModel(
  workspace_id,
  model_name,
  model_type,
  model_description
) {
  return api
    .post(apiMap.CREATE_MODEL, {
      workspace_id: workspace_id,
      model_name: model_name,
      model_type: model_type,
      model_description: model_description,
    })
    .then((response) => {
      return response;
    });
}

export function getModelWorkspace(workspace_id) {
  return api
    .get(apiMap.GET_MODELWORKSPACE, { params: { workspace_id: workspace_id } })
    .then((response) => {
      return response;
    });
}

export function getModelDetail(model_id) {
  return api
    .get(apiMap.GET_MODELDETAIL, { params: { model_id: model_id } })
    .then((response) => {
      return response;
    });
}
console.log("getModelDetail", getModelDetail(21));
