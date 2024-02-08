import React, { useState } from "react";
import InputText from "../../inputs/InputText";
import InputSelect from "../../inputs/InputSelect";

export default function Property_Return_Settings() {
	const [output, setOutput] = useState("$response");

	return (
		<>
			<InputText
				title="Output"
				description="Response Value"
				placeholder="variable"
				defaultValue={output}
				controller={setOutput}
			></InputText>
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
			></InputSelect>
		</>
	);
}
