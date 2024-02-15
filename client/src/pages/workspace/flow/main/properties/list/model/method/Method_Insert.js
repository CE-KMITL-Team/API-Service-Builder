import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProperty } from "../../../../../../../../actions/flowActions";
import InputText from "../../../inputs/InputText";

const defaultColumns = ["id", "Firstname", "Lastname", "Password"];

export default function Method_Insert({columnList}) {
	const dispatch = useDispatch();

	const nodeStore = useSelector((state) => state.focusNode.flowProperty);
	const currentID = useSelector(
		(state) => state.focusNode?.currentNode?.id ?? 0
	);

	// Columns for Insert
	const [columns, setColumns] = useState(
		defaultColumns.reduce((obj, columnName) => {
			obj[columnName.toLowerCase()] = columnName;
			return obj;
		}, {})
	);
	useEffect(() => {
		dispatch(saveProperty({ insertColumns: columns }));
	}, [columns]);

	// Load Default Data
	useEffect(() => {
		const { insertColumns } = nodeStore[currentID]?.property || {};
		setColumns(
			insertColumns ??
				defaultColumns.reduce((obj, columnName) => {
					obj[columnName.toLowerCase()] = columnName;
					return obj;
				}, {})
		);
	}, [currentID]);

	return (
		<>
			<div className="title text-lg text-primary-900 font-bold">
				Insert Column
			</div>
			{Object.entries(columns).map(
				([columnName, defaultValue], index) => (
					<InputText
						key={index}
						description={
							<div className="font-bold">{columnName}</div>
						}
						placeholder="value"
						defaultValue={defaultValue}
						controller={(value) => {
							setColumns((prevColumns) => ({
								...prevColumns,
								[columnName]: value,
							}));
						}}
						underline={index !== Object.keys(columns).length - 1}
					></InputText>
				)
			)}
		</>
	);
}
