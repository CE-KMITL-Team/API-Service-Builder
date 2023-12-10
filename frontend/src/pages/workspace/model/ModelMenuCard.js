import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ModelMenuCard({ data }) {
	return (
		<div className="card text-black flex items-center cursor-pointer">
			<div className="group flex-1">
				<div className="group-hover:text-primary-900">
					<div className="title text-lg font-bold leading-5">
						{data.name}
					</div>
					<div className="title text-md text-gray-600 group-hover:text-primary-800">
						{data.description}
					</div>
				</div>
			</div>
			<div className="p-3 justify-center cursor-pointer text-primary-900 flex items-center gap-x-5 hover:text-primary-700 hover:scale-125 duration-100">
				<FontAwesomeIcon
					icon={icon({
						name: "ellipsis-vertical",
						style: "solid",
					})}
					className="scale-105"
				/>
			</div>
		</div>
	);
}

export default ModelMenuCard;
