import { createWorkspace, getWorkspaces } from "../services/workspaceService";
import userUtils from "../utils/userUtils";
import { endFetch, errorFetch, startFetch } from "./loadingActions";

//Create Workspace
export function fetchCreateWorkspace(project_name, template_id) {
  return async (dispatch, getState) => {
    try {
      dispatch(startFetch());

      const userID = userUtils.getID(getState);

      const data = await createWorkspace(userID, project_name, template_id);

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

//Get Workspace from user id
export function fetchGetWorkspace() {
  return async (dispatch, getState) => {
    try {
      dispatch(startFetch());

      const userID = userUtils.getID(getState);

      const data = await getWorkspaces(userID);
      console.log(data);
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
