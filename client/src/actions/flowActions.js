export const FOCUS_NODE = "FOCUS_NODE";

export const saveFocusNode = (jsonData) => ({
	type: FOCUS_NODE,
	payload: jsonData,
});
