import React, { useState } from "react";
import InputSelect from "../../inputs/InputSelect";
import InputText from "../../inputs/InputText";
import InputCondition from "../../inputs/InputCondition";

export default function Property_Join_Database() {
	const [limit, setLimit] = useState(true);

	return (
		<>
			<InputSelect
				title="Order by"
				description="Column name"
				items={["id", "Firstname", "Lastname"]}
			></InputSelect>
			<InputSelect
				description="Direction"
				items={["ASC", "DESC"]}
				underline={true}
			></InputSelect>
			<InputSelect
				title="Group By"
				items={["Book.ID", "Book.Name"]}
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
			<InputSelect
				title="Create sum column"
				items={["Order.quantity"]}
				underline={true}
			></InputSelect>
			<InputCondition title="Where Condition"></InputCondition>
		</>
	);
}
