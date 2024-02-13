import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function MyAPICard({ data }) {
	return (
		<div className="bg-dark text-white w-full rounded-lg p-3 px-5 flex justify-between">
			<div className="detail flex gap-x-7">
				<div className="path font-bold">{data.API}</div>
				<div className="path text-gray-400">{data.description}</div>
			</div>
			<div className="tools cursor-pointer text-primary-900 flex items-center gap-x-5 hover:text-primary-700 hover:scale-110 duration-100">
				<div className="text">Options</div>
				<FontAwesomeIcon
					icon={icon({ name: "ellipsis-vertical", style: "solid" })}
					className="scale-125"
				/>
			</div>
		</div>
	);
}

export default MyAPICard;
