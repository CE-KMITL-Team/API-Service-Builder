import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProperty } from "../../../../../../../actions/flowActions"; // Replace with your actual path
import InputText from "../../inputs/InputText";

const defaultValue_output = "$queryData";

export default function Property_Model_Settings() {
	const dispatch = useDispatch();

	const nodeStore = useSelector((state) => state.focusNode.flowProperty);
	const currentID = useSelector(
		(state) => state.focusNode?.currentNode?.id ?? 0
	);

	// Input for Output
	const [output, setOutput] = useState(defaultValue_output);
	useEffect(() => {
		dispatch(saveProperty({ output }));
	}, [output]);

	// Load Default Data
	useEffect(() => {
		const { output } = nodeStore[currentID]?.property || {};
		setOutput(output ?? defaultValue_output);
	}, [currentID]);

	return (
		<>
			{/* InputText for Output */}
			<InputText
				title="Output"
				description="Query Data"
				placeholder="variable"
				defaultValue={output}
				controller={setOutput}
				underline={true}
			></InputText>
		</>
	);
}
