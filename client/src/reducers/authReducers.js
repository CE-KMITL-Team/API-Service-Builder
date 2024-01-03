import { SET_AUTH } from "../actions/authActions";

const initialState = {
	userData: null,
};

export function authReducers(state = initialState, action) {
	switch (action.type) {
		case SET_AUTH:
			return {
				...state,
				userData: action.payload,
			};

		default:
			return state;
	}
}
