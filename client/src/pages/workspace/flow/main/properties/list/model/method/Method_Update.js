import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProperty } from "../../../../../../../../actions/flowActions";
import { Tab } from "@headlessui/react";
import InputCondition from "../../../inputs/InputCondition";
import InputText from "../../../inputs/InputText";

export default function Method_Update({ columnList }) {
	const dispatch = useDispatch();

	const nodeStore = useSelector((state) => state.focusNode.flowProperty);
	const currentID = useSelector(
		(state) => state.focusNode?.currentNode?.id ?? 0
	);

	// Input for Conditions
	const [conditions, setConditions] = useState([]);
	useEffect(() => {
		dispatch(saveProperty({ updateConditions: conditions }));
	}, [conditions]);

	// Input for Update Column
	const [columns, setColumns] = useState({});
	useEffect(() => {
		dispatch(saveProperty({ updateColumns: columns }));
	}, [columns]);

	// Load Default Data
	useEffect(() => {
		const { updateColumns, updateConditions } =
			nodeStore[currentID]?.property || {};

		setColumns(
			updateColumns ??
				columnList.reduce((obj, column) => {
					const { name, default_value } = column;
					obj[name.toLowerCase()] = `${default_value}`;
					return obj;
				}, {})
		);

		setConditions(updateConditions || []);
	}, [currentID, columnList]);

	// Save Default Property
	useEffect(() => {
		dispatch(saveProperty({ updateConditions: conditions }));
		dispatch(saveProperty({ updateColumns: columns }));
	}, [conditions, columns, dispatch]);

	return (
		<>
			<Tab.Group>
				<Tab.List
					className={({ selected }) => {
						return `flex font-bold text-lg mb-3 w-full justify-between`;
					}}
				>
					{["Data", "Condition"].map((key) => (
						<Tab
							key={key}
							className={({ selected }) => {
								return `${
									selected
										? "text-black flex-1 border-t-2 border-x-2 border-gray-400/30 rounded-t-md"
										: "text-gray-600/40 bg-gray-400/30 p-3 flex-1 scale-90 translate-y-1 rounded-t-md"
								}`;
							}}
						>
							{key}
						</Tab>
					))}
				</Tab.List>
				<Tab.Panels>
					{/* Data Panel */}
					<Tab.Panel>
						<>
							<div className="title text-lg text-primary-900 font-bold">
								Update Column
							</div>
							{Object.entries(columnList).map(
								([columnIndex, columnInfo], index) => {
									const columnName =
										columnList[
											columnIndex
										].name.toLowerCase();

									if (columnName === "id") {
										return "";
									}

									const loadDefault = nodeStore[currentID]
										?.property?.updateColumns
										? nodeStore[currentID].property
												.updateColumns[columnName]
											? nodeStore[currentID].property
													.updateColumns[columnName]
											: ""
										: "";

									return (
										<InputText
											key={index}
											description={
												<div className="font-bold">
													{columnName}
												</div>
											}
											placeholder="value"
											defaultValue={loadDefault}
											controller={(value) => {
												setColumns((prevColumns) => ({
													...prevColumns,
													[columnName]: value,
												}));
											}}
											underline={
												index !==
												Object.keys(columnList).length -
													1
											}
										></InputText>
									);
								}
							)}
						</>
					</Tab.Panel>

					{/* Condition Panel */}
					<Tab.Panel>
						<InputCondition
							title="Update Condition"
							controller={setConditions}
							defaultValue={conditions}
						></InputCondition>
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</>
	);
}
