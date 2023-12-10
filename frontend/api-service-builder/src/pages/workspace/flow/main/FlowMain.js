import React, { useState } from "react";
import FlowStartPopup from "./FlowStartPopup";
import FlowNodeFrame from "./nodes/FlowNodeFrame";
import FlowSpace from "./FlowSpace";
import FlowPropertyFrame from "./properties/FlowPropertyFrame";

function FlowMain() {
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
			<div className="flex w-full">
				<div>
					<FlowNodeFrame />
				</div>
				<div className="flex-1">
					<FlowSpace />
				</div>
				<div>
					<FlowPropertyFrame />
				</div>
			</div>
		</>
	);
}

export default FlowMain;
