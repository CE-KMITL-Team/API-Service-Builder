export const API_HOST = "http://localhost:3200";

export const apiMap = {
	//Authorize
	LOGIN: "/auth/login",
	REGISTER: "/auth/register",
	CHECK_EMAIL: "/auth/check-email",

	//Workspaces
	GET_TEMPLATES: "/workspace/get/templates",
	GET_WORKSPACES: "/workspace/get/workspaces",
	GET_WORKSPACE_DETAIL_BY_NAME: "/workspace/get/workspaceDetailByName",
	GET_WORKSPACE_DETAIL_BY_ID: "/workspace/get/workspaceDetailByID",
	CREATE_WORKSPACES: "/workspace/create",

	//Flows
	ADD_FLOW: "/flows/add",
	GET_FLOW_DETAIL_BY_ID: "/flows/getFlowDetailByName",
	GET_FLOW: "/flows/get",
	DELETE_FLOW: "/flows/delete",
	SAVE_MARKDOWN: "/flows/saveMarkdown",
	GET_MARKDOWN_BY_NAME: "/flows/getMarkdownByName",
	EDIT_DATA_FLOWs: "/flows/edit",

	//Models
	CREATE_MODEL: "/models/create",
	EDIT_MODEL: "/models/edit",
	DELETE_MODEL: "/models/delete",
	GET_MODELWORKSPACE: "/models/get",
	GET_MODELDETAIL: "/models/getModelDetail",

	//DataModels
	GET_DATA_MODELS: (modelID) => `/models/${modelID}/get`,
	ADD_DATA_MODELS: (modelID) => `/models/${modelID}/add`,
	EDIT_DATA_MODELS: (modelID) => `/models/${modelID}/edit`,
	DELETE_DATA_MODELS: (modelID) => `/models/${modelID}/delete`,
};
