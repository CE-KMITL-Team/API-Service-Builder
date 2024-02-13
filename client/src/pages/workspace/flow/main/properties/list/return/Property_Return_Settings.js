import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../inputs/InputText";
import InputSelect from "../../inputs/InputSelect";
import { saveProperty } from "../../../../../../../actions/flowActions";

const defaultValue_output = "$response";
const defaultValue_statusCode = "200 OK";

export default function Property_Return_Settings() {
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

	// Input for Status Code
	const [statusCode, setStatusCode] = useState(defaultValue_statusCode);
	useEffect(() => {
		dispatch(saveProperty({ statusCode }));
	}, [statusCode]);

	// Load Default Data
	useEffect(() => {
		const { output, statusCode } = nodeStore[currentID]?.property || {};
		setOutput(output ?? defaultValue_output);
		setStatusCode(statusCode ?? defaultValue_statusCode);
	}, [currentID]);

	return (
		<>
			{/* InputText for Output */}
			<InputText
				title="Output"
				description="Response Value"
				placeholder="variable"
				defaultValue={output}
				controller={setOutput}
			></InputText>

			{/* InputSelect for Status Code */}
			<InputSelect
				description="Status code"
				items={[
					"404 Not Found",
					"200 OK",
					"500 Internal Server Error",
					"401 Unauthorized",
					"403 Forbidden",
					"302 Found",
					"301 Moved Permanently",
					"405 Method Not Allowed",
					"400 Bad Request",
					"502 Bad Gateway",
					"503 Service Unavailable",
					"406 Not Acceptable",
					"409 Conflict",
					"410 Gone",
					"415 Unsupported Media Type",
					"422 Unprocessable Entity",
					"429 Too Many Requests",
				]}
				underline={true}
				controller={setStatusCode}
				defaultValue={statusCode}
			></InputSelect>
		</>
	);
}
