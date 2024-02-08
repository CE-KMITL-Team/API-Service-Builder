import React, { useState } from "react";
import InputText from "../../inputs/InputText";

export default function Property_Join_Settings() {
	const [inputValue, setInputValue] = useState("$joinTable");

	return (
		<>
			<InputText
				title="Result table"
				description="result table from join"
				placeholder="variable"
				defaultValue={inputValue}
				controller={setInputValue}
			></InputText>
		</>
	);
}
