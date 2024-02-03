import React, { useState } from "react";
import FlowStartPopup from "./FlowStartPopup";
import FlowNodeFrame from "./nodes/FlowNodeFrame";
import FlowSpace from "./FlowSpace";
import FlowPropertyFrame from "./properties/FlowPropertyFrame";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function FlowMain() {
	const [isPopupOpen, setIsPopupOpen] = useState(true);

	const closePopup = () => {
		setIsPopupOpen(false);
	};

	return (
		<DndProvider backend={HTML5Backend}>
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
		</DndProvider>
	);
}

export default FlowMain;
