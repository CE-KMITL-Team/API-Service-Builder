import { StorageKeys, localStorageUtils } from "./localStorage";

export const getUserID = (state = null) => {
	try {
		return (
			state?.auth?.userData?.id ||
			localStorageUtils.getItem(StorageKeys.USER_DATA).id
		);
	} catch (error) {
		console.log(`Get user id error: ${error}`);
		return null;
	}
};
