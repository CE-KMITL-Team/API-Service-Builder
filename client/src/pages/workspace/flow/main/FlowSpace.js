import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import FlowSpaceTest from "./FlowSpaceTest";
import FlowStartPopup from "./FlowStartPopup";
import FlowNode from "./nodes/FlowNode";
import FlowDrop from "./FlowDrop";
import FlowArrow from "./FlowArrow";
import LeaderLine from "react-leader-line";

function FlowSpace() {
	//setting popup
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const openPopup = () => {
		setIsPopupOpen(true);
	};

	const closePopup = () => {
		setIsPopupOpen(false);
	};

	//drop node
	const [droppedNodes, setDroppedNodes] = useState([
		{
			key: 0,
			name: "Start",
			type: "start",
			icon: icon({ name: "arrow-down", style: "solid" }),
			using: true,
		},
	]);

	const handleAddData = (updatedData) => {
		// Update the state of the owner component with the updated data

		setDroppedNodes(updatedData);
		console.log(droppedNodes);
	};

	const generateArrow = (startId, endId) => {
		new LeaderLine(
			document.getElementById(`FlowNode-${startId}`),
			document.getElementById(`FlowNode-${endId}`)
		);
	};

	return (
		<div className="container">
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

				{/* Main Flow Space */}
				<div className="space content-box flex-1 px-10 py-24 flex flex-col items-center overflow-auto">
					{/* Start Node */}

					{droppedNodes.map((element, index) => (
						<>
							<FlowNode
								key={element.id}
								id={element.id}
								name={element.name}
								type={element.type}
								icon={element.icon}
								using={true}
							>
								{/* arrow */}
								{element.type !== "condition" ? (
									<FlowArrow direction={"one-way"} />
								) : (
									<FlowArrow direction={"two-way"} />
								)}

								{/* drop guide */}
								{index === droppedNodes.length - 1 ? (
									element.type !== "condition" ? (
										<FlowDrop onDrop={handleAddData} />
									) : (
										<>
											{element.isTrue.length !== 0 ||
											element.isFalse.length !== 0 ? (
												<div className="drop-area flex justify-between gap-10">
													{element.isTrue.length !==
													0 ? (
														<NestestFlowNode
															mainWay={true}
															mainElement={
																element
															}
															handleAddData={
																handleAddData
															}
														/>
													) : (
														<FlowDrop
															appendCondi={{
																id: element.id,
																way: true,
															}}
															onDrop={
																handleAddData
															}
														/>
													)}
													{element.isFalse.length !==
													0 ? (
														<NestestFlowNode
															mainWay={false}
															mainElement={
																element
															}
															handleAddData={
																handleAddData
															}
														/>
													) : (
														<FlowDrop
															appendCondi={{
																id: element.id,
																way: false,
															}}
															onDrop={
																handleAddData
															}
														/>
													)}
												</div>
											) : (
												<div className="drop-area flex justify-between gap-10">
													<FlowDrop
														appendCondi={{
															id: element.id,
															way: true,
														}}
														onDrop={handleAddData}
													/>
													<FlowDrop
														appendCondi={{
															id: element.id,
															way: false,
														}}
														onDrop={handleAddData}
													/>
												</div>
											)}
										</>
									)
								) : (
									""
								)}
							</FlowNode>
						</>
					))}
				</div>

				<FlowSpaceTest />
			</div>
		</div>
	);
}

const NestestFlowNode = ({ mainWay, mainElement, handleAddData }) => {
	const fetchElement = mainWay ? mainElement.isTrue : mainElement.isFalse;

	return (
		<div className="help">
			{fetchElement.map((element, index) => (
				<FlowNode
					key={element.id}
					id={element.id}
					name={element.name}
					type={element.type}
					icon={element.icon}
					using={true}
				>
					{/* arrow */}
					{element.type !== "condition" ? (
						<FlowArrow direction={"one-way"} />
					) : (
						<FlowArrow direction={"two-way"} />
					)}

					{/* drop guide */}
					{index === fetchElement.length - 1 ? (
						element.type !== "condition" ? (
							<FlowDrop
								appendCondi={{
									id: mainElement.id,
									way: mainWay,
								}}
								onDrop={handleAddData}
							/>
						) : (
							<>
								{element.isTrue.length !== 0 ||
								element.isFalse.length !== 0 ? (
									<div className="drop-area flex justify-between gap-10">
										{element.isTrue.length !== 0 ? (
											<NestestFlowNode
												mainWay={true}
												mainElement={element}
												handleAddData={handleAddData}
											/>
										) : (
											<FlowDrop
												appendCondi={{
													id: element.id,
													way: true,
												}}
												onDrop={handleAddData}
											/>
										)}
										{element.isFalse.length !== 0 ? (
											<NestestFlowNode
												mainWay={false}
												mainElement={element}
												handleAddData={handleAddData}
											/>
										) : (
											<FlowDrop
												appendCondi={{
													id: element.id,
													way: false,
												}}
												onDrop={handleAddData}
											/>
										)}
									</div>
								) : (
									<div className="drop-area flex justify-between gap-10">
										<FlowDrop
											appendCondi={{
												id: element.id,
												way: true,
											}}
											onDrop={handleAddData}
										/>
										<FlowDrop
											appendCondi={{
												id: element.id,
												way: false,
											}}
											onDrop={handleAddData}
										/>
									</div>
								)}
							</>
						)
					) : (
						""
					)}
				</FlowNode>
			))}
		</div>
	);
};

{
	/* drop guide */
}
// {index === droppedNodes.length - 1 ? (
// 	data.type !== "condition" ? (
// 		<FlowDrop onDrop={setDroppedNodes} />
// 	) : (
// 		<div className="drop-area flex justify-between gap-10">
// 			<FlowDrop onDrop={setDroppedNodes} />
// 			<FlowDrop onDrop={setDroppedNodes} />
// 		</div>
// 	)
// ) : (
// 	""
// )}

export default FlowSpace;
