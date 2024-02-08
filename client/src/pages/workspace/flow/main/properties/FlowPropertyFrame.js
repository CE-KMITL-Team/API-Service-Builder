import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { getNodePropertyByName } from "./FlowPropertyJson";
import { useSelector } from "react-redux";

function FlowPropertyFrame() {
	const currentNode = useSelector((state) => state.focusNode.currentNode);

	const nodeProperty = getNodePropertyByName(currentNode?.type || "");
	const NodeList = nodeProperty !== undefined ? [nodeProperty] : [];

	const [isResized, setIsResized] = useState(false);
	const [isHidden, setIsHidden] = useState(false);

	const handleResizeClick = () => {
		setTimeout(() => {
			setIsHidden(!isHidden);
		}, 100);

		setIsResized(!isResized);
	};

	return (
		<div
			className={`h-screen bg-grey text-white pt-6 px-${
				isResized ? "0" : "6"
			} w-${
				isResized ? "5" : "96"
			} relative transition-all duration-300 ease-in-out overflow-auto`}
		>
			<div
				className={`transition-all duration-300 ease-in-out flex flex-col overflow-auto text-dark ${
					isResized ? "opacity-0" : "opacity-1"
				} ${isHidden ? "hidden" : ""}`}
			>
				{/* Content */}
				{NodeList.map((item, index) => (
					<Tab.Group key={index}>
						<Tab.List
							className={({ selected }) => {
								return `flex justify-evenly font-bold text-lg mb-3`;
							}}
						>
							{Object.keys(item.menu).map((key) => (
								<Tab
									key={key}
									className={({ selected }) => {
										return `${
											selected
												? "text-black"
												: "text-gray-400 scale-95"
										}`;
									}}
								>
									{key}
								</Tab>
							))}
						</Tab.List>
						<hr className="w-full border-gray-400 my-0 py-0" />
						<Tab.Panels>
							{Object.values(item.menu).map((data, dataIndex) => (
								<Tab.Panel key={dataIndex}>{data}</Tab.Panel>
							))}
						</Tab.Panels>
					</Tab.Group>
				))}
			</div>
		</div>
	);
}

export default FlowPropertyFrame;
