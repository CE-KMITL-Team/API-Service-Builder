import {
  getDataModels,
  addDataModels,
  editDataModels,
  deleteDataModels,
} from "../services/dataModelService";
import { endFetch, errorFetch, startFetch } from "./loadingActions";

export function fetchGetDataModels(modelID) {
  return async (dispatch) => {
    try {
      dispatch(startFetch());

      const data = await getDataModels(modelID);

      if (data) {
        dispatch(endFetch());
        dispatch(errorFetch(null));

        return Promise.resolve(data);
      }
    } catch (error) {
      console.log(error);
      dispatch(errorFetch(error));

      return Promise.resolve(false);
    }
  };
}

export function fetchAddDataModels(modelID, columns) {
  return async (dispatch) => {
    try {
      dispatch(startFetch());

      const data = await addDataModels(modelID, columns);

      if (data) {
        dispatch(endFetch());
        dispatch(errorFetch(null));

        return Promise.resolve(data);
      }
    } catch (error) {
      console.log(error);
      dispatch(errorFetch(error));

      return Promise.resolve(false);
    }
  };
}

export function fetchEditDataModels(modelID, columns) {
  return async (dispatch) => {
    try {
      dispatch(startFetch());

      const data = await editDataModels(modelID, columns);

      if (data) {
        dispatch(endFetch());
        dispatch(errorFetch(null));

        return Promise.resolve(data);
      }
    } catch (error) {
      console.log(error);
      dispatch(errorFetch(error));

      return Promise.resolve(false);
    }
  };
}

export function fetchDeleteDataModels(modelID, id) {
  return async (dispatch) => {
    try {
      dispatch(startFetch());

      const data = await deleteDataModels(modelID, id);

      if (data) {
        dispatch(endFetch());
        dispatch(errorFetch(null));

        return Promise.resolve(data);
      }
    } catch (error) {
      console.log(error);
      dispatch(errorFetch(error));

      return Promise.resolve(false);
    }
  };
}
