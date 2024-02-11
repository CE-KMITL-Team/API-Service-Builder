import React, { useState } from "react";
import InputSelect from "../../inputs/InputSelect";
import Method_Query from "./method/Method_Query";
import Method_Delete from "./method/Method_Delete";
import Method_Insert from "./method/Method_Insert";
import Method_Update from "./method/Method_Update";

export default function Property_Model_Function() {
	const [method, setMethod] = useState("Query");

	return (
		<>
			<InputSelect
				title="Direction"
				items={["Query", "Delete", "Insert", "Update"]}
				underline={true}
				controller={setMethod}
			></InputSelect>

			{method === "Query" && <Method_Query></Method_Query>}
			{method === "Delete" && <Method_Delete></Method_Delete>}
			{method === "Insert" && <Method_Insert></Method_Insert>}
			{method === "Update" && <Method_Update></Method_Update>}
		</>
	);
}
