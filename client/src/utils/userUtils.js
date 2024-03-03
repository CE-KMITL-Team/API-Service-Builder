import { StorageKeys, localStorageUtils } from "./localStorage";

const userUtils = {
  getID: function (state = null) {
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

  getFirstname: function (state = null) {
    try {
      return (
        state?.auth?.userData?.firstname ||
        localStorageUtils.getItem(StorageKeys.USER_DATA).firstname
      );
    } catch (error) {
      console.log(`Get firstname error: ${error}`);
      return "";
    }
  },

  getLastname: function (state = null) {
    try {
      return (
        state?.auth?.userData?.lastname ||
        localStorageUtils.getItem(StorageKeys.USER_DATA).lastname
      );
    } catch (error) {
      console.log(`Get lastname error: ${error}`);
      return "";
    }
  },

  getEmail: function (state = null) {
    try {
      return (
        state?.auth?.userData?.email ||
        localStorageUtils.getItem(StorageKeys.USER_DATA).email
      );
    } catch (error) {
      console.log(`Get email error: ${error}`);
      return "";
    }
  },

  getFullName: function (state = null) {
    return `${this.getFirstname(state)} ${this.getLastname(state)}`;
  },

  getApiKey: function (state = null) {
    try {
      return (
        state?.auth?.userData?.api_key ||
        localStorageUtils.getItem(StorageKeys.USER_DATA).api_key
      );
    } catch (error) {
      console.log(`Get api_key error: ${error}`);
      return "";
    }
  },

  logout: () => {
    localStorageUtils.removeItem(StorageKeys.USER_DATA);
    localStorageUtils.removeItem(StorageKeys.WORKSPACE_DATA);
  },
};

export default userUtils;
