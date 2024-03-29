import { apiMap } from "../utils/apiPath";
import userUtils from "../utils/userUtils";
import workspaceUtils from "../utils/workspaceUtils";
import api from "./apiInstance";

export function addFlow(
  name,
  description,
  API,
  markdown,
  status,
  workspace_id
) {
  return api
    .post(apiMap.ADD_FLOW, {
      name: name,
      description: description,
      API: API,
      markdown: markdown,
      status: status,
      workspace_id: workspace_id,
    })
    .then((response) => {
      return response;
    });
}

export function getFlowDetailByName(flowName) {
  return api
    .get(apiMap.GET_FLOW_DETAIL_BY_ID, {
      params: { flow_name: flowName },
    })
    .then((response) => {
      return response;
    });
}

export function getFlows(workspaceid) {
  return api
    .get(apiMap.GET_FLOW, {
      params: { workspaceid: workspaceid },
    })
    .then((response) => {
      return response;
    });
}

export function deleteFlows(workspace_id, flow_id) {
  return api
    .delete(apiMap.DELETE_FLOW, {
      data: {
        workspace_id: workspace_id,
        flow_id: flow_id,
        user_id: userUtils.getID(),
        workspace_name: workspaceUtils.getName(),
      },
    })
    .then((response) => {
      return response;
    });
}

export function editDataFlows(id, columns) {
  return api
    .put(apiMap.EDIT_DATA_FLOWs, { id: id, columns: columns })
    .then((response) => {
      return response;
    });
}
export function saveFlowMarkdown(flow_name, markdown) {
  return api
    .post(apiMap.SAVE_MARKDOWN, {
      flow_name: flow_name,
      markdown: JSON.stringify(markdown),
      user_id: userUtils.getID(),
      workspace_name: workspaceUtils.getName(),
      workspace_id: workspaceUtils.getID(),
    })
    .then((response) => {
      return response;
    });
}

export function getFlowMarkdownByName(flow_name) {
  return api
    .get(apiMap.GET_MARKDOWN_BY_NAME, {
      params: { flow_name: flow_name },
    })
    .then((response) => {
      return response;
    });
}
