import Property_Base64_Settings from "./list/base64/Property_Base64_Settings";
import Property_Condition_Settings from "./list/condition/Property_Condition_Settings";
import Property_Count_Settings from "./list/count/Property_Count_Settings";
import Property_Join_Condition from "./list/join/Property_Join_Condition";
import Property_Join_Database from "./list/join/Property_Join_Database";
import Property_Join_Settings from "./list/join/Property_Join_Settings";
import Property_Model_Function from "./list/model/Property_Model_Function";
import Property_Model_Settings from "./list/model/Property_Model_Settings";
import Property_Request_Settings from "./list/request/Property_Request_Settings";
import Property_Request_Parameter from "./list/request/Property_Request_Parameter";
import Property_Return_Settings from "./list/return/Property_Return_Settings";

const FlowPropertyJson = [
	{
		node: "encode-base64",
		menu: {
			Settings: <Property_Base64_Settings></Property_Base64_Settings>,
		},
	},
	{
		node: "condition",
		menu: {
			Settings: (
				<Property_Condition_Settings></Property_Condition_Settings>
			),
		},
	},
	{
		node: "count",
		menu: {
			Settings: <Property_Count_Settings></Property_Count_Settings>,
		},
	},
	{
		node: "join",
		menu: {
			Settings: <Property_Join_Settings></Property_Join_Settings>,
			Condition: <Property_Join_Condition></Property_Join_Condition>,
			Database: <Property_Join_Database></Property_Join_Database>,
		},
	},
	{
		node: "database",
		menu: {
			Function: <Property_Model_Function></Property_Model_Function>,
			Settings: <Property_Model_Settings></Property_Model_Settings>,
		},
	},
	{
		node: "request",
		menu: {
			Setting: <Property_Request_Settings></Property_Request_Settings>,
			Parameter: (
				<Property_Request_Parameter></Property_Request_Parameter>
			),
		},
	},
	{
		node: "return-response",
		menu: {
			Settings: <Property_Return_Settings></Property_Return_Settings>,
		},
	},
];

export function getNodePropertyByName(nodeName = "") {
	return FlowPropertyJson.find((node) => node.node === nodeName);
}

export default FlowPropertyJson;
