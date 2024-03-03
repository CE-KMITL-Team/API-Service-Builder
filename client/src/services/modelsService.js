import api from "./apiInstance";
import { apiMap } from "../utils/apiPath";

export function createModel(
  workspace_id,
  name,
  description,
  columns,
  generateAPI
) {
  return api
    .post(apiMap.CREATE_MODEL, {
      workspace_id: workspace_id,
      model_name: name,
      model_desc: description,
      field_list: columns,
      GenerateAPI: generateAPI,
    })
    .then((response) => {
      return response;
    });
}

export function editModel(
  workspace_id,
  model_name,
  model_desc,
  model_id,
  field_list
) {
  return api
    .put(apiMap.EDIT_MODEL, {
      workspace_id: workspace_id,
      model_name: model_name,
      model_desc: model_desc,
      model_id: model_id,
      field_list: field_list,
    })
    .then((response) => {
      return response;
    });
}

export function getModelWorkspace(workspace_id) {
  return api
    .get(apiMap.GET_MODELWORKSPACE, {
      params: { workspace_id: workspace_id },
    })
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

export function getModelDetailByName(model_name, workspace_id) {
  return api
    .get(apiMap.GET_MODELDETAIL, {
      params: { model_name: model_name, workspace_id: workspace_id },
    })
    .then((response) => {
      return response;
    });
}

export function deleteModel(workspace_id, model_id) {
  return api
    .delete(apiMap.DELETE_MODEL, {
      params: { workspace_id: workspace_id, model_id: model_id },
    })
    .then((response) => {
      return response;
    });
}
