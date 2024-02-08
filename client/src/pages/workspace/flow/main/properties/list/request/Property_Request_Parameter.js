import React, { useState } from "react";
import InputText from "../../inputs/InputText";

export default function Property_Request_Parameter() {
	const [requestColumn, setRequestColumn] = useState();
	return (
		<>
			<InputText
				title="Request Column"
				placeholder="Column name"
				controller={setRequestColumn}
				underline={true}
			></InputText>
		</>
	);
}
