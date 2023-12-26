import api from "./apiInstance";
import { apiMap } from "../utils/apiPath";

export function login(email, password) {
	return api
		.post(apiMap.LOGIN, {
			email: email,
			password: password,
		})
		.then((response) => {
			return response.userData;
		});
}

export function register(email, password, firstname, lastname) {
	return api
		.post(apiMap.REGISTER, {
			email: email,
			password: password,
			firstname: firstname,
			lastname: lastname,
		})
		.then((response) => {
			return response.userData;
		});
}
