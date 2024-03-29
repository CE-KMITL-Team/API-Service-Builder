import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProperty } from "../../../../../../../../actions/flowActions";
import InputText from "../../../inputs/InputText";

export default function Method_Insert({ columnList }) {
	const dispatch = useDispatch();

	const nodeStore = useSelector((state) => state.focusNode.flowProperty);
	const currentID = useSelector(
		(state) => state.focusNode?.currentNode?.id ?? 0
	);

	// Columns for Insert
	const [columns, setColumns] = useState({});

	useEffect(() => {
		const { insertColumns } = nodeStore[currentID]?.property || {};
		setColumns(
			insertColumns ??
				columnList.reduce((obj, column) => {
					const { name, default_value } = column;
					obj[name.toLowerCase()] = `${default_value}`;
					return obj;
				}, {})
		);
	}, [currentID, columnList]);

	useEffect(() => {
		dispatch(saveProperty({ insertColumns: columns }));
	}, [columns, dispatch]);

	return (
		<>
			<div className="title text-lg text-primary-900 font-bold">
				Insert Column
			</div>
			{Object.entries(columnList).map(
				([columnIndex, columnInfo], index) => {
					const columnName =
						columnList[columnIndex].name.toLowerCase();

					if (columnName === "id") {
						return "";
					}

					const loadDefault = nodeStore[currentID]?.property
						?.insertColumns
						? nodeStore[currentID].property.insertColumns[
								columnName
						  ]
							? nodeStore[currentID].property.insertColumns[
									columnName
							  ]
							: ""
						: "";
					return (
						<InputText
							key={index}
							description={
								<div className="font-bold">{columnName}</div>
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
								index !== Object.keys(columnList).length - 1
							}
						></InputText>
					);
				}
			)}
		</>
	);
}
