import { addFlow, getFlowDetailByName,getFlows,deleteFlows } from "../services/flowService";
import { endFetch, errorFetch, startFetch } from "./loadingActions";

export const FOCUS_NODE = "FOCUS_NODE";
export const SAVE_PROPERTY = "SAVE_PROPERTY";

export const saveFocusNode = (jsonData) => ({
	type: FOCUS_NODE,
	payload: jsonData,
});

export const saveProperty = (property) => {
	return {
		type: SAVE_PROPERTY,
		payload: {
			property,
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

export function fetchGetModelDetail(flow_name) {
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
  
