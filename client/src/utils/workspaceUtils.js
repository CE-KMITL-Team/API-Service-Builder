import {
	getWorkspaceDetailByID,
	getWorkspaceDetailByName,
} from "../services/workspaceService";
import { StorageKeys, localStorageUtils } from "./localStorage";

const workspaceUtils = {
	findByName: async (name) => {
		let user_id = localStorageUtils.getItem(StorageKeys.USER_DATA).id;

		try {
			let res = await getWorkspaceDetailByName(name, user_id);
			return res.data;
		} catch (error) {
			return null;
		}
	},
	findByID: async (workspace_id) => {
		try {
			let res = await getWorkspaceDetailByID(workspace_id);
			return res.data;
		} catch (error) {
			return null;
		}
	},
	init: (workspaceData) => {
		localStorageUtils.setItem(StorageKeys.WORKSPACE_DATA, workspaceData);
	},

	getFullDetail: () =>
		localStorageUtils.getItem(StorageKeys.WORKSPACE_DATA) ?? {},

	getID: () =>
		localStorageUtils.getItem(StorageKeys.WORKSPACE_DATA)?.id ?? -1,

	getName: () =>
		localStorageUtils.getItem(StorageKeys.WORKSPACE_DATA)?.name ?? "",

	isOnline: () =>
		localStorageUtils.getItem(StorageKeys.WORKSPACE_DATA)?.status ?? false,

	clear: () => localStorageUtils.removeItem(StorageKeys.WORKSPACE_DATA),
};

export default workspaceUtils;
