import { StorageKeys, localStorageUtils } from "./localStorage";

const userUtils = {
	getID: (state = null) => {
		try {
			return (
				state?.auth?.userData?.id ||
				localStorageUtils.getItem(StorageKeys.USER_DATA).id
			);
		} catch (error) {
			console.log(`Get user id error: ${error}`);
			return null;
		}
	},

	getFirstname: (userData) => {
		try {
			return userData.firstname;
		} catch (error) {
			console.log(`Get firstname error: ${error}`);
			return "";
		}
	},

	getLastname: (userData) => {
		try {
			return userData.lastname;
		} catch (error) {
			console.log(`Get lastname error: ${error}`);
			return "";
		}
	},

	getEmail: (userData) => {
		try {
			return userData.email;
		} catch (error) {
			console.log(`Get email error: ${error}`);
			return "";
		}
	},

	getFullName: (userData) => {
		try {
			return `${userData.firstname} ${userData.lastname}`;
		} catch (error) {
			console.log(`Get full name error: ${error}`);
			return "";
		}
	},

	logout: () => {
		localStorageUtils.removeItem(StorageKeys.USER_DATA);
		localStorageUtils.removeItem(StorageKeys.WORKSPACE_DATA);
	},
};

export default userUtils;
