import api from "./apiInstance";
import { apiMap } from "../utils/apiPath";

export function getDataModels(modelID) {
  return api.get(apiMap.GET_DATA_MODELS(modelID)).then((response) => {
    return response;
  });
}

export function addDataModels(modelID, columns) {
  return api
    .post(apiMap.ADD_DATA_MODELS(modelID), { columns: columns })
    .then((response) => {
      return response;
    });
}

export function editDataModels(modelID, columns) {
  return api
    .put(apiMap.EDIT_DATA_MODELS(modelID), { columns: columns })
    .then((response) => {
      return response;
    });
}

export function deleteDataModels(modelID, id) {
  return api
    .delete(apiMap.DELETE_DATA_MODELS(modelID), { params: { id: id } })
    .then((response) => {
      return response;
    });
}

export function addExcel(modelID, excelData) {
  return api
    .post(apiMap.ADD_EXCEL_DATA(modelID), { data: excelData })
    .then((response) => {
      return response;
    });
}
