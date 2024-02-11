import React, { useState } from "react";
import InputText from "../../../inputs/InputText";

export default function Method_Insert() {
	const [value1, setValue1] = useState("$");
	const [value2, setValue2] = useState("$");
	const [value3, setValue3] = useState("$");
	const [value4, setValue4] = useState("$");

	return (
		<>
			<InputText
				title="Insert Column"
				description={<div className="font-bold">id</div>}
				placeholder="value"
				defaultValue={value1}
				controller={setValue1}
			></InputText>
			<InputText
				description={<div className="font-bold">Firstname</div>}
				placeholder="value"
				defaultValue={value2}
				controller={setValue2}
			></InputText>
			<InputText
				description={<div className="font-bold">Lastname</div>}
				placeholder="value"
				defaultValue={value3}
				controller={setValue3}
			></InputText>
			<InputText
				description={<div className="font-bold">Password</div>}
				placeholder="value"
				defaultValue={value4}
				controller={setValue4}
				underline={true}
			></InputText>
		</>
	);
}
