import { combineReducers } from "redux";
import { authReducers } from "./authReducers";
import { loadingReducers } from "./loadingReducers";

export const rootReducers = combineReducers({
	auth: authReducers,
    loading: loadingReducers
});

//store: {auth: {userData: null}}
