import React from "react";
import InputSelect from "../../inputs/InputSelect";
import InputText from "../../inputs/InputText";
import InputCondition from "../../inputs/InputCondition";

export default function Property_Join_Database() {
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
				underline={true}
			></InputText>
			<InputSelect
				title="Create sum column"
				items={["Order.quantity"]}
				underline={true}
			></InputSelect>
			<InputCondition title="Where Condition"></InputCondition>
		</>
	);
}
