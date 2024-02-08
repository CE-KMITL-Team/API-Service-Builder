import {
  createModel,
  getModelWorkspace,
  getModelDetail,
} from "../services/modelsService";
import { endFetch, errorFetch, startFetch } from "./loadingActions";

export function fetchCreateModel(
  workspace_id,
  model_name,
  model_type,
  model_description
) {
  return async (dispatch) => {
    try {
      dispatch(startFetch());

      const data = await createModel(
        workspace_id,
        model_name,
        model_type,
        model_description
      );

      if (data) {
        dispatch(endFetch());
        dispatch(errorFetch(null));

        return Promise.resolve(data);
      }
    } catch (error) {
      dispatch(errorFetch(error));

      return Promise.resolve(false);
    }
  };
}

export function fetchGetModelWorkspace(workspace_id) {
  return async (dispatch) => {
    try {
      dispatch(startFetch());

      const data = await getModelWorkspace(workspace_id);
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

export function fetchGetModelDetail(model_id) {
  return async (dispatch) => {
    try {
      dispatch(startFetch());

      const data = await getModelDetail(model_id);

      if (data) {
        dispatch(endFetch());
        dispatch(errorFetch(null));

        return Promise.resolve(data);
      }
    } catch (error) {
      dispatch(errorFetch(error));

      return Promise.resolve(false);
    }
  };
}
