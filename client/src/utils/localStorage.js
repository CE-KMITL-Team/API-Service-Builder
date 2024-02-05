const StorageKeys = {
	USER_DATA: "userData",
	WORKSPACE_DATA: "workspaceData",
};

const localStorageUtils = {
	setItem(key, value) {
		try {
			if (value === null) {
				this.removeItem(key);
			} else {
				const serializedValue = JSON.stringify(value);
				localStorage.setItem(key, serializedValue);
			}
		} catch (error) {
			console.error(`Error saving to localStorage: ${error.message}`);
		}
	},

	getItem(key) {
		try {
			const serializedValue = localStorage.getItem(key);
			return serializedValue ? JSON.parse(serializedValue) : null;
		} catch (error) {
			console.error(
				`Error retrieving from localStorage: ${error.message}`
			);
			return null;
		}
	},

	removeItem(key) {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			console.error(`Error removing from localStorage: ${error.message}`);
		}
	},
};

export { localStorageUtils, StorageKeys };
