import { FETCH_END, FETCH_ERROR, FETCH_START } from "../actions/loadingActions";

const initialState = {
	loading: false,
	error: null,
};

export function loadingReducers(state = initialState, action) {
	switch (action.type) {
		case FETCH_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_END:
			return {
				...state,
				loading: false,
			};
		case FETCH_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
}
