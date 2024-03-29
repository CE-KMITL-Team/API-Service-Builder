import { combineReducers } from "redux";
import { authReducers } from "./authReducers";
import { loadingReducers } from "./loadingReducers";
import { flowReducer } from "./flowReducers";

export const rootReducers = combineReducers({
	auth: authReducers,
	loading: loadingReducers,
	focusNode: flowReducer,
});

//store: {auth: {userData: null}}
