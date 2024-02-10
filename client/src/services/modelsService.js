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
