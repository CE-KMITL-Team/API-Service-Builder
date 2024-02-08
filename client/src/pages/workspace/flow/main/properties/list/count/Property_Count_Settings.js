import React, { useState } from "react";
import InputText from "../../inputs/InputText";

export default function Property_Count_Settings() {
	const [countData, setCountData] = useState("");
	const [outputValue, setOutputValue] = useState("$countData");

	return (
		<>
			<InputText
				title="Count Data"
				description="Data you want to count"
				placeholder="variable"
				defaultValue={countData}
				controller={setCountData}
				underline={true}
			></InputText>
			<InputText
				title="Output"
				description="Output variable"
				placeholder="$imageBase64"
				defaultValue={outputValue}
				controller={setOutputValue}
				underline={true}
			></InputText>
		</>
	);
}
