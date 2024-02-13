import React, { useEffect, useState } from "react";
import InputText from "../../inputs/InputText";
import InputSelect from "../../inputs/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { saveProperty } from "../../../../../../../actions/flowActions";

const defaultValue_type = "Encode";
const defaultValue_encodeField = "Request.name";
const defaultValue_outputVariable = "$imageBase64";

export default function Property_Base64_Settings() {
	const dispatch = useDispatch();

	const nodeStore = useSelector((state) => state.focusNode.flowProperty);
	const currentID = useSelector(
		(state) => state.focusNode?.currentNode?.id ?? 0
	);

	// Input for Type
	const [type, setType] = useState(defaultValue_type);
	useEffect(() => {
		dispatch(saveProperty({ type }));
	}, [type]);

	// Input for Encode Field
	const [encodeField, setEncodeField] = useState(defaultValue_encodeField);
	useEffect(() => {
		dispatch(saveProperty({ encodeField }));
	}, [encodeField]);

	// Input for Output Variable
	const [outputVariable, setOutputVariable] = useState(
		defaultValue_outputVariable
	);
	useEffect(() => {
		dispatch(saveProperty({ outputVariable }));
	}, [outputVariable]);

	// Load Default Data
	useEffect(() => {
		const { type, encodeField, outputVariable } =
			nodeStore[currentID]?.property || {};
		setType(type ?? defaultValue_type);
		setEncodeField(encodeField ?? defaultValue_encodeField);
		setOutputVariable(outputVariable ?? defaultValue_outputVariable);
	}, [currentID]);

	return (
		<>
			<InputSelect
				title="Base 64"
				description="Type"
				items={["Encode", "Decode"]}
				controller={setType}
				defaultValue={type}
			></InputSelect>
			<InputSelect
				description="Encode Field"
				items={["Request.name", "Request.image"]}
				underline={true}
				controller={setEncodeField}
				defaultValue={encodeField}
			></InputSelect>
			<InputText
				title="Output"
				description="Output variable"
				placeholder="$imageBase64"
				underline={true}
				controller={setOutputVariable}
				defaultValue={outputVariable}
			></InputText>
		</>
	);
}
