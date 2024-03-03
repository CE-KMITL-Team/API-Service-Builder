import {
  createModel,
  getModelWorkspace,
  getModelDetail,
  deleteModel,
  editModel,
  getModelDetailByName,
} from "../services/modelsService";
import { endFetch, errorFetch, startFetch } from "./loadingActions";

export function fetchCreateModel(
  workspace_id,
  name,
  description,
  columns,
  generateAPI
) {
  return async (dispatch) => {
    try {
      dispatch(startFetch());

      const data = await createModel(
        workspace_id,
        name,
        description,
        columns,
        generateAPI
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

export function fetchGetModelByName(model_name, workspace_id) {
  return async (dispatch) => {
    try {
      dispatch(startFetch());

      const data = await getModelDetailByName(model_name, workspace_id);

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

export function fetchDeleteModel(workspace_id, model_id) {
  return async (dispatch) => {
    try {
      dispatch(startFetch());

      const data = await deleteModel(workspace_id, model_id);

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
export function fetchEditModel(
  workspace_id,
  model_name,
  model_desc,
  model_id,
  field_list
) {
  return async (dispatch) => {
    try {
      dispatch(startFetch());

      const data = await editModel(
        workspace_id,
        model_name,
        model_desc,
        model_id,
        field_list
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
