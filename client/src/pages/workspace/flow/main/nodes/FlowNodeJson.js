import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const nodeListJson = [
	{
		head: "Node",
		nodes: [
			{
				name: "Condition",
				type: "condition",
				ref: "condition",
				icon: icon({ name: "cog", style: "solid" }),
			},
			{
				name: "Count",
				type: "default",
				ref: "count",
				icon: icon({ name: "sort-numeric-up", style: "solid" }),
			},
			{
				name: "Encode Base64",
				type: "default",
				ref: "encode-base64",
				icon: icon({ name: "file-code", style: "solid" }),
			},
			{
				name: "Return Response",
				type: "output",
				ref: "return-response",
				icon: icon({ name: "reply", style: "solid" }),
			},
		],
	},
	{
		head: "Model",
		nodes: [
			{
				name: "Join",
				type: "default",
				ref: "join",
				icon: icon({ name: "link", style: "solid" }),
			},
			{
				name: "User",
				type: "default",
				ref: "database",
				icon: icon({ name: "database", style: "solid" }),
			},
			{
				name: "Book",
				type: "default",
				ref: "database",
				icon: icon({ name: "database", style: "solid" }),
			},
			{
				name: "Category",
				type: "default",
				ref: "database",
				icon: icon({ name: "database", style: "solid" }),
			},
		],
	},
];

export default nodeListJson;
