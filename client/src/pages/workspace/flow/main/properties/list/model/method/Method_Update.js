import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProperty } from "../../../../../../../../actions/flowActions";
import { Tab } from "@headlessui/react";
import InputCondition from "../../../inputs/InputCondition";
import InputText from "../../../inputs/InputText";

const defaultColumns = ["id", "Firstname", "Lastname", "Password"];
const defaultValueConditions = [];

export default function Method_Update({columnList}) {
	const dispatch = useDispatch();

	const nodeStore = useSelector((state) => state.focusNode.flowProperty);
	const currentID = useSelector(
		(state) => state.focusNode?.currentNode?.id ?? 0
	);

	// Input for Conditions
	const [conditions, setConditions] = useState(defaultValueConditions);
	useEffect(() => {
		dispatch(saveProperty({ updateConditions: conditions }));
	}, [conditions]);

	// Input for Update Column
	const [columns, setColumns] = useState(
		defaultColumns.reduce((obj, columnName) => {
			obj[columnName.toLowerCase()] = `$${columnName}`;
			return obj;
		}, {})
	);
	useEffect(() => {
		dispatch(saveProperty({ updateColumns: columns }));
	}, [columns]);

	// Load Default Data
	useEffect(() => {
		const { updateColumns, updateConditions } =
			nodeStore[currentID]?.property || {};
		setColumns(
			updateColumns ??
				defaultColumns.reduce((obj, columnName) => {
					obj[columnName.toLowerCase()] = `$${columnName}`;
					return obj;
				}, {})
		);
		setConditions(updateConditions || defaultValueConditions);
	}, [currentID]);

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
							{Object.entries(columns).map(
								([columnName, defaultValue], index) => (
									<InputText
										key={index}
										description={
											<div className="font-bold">
												{columnName}
											</div>
										}
										placeholder="value"
										defaultValue={defaultValue}
										controller={(value) => {
											setColumns((prevColumns) => ({
												...prevColumns,
												[columnName]: value,
											}));
										}}
										underline={
											index !==
											Object.keys(columns).length - 1
										}
									></InputText>
								)
							)}
						</>
					</Tab.Panel>

					{/* Conditon Panel */}
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
