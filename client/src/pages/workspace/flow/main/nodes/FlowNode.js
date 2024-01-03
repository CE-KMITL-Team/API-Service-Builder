import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function FlowNode({ name, icon }) {
	return (
		<div className="rounded-md bg-white text-black flex items-center p-2 px-3 border border-gray-400 cursor-pointer">
			<FontAwesomeIcon icon={icon} className="mr-3 w-4"/>
			<span>{name}</span>
		</div>
	);
}

export default FlowNode;
