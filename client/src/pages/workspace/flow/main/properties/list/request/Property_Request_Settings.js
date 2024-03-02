import React, { useEffect, useState } from "react";
import InputText from "../../inputs/InputText";
import { useDispatch, useSelector } from "react-redux";
import { saveProperty } from "../../../../../../../actions/flowActions";

const defaultValue_output = "$response";

export default function Property_Request_Settings() {
	const dispatch = useDispatch();

	const nodeStore = useSelector((state) => state.focusNode.flowProperty);

	const [output, setOutput] = useState(defaultValue_output);
	useEffect(() => {
		dispatch(saveProperty({ output: output }));
	}, [output]);

	// Load Default Data
	useEffect(() => {
		const { output } = nodeStore["node_0"]?.property || {};
		setOutput(output ?? defaultValue_output);
	}, []);

	// Save Default Property
	useEffect(() => {
		dispatch(saveProperty({ output: output }));
	}, []);

	return (
		<>
			<InputText
				title="Output"
				description="Response Value"
				placeholder="variable"
				defaultValue={output}
				controller={setOutput}
				underline={true}
			></InputText>
		</>
	);
}
