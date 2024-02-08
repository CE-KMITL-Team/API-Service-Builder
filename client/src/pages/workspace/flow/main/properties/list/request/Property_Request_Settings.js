import React, { useState } from "react";
import InputText from "../../inputs/InputText";

export default function Property_Request_Settings() {
	const [output, setOutput] = useState("$response");

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
