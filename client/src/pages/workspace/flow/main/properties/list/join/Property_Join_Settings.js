import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../inputs/InputText";
import { saveProperty } from "../../../../../../../actions/flowActions";

const defaultValue_resultTable = "$joinTable";

export default function Property_Join_Settings() {
	const dispatch = useDispatch();

	const nodeStore = useSelector((state) => state.focusNode.flowProperty);
	const currentID = useSelector(
		(state) => state.focusNode?.currentNode?.id ?? 0
	);

	// Input for Result Table
	const [resultTable, setResultTable] = useState(defaultValue_resultTable);
	useEffect(() => {
		dispatch(saveProperty({ resultTable }));
	}, [resultTable]);

	// Load Default Data
	useEffect(() => {
		const { resultTable } = nodeStore[currentID]?.property || {};
		setResultTable(resultTable ?? defaultValue_resultTable);
	}, [currentID]);

	// Save Default Property
	useEffect(() => {
		dispatch(saveProperty({ resultTable }));
	}, []);

	return (
		<>
			{/* InputText for Result Table */}
			<InputText
				title="Result table"
				description="Result table from join"
				placeholder="variable"
				defaultValue={resultTable}
				controller={setResultTable}
			></InputText>
		</>
	);
}
