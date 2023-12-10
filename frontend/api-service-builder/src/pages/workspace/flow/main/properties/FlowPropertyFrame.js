import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function FlowPropertyFrame() {
	const [isResized, setIsResized] = useState(false);
	const [isHidden, setIsHidden] = useState(false);

	const handleResizeClick = () => {
		if (!isResized) {
			setIsHidden(!isHidden);
		}
		setIsResized(!isResized);
	};

	const handleTransitionEnd = () => {
		if (isResized) {
			setIsHidden(!isHidden);
		}
	};

	return (
		<div
			className={`h-screen bg-grey text-white pt-6 px-${
				isResized ? "0" : "6"
			} w-${
				isResized ? "5" : "72"
			} relative transition-all duration-300 ease-in-out`}
		>
			<div
				className="resize-btn cursor-pointer absolute w-2 rounded-l-lg h-fit bg-primary-700 hover:bg-primary-900 px-2 py-3 flex items-center justify-center -left-4 top-1/2 -translate-y-1/2"
				onClick={handleResizeClick}
				onTransitionEnd={handleTransitionEnd}
			>
				<FontAwesomeIcon
					icon={icon({
						name: "caret-right",
						style: "solid",
					})}
					className={`transition-all duration-300 ease-in-out scale-125 ${
						isResized ? "rotate-180" : ""
					}`}
				/>
			</div>
			<div
				className={`transition-all duration-300 ease-in-out flex flex-col gap-y-6 ${
					isResized ? "opacity-0" : "opacity-1"
				} ${isHidden ? "hidden" : ""}`}
			></div>
		</div>
	);
}

export default FlowPropertyFrame;
