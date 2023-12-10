import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import FlowSpaceTest from "./FlowSpaceTest";
import FlowStartPopup from "./FlowStartPopup";

function FlowSpace() {
	const [isPopupOpen, setIsPopupOpen] = useState(true);

	const openPopup = () => {
		setIsPopupOpen(true);
	};

	const closePopup = () => {
		setIsPopupOpen(false);
	};

	return (
		<>
			<FlowStartPopup isOpen={isPopupOpen} onRequestClose={closePopup} />
			<div className="h-screen relative flex flex-col">
				<div className="action flex flex-col gap-y-4 justify-end items-end absolute right-8 top-5">
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
					<div
						className="tools cursor-pointer text-gray-500 flex items-center gap-x-3 hover:text-primary-700 hover:scale-110 duration-100"
						onClick={openPopup}
					>
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

				<div className="space flex-1"></div>
				<FlowSpaceTest />
			</div>
		</>
	);
}

export default FlowSpace;
