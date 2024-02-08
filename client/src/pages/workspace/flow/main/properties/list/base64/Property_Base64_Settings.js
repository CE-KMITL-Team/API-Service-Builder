import React from "react";
import InputText from "../../inputs/InputText";
import InputSelect from "../../inputs/InputSelect";

export default function Property_Base64_Settings() {
	return (
		<>
			<InputSelect
				title="Base 64"
				description="Type"
				items={["Encode", "Decode"]}
			></InputSelect>
			<InputSelect
				description="Encode Field"
				items={["Request.name", "Request.image"]}
				underline={true}
			></InputSelect>
			<InputText
				title="Output"
				description="Output variable"
				placeholder="$imageBase64"
				underline={true}
			></InputText>
		</>
	);
}
