import React, { useState } from "react";
import InputText from "../../inputs/InputText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Property_Request_Parameter() {
	const [requestColumn, setRequestColumn] = useState("");
	const [optional, setOptional] = useState(false);
	const [type, setType] = useState("Type");

	const [columns, setColumns] = useState([]);

	const [error, setError] = useState("");

	const handleAddColumn = () => {
		if (requestColumn.trim() === "") {
			setError("Column name is required.");
			return;
		}

		if (columns.some((column) => column.name === requestColumn)) {
			setError("Column name must be unique.");
			return;
		}

		if (type === "Type") {
			setError("Type is required.");
			return;
		}

		if (requestColumn && type !== "Type") {
			const newColumn = {
				name: requestColumn,
				type: type,
				null: optional,
			};
			setColumns([...columns, newColumn]);
			setRequestColumn("");
			setOptional(false);
			setType("Type");
			setError("");
		} else {
			// Handle validation or show an error message
		}
	};

	const handleRemoveColumn = (index) => {
		const updatedColumns = [...columns];
		updatedColumns.splice(index, 1);
		setColumns(updatedColumns);
	};

	return (
		<>
			<InputText
				title="Request Column"
				placeholder="Column name"
				controller={setRequestColumn}
				defaultValue={requestColumn}
			></InputText>
			{error && <div className="text-red-500 mt-2">{error}</div>}
			<div className="group flex items-center justify-between mt-4">
				<div className="group">
					<input
						className="mr-2"
						id="optional"
						type="checkbox"
						checked={optional}
						onChange={() => setOptional(!optional)}
					/>
					<label htmlFor="optional">can null</label>
				</div>

				<select
					value={type}
					onChange={(e) => setType(e.target.value)}
					className="w-fit bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
				>
					{type === "Type" && <option value="Type">Type</option>}
					<option value="string">string</option>
					<option value="int">int</option>
					<option value="bool">bool</option>
				</select>
			</div>

			<button
				className="w-full mt-5 bg-primary-800 text-white hover:bg-primary-700 rounded-md px-5 py-2 text-lg font-medium shadow-md"
				onClick={handleAddColumn}
			>
				<FontAwesomeIcon
					icon={icon({
						name: "plus",
						style: "solid",
					})}
					className="text-white"
				/>{" "}
				Add
			</button>
			<hr className="my-5 w-full border-gray-400 py-0" />
			<table className="w-full border-collapse border border-slate-600">
				<thead>
					<tr className="bg-black text-white">
						<th className="border border-slate-400 p-2">Name</th>
						<th className="border border-slate-400 p-2">Type</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{columns.map((column, index) => (
						<tr key={index}>
							<td className="border border-slate-400 p-2">
								{column.name}
							</td>
							<td className="border border-slate-400 p-2">
								{column.type}
								{column.null && " (optional)"}
							</td>
							<td className="text-center border border-slate-400 p-2">
								<FontAwesomeIcon
									icon={icon({
										name: "xmark",
										style: "solid",
									})}
									className="text-red-600 text-2xl cursor-pointer"
									onClick={() => handleRemoveColumn(index)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
