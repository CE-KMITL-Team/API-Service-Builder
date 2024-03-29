import {
	addFlow,
	getFlowDetailByName,
	getFlows,
	deleteFlows,
	saveFlowMarkdown,
	getFlowMarkdownByName,
	editDataFlows
} from "../services/flowService";
import { endFetch, errorFetch, startFetch } from "./loadingActions";

export const FOCUS_NODE = "FOCUS_NODE";
export const SAVE_PROPERTY = "SAVE_PROPERTY";
export const DELETE_NODE_PROPERTY = "DELETE_NODE_PROPERTY";

export const saveFocusNode = (jsonData) => ({
	type: FOCUS_NODE,
	payload: jsonData,
});

export const saveProperty = (property, force = false) => {
	return {
		type: SAVE_PROPERTY,
		payload: {
			property,
			force,
		},
	};
};
export const deleteNodeProperty = (id) => {
	return {
		type: DELETE_NODE_PROPERTY,
		payload: {
			id,
		},
	};
};

export function fetchAddFlow({
	name,
	description,
	API,
	markdown,
	status,
	workspace_id,
}) {
	return async (dispatch) => {
		try {
			dispatch(startFetch());

			const data = await addFlow(
				name,
				description,
				API,
				markdown,
				status,
				workspace_id
			);

			if (data) {
				dispatch(endFetch());
				dispatch(errorFetch(null));

				return Promise.resolve(data);
			}
		} catch (error) {
			dispatch(errorFetch(error));

			return Promise.resolve({ status: false, msg: error });
		}
	};
}

export function fetchGetFlowDetailByName(flow_name) {
	return async (dispatch) => {
		try {
			dispatch(startFetch());

			const data = await getFlowDetailByName(flow_name);

			if (data) {
				dispatch(endFetch());
				dispatch(errorFetch(null));

				return Promise.resolve(data);
			}
		} catch (error) {
			dispatch(errorFetch(error));

			return Promise.resolve({ status: false, msg: error });
		}
	};
}
export function fetchEditDataFlows(id, columns) {
	return async (dispatch) => {
	  try {
		dispatch(startFetch());
  
		const data = await editDataFlows(id, columns);
  
		if (data) {
		  dispatch(endFetch());
		  dispatch(errorFetch(null));
  
		  return Promise.resolve(data);
		}
	  } catch (error) {
		console.log(error);
		dispatch(errorFetch(error));
  
		return Promise.resolve(false);
	  }
	};
  }
export function fetchGetFlows(workspaceid) {
	return async (dispatch) => {
		try {
			dispatch(startFetch());

			const data = await getFlows(workspaceid);

			if (data) {
				dispatch(endFetch());
				dispatch(errorFetch(null));

				return Promise.resolve(data);
			}
		} catch (error) {
			dispatch(errorFetch(error));

			return Promise.resolve({ status: false, msg: error });
		}
	};
}

export function fetchDeleteFlows(workspace_id, flow_id) {
	return async (dispatch) => {
		try {
			dispatch(startFetch());

			const data = await deleteFlows(workspace_id, flow_id);

			if (data) {
				dispatch(endFetch());
				dispatch(errorFetch(null));

				return Promise.resolve(data);
			}
		} catch (error) {
			dispatch(errorFetch(error));

			return Promise.resolve(false);
		}
	};
}

export function fetchSaveFlowMarkdown(flow_name, markdown) {
	return async (dispatch) => {
		try {
			const data = await saveFlowMarkdown(flow_name, markdown);

			if (data.status) {
				dispatch(errorFetch(null));

				return Promise.resolve(data);
			}
		} catch (error) {
			dispatch(errorFetch(error));

			return Promise.resolve(false);
		}
	};
}

export function fetchGetFlowMarkdownByName(flow_name) {
	return async (dispatch) => {
		try {
			dispatch(startFetch());

			const data = await getFlowMarkdownByName(flow_name);

			if (data.status) {
				dispatch(endFetch());
				dispatch(errorFetch(null));

				return Promise.resolve(data);
			}
		} catch (error) {
			dispatch(errorFetch(error));

			return Promise.resolve({ status: false, msg: error });
		}
	};
}
