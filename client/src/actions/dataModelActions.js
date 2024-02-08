import { getDataModels } from "../services/dataModelService";
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
