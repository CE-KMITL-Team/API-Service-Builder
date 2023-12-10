import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function FlowSpace() {
	return (
		<div className="p-5 h-screen relative">
			<div className="action flex flex-col gap-y-3 justify-end items-end absolute right-8">
				<div className="tools cursor-pointer text-gray-500 flex items-center gap-x-3 hover:text-primary-700 hover:scale-110 duration-100">
					<FontAwesomeIcon
						icon={icon({
							name: "save",
							style: "solid",
						})}
						className="scale-125"
					/>
					<div className="text">Save</div>
				</div>
				<div className="tools cursor-pointer text-gray-500 flex items-center gap-x-3 hover:text-primary-700 hover:scale-110 duration-100">
					<FontAwesomeIcon
						icon={icon({
							name: "cog",
							style: "solid",
						})}
						className="scale-125"
					/>
					<div className="text">Settings</div>
				</div>
			</div>
		</div>
	);
}

export default FlowSpace;
