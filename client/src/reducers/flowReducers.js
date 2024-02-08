import { FOCUS_NODE } from "../actions/flowActions";

const initialState = {
	currentNode: null,
};

export const flowReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOCUS_NODE:
			return {
				...state,
				currentNode: action.payload,
			};
		default:
			return state;
	}
};
