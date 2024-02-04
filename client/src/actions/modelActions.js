import { createModel } from "../services/modelsService";
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
