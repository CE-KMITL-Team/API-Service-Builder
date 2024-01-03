import api from "./apiInstance";
import { apiMap } from "../utils/apiPath";

export function getTemplates() {
	return api.get(apiMap.GET_TEMPLATES).then((response) => {
		return response.templates;
	});
}

export function getWorkspaces() {
	return api.get(apiMap.GET_WORKSPACES).then((response) => {
		return response.workspaces;
	});
}
