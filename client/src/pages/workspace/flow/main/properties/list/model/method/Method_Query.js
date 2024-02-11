import React, { useState } from "react";
import InputSelect from "../../../inputs/InputSelect";
import InputText from "../../../inputs/InputText";
import InputCondition from "../../../inputs/InputCondition";

export default function Method_Query() {
	const [column, setColumn] = useState();
	const [direction, setDirection] = useState("ASC");

	const [limit, setLimit] = useState(true);

	return (
		<>
			<InputSelect
				title="Order by"
				description="Column name"
				items={["Firstname", "Lastname"]}
				controller={setDirection}
			></InputSelect>
			<InputSelect
				description="Direction"
				items={["ASC", "DESC"]}
				controller={setDirection}
				underline={true}
			></InputSelect>
			<InputText
				title="Limit"
				placeholder="limit data"
				type="number"
			></InputText>
			<div className="group mt-3 ml-1">
				<input
					className="mr-2"
					id="limit"
					type="checkbox"
					checked={limit}
					onChange={() => setLimit(!limit)}
				/>
				<label htmlFor="optional">no limit</label>
			</div>
			<hr className="my-5 w-full border-gray-400 py-0" />
			<InputCondition title="Query Condition"></InputCondition>
		</>
	);
}
