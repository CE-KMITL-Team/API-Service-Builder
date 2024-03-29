import { StorageKeys, localStorageUtils } from "./localStorage";

const modelUtils = {
  setCurrent: (modelData) => {
    localStorageUtils.setItem(StorageKeys.MODEL_CURRENT, modelData);
  },
  getCurrent: () =>
    localStorageUtils.getItem(StorageKeys.MODEL_CURRENT) ?? null,
  getCurrentID: () =>
    localStorageUtils.getItem(StorageKeys.MODEL_CURRENT).id ?? null,
  getCurrentName: () =>
    localStorageUtils.getItem(StorageKeys.MODEL_CURRENT).name ?? "",
  getCurrentDescription: () =>
    localStorageUtils.getItem(StorageKeys.MODEL_CURRENT).description ?? "",
};

export default modelUtils;
