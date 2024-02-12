import { apiMap } from "../utils/apiPath";
import api from "./apiInstance";

export function addFlow(
	name,
	description,
	API,
	markdown,
	status,
	workspace_id
) {
	return api
		.post(apiMap.ADD_FLOW, {
			name: name,
			description: description,
			API: API,
			markdown: markdown,
			status: status,
			workspace_id: workspace_id,
		})
		.then((response) => {
			return response;
		});
}

export function getFlowDetailByName(flowName) {
	return api
		.get(apiMap.GET_FLOW_DETAIL_BY_ID, {
			params: { flow_name: flowName },
		})
		.then((response) => {
			return response;
		});
}
