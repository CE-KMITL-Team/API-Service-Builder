import React, { useState } from "react";
import InputText from "../../inputs/InputText";

export default function Property_Model_Settings() {
	const [output, setOutput] = useState("$queryData");

	return (
		<>
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
