import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import FlowNode from "./FlowNode";
import nodeListJson from "./FlowNodeJson";
import { fetchGetModelWorkspace } from "../../../../../actions/modelActions";
import { useDispatch } from "react-redux";
import workspaceUtils from "../../../../../utils/workspaceUtils";
import { useLocation } from "react-router-dom";

function FlowNodeFrame() {
	const [nodeList, setNodeList] = useState(nodeListJson);

	const [isResized, setIsResized] = useState(false);
	const [isHidden, setIsHidden] = useState(false);
	const [visibleList, setVisibleList] = useState(() =>
		nodeList.map(() => true)
	);

	const handleResizeClick = () => {
		setTimeout(() => {
			setIsHidden(!isHidden);
		}, 100);

		setIsResized(!isResized);
	};

	const toggleListVisibility = (index) => {
		setVisibleList((prevVisibleList) =>
			prevVisibleList.map((value, i) => (i === index ? !value : value))
		);
	};

	const dispatch = useDispatch();
	async function initState() {
		const data = await dispatch(
			fetchGetModelWorkspace(workspaceUtils.getID())
		);
		if (data.status === true) {
			const modelList = data.data.map((inputJson) => ({
				name: inputJson.name,
				type: "default",
				ref: "database",
				model: inputJson.name.toLowerCase(),
				icon: icon({ name: "database", style: "solid" }),
			}));

			const updatedNodeList = nodeList.map((section) => {
				if (section.head === "Model") {
					return {
						...section,
						nodes: [section.nodes[0], ...modelList],
					};
				}
				return section;
			});

			setNodeList(updatedNodeList);
		} else {
			setNodeList([]);
		}
	}

	const location = useLocation();
	useEffect(() => {
		initState();
	}, [location]);

	return (
		<div
			className={`h-screen bg-grey text-white pt-4 px-${
				isResized ? "0" : "6"
			} w-${
				isResized ? "5" : "72"
			} relative transition-all duration-300 ease-in-out`}
		>
			<div
				className="resize-btn z-10 cursor-pointer absolute w-2 rounded-r-lg h-fit bg-primary-700 hover:bg-primary-900 px-2 py-3 flex items-center justify-center -right-4 top-1/2 -translate-y-1/2"
				onClick={handleResizeClick}
			>
				<FontAwesomeIcon
					icon={icon({
						name: "caret-left",
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
			>
				{nodeList.map((group, index) => (
					<div key={group.head} className="group">
						<div
							className="title flex text-black items-center justify-between cursor-pointer rounded-t py-2 border-b border-b-gray-400 hover:bg-gray-300"
							onClick={() => toggleListVisibility(index)}
						>
							<div className="text-lg font-bold">
								{group.head}
							</div>
							<div className="px-2 text-gray-600">
								{/* Adjust your caret icon based on visibility */}
								<FontAwesomeIcon
									icon={icon({
										name: "caret-down",
										style: "solid",
									})}
									className={
										visibleList[index]
											? "duration-100"
											: "rotate-180 duration-100"
									}
								/>
							</div>
						</div>
						<div
							className={`list flex flex-col gap-y-3 mt-3 transition-all ${
								visibleList[index]
									? "max-h-screen opacity-100"
									: "max-h-0 opacity-0"
							} overflow-hidden`}
						>
							{group.nodes.map((node, nodeIndex) => (
								<FlowNode
									key={nodeIndex}
									name={node.name}
									reference={node.ref}
									type={node.type}
									icon={node.icon}
									model={node?.model ?? ""}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default FlowNodeFrame;
