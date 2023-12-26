import axios from "axios";
import { API_HOST } from "../utils/apiPath";

const api = axios.create({
	baseURL: API_HOST,
});

api.interceptors.response.use(
	(response) => {
		if (response.data.status !== undefined) {
			if (response.data.status) {
				return response.data;
			}
			throw response.data.msg;
		}
		return response.data;
	},
	(error) => {
		throw error;
	}
);

export default api;
