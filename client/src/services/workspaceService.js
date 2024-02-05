import api from "./apiInstance";
import { apiMap } from "../utils/apiPath";

export function createWorkspace(owner_id, name, template_id) {
  return api
    .post(apiMap.CREATE_WORKSPACES, {
      user_id: owner_id,
      project_name: name,
      template_id: template_id,
    })
    .then((response) => {
      return response;
    });
}

export function getTemplates() {
  return api.get(apiMap.GET_TEMPLATES).then((response) => {
    return response.templates;
  });
}

export function getWorkspaces(userid) {
  return api
    .get(apiMap.GET_WORKSPACES, { params: { userid: userid } })
    .then((response) => {
      return response.workspaces;
    });
}
