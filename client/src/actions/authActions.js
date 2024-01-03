import { login, register } from "../services/authService";
import { endFetch, errorFetch, startFetch } from "./loadingActions";

export const SET_AUTH = "SET_AUTH";

export function setAuth(user) {
	return {
		type: SET_AUTH,
		payload: user,
	};
}

export function fetchLogin(email, password) {
	return async (dispatch) => {
		try {
			dispatch(startFetch());
			const user = await login(email, password);

			if (user) {
				dispatch(setAuth(user));
				dispatch(endFetch());
				dispatch(errorFetch(null));

				return Promise.resolve(true);
			}
		} catch (error) {
			dispatch(setAuth(null));
			dispatch(errorFetch(error));

			return Promise.resolve(false);
		}
	};
}

export function fetchRegister(email, firstname, lastname, password) {
	return async (dispatch) => {
		try {
			dispatch(startFetch());
			const user = await register(email, password, firstname, lastname);

			if (user) {
				dispatch(endFetch());
				dispatch(errorFetch(null));
				return true;
			}
			return false;
		} catch (error) {
			dispatch(errorFetch(error));
			return false;
		}
	};
}

export function fetchLogout() {
	return (dispatch) => {
		dispatch(setAuth(null));
	};
}
