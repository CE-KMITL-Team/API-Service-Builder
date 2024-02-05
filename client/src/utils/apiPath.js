export const API_HOST = "http://localhost:3200";

export const apiMap = {
	//Authorize
	LOGIN: "/auth/login",
	REGISTER: "/auth/register",
	CHECK_EMAIL: "/auth/check-email",

	//Workspaces
	GET_TEMPLATES: "/workspace/get/templates",
	GET_WORKSPACES: "/workspace/get/workspaces",
	CREATE_WORKSPACES: "/workspace/create",

	//Models
	CREATE_MODEL: "/models/create",
	EDIT_MODEL: "/models/edit",
	DELETE_MODEL: "/models/delete",
	GET_MODELWORKSPACE: "/models/get",
};
