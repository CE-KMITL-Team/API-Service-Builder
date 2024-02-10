import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useLocation } from "react-router-dom";
import { fetchGetModelDetail } from "../../../actions/modelActions";
import modelUtils from "../../../utils/modelUtils";

function ModelEdit() {
	const [modelFields, setModelFields] = useState([]);

	const [idParam, setIdParam] = useState(null);

	const dispatch = useDispatch();
	const location = useLocation();

	// Add a new empty field to the modelFields
	const handleAddField = (e) => {
		e.preventDefault();
		const newName = e.target.elements.name.value;
		const newType = e.target.elements.type.value;
		const newLength = e.target.elements.lengths.value;
		const newDefaultValue = e.target.elements.defaultValue.value;
		const newAutoIncrement = e.target.elements.autoIncrement.checked;

		e.target.elements.name.value = "";
		e.target.elements.lengths.value = "";
		e.target.elements.defaultValue.value = "";
		e.target.elements.autoIncrement.checked = false;

		const newField = {
			name: newName,
			type: newType,
			length: newLength || null,
			default_value: newDefaultValue || null,
			auto_increment: newAutoIncrement,
		};

		setModelFields([...modelFields, newField]);
	};

	// Edit the field
	const handleEditField = (index) => {
		console.log("Edit field at index:", index);
	};

	// Remove the field
	const handleDeleteField = (index) => {
		const updatedFields = [...modelFields];
		updatedFields.splice(index, 1);
		setModelFields(updatedFields);
	};

	async function initState(id) {
		try {
			const data = await dispatch(fetchGetModelDetail(id));

			if (data.status === true) {
				setModelFields(data.data.tables);
				console.log("Data:", data.data.tables, id);
			} else {
				setModelFields([]);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const id = urlParams.get("id");

		initState(id);
		setIdParam(id);
	}, [location]);

	return (
		<div className="p-5 pl-10 pr-20 flex-1 flex flex-col h-screen overflow-auto">
			<div className="navigator flex justify-start items-center gap-x-3">
				<span className="text-gray-500">Models</span>
				<FontAwesomeIcon
					icon={icon({
						name: "caret-right",
						style: "solid",
					})}
					className="text-gray-500"
				/>
				<span className="font-bold">Edit</span>
			</div>
			<div className="font-bold title flex w-full items-center mt-3">
				<h1 className="text-xl whitespace-nowrap">Edit Models</h1>
				<hr className="w-full border-gray-400 ml-5" />
			</div>
			<div className="group flex gap-x-5 mt-3">
				<div className="group w-full">
					<label
						htmlFor="model_name"
						className="block mb-2 text-md font-medium text-gray-900 text-left"
					>
						Model Name
					</label>
					<input
						type="text"
						id="model_name"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						placeholder="User"
						required
					/>
				</div>
				<div className="group w-full">
					<label
						htmlFor="description"
						className="block mb-2 text-md font-medium text-gray-900 text-left"
					>
						Description
					</label>
					<input
						type="text"
						id="description"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						placeholder="This model for user data"
						required
					/>
				</div>
			</div>
			<div className="font-bold title flex w-full items-center mt-3">
				<h1 className="text-xl whitespace-nowrap">Field List</h1>
				<hr className="w-full border-gray-400 ml-5" />
			</div>
			<div className="field-list">
				{/* {modelFields}asd */}
				<form onSubmit={handleAddField}>
					<table className="w-full border border-collapse mt-2">
						<thead>
							<tr>
								<th className="bg-primary-900 text-white p-2 border">
									Name
								</th>
								<th className="bg-primary-900 text-white p-2 border">
									Type
								</th>
								<th className="bg-primary-900 text-white p-2 border">
									Length
								</th>
								<th className="bg-primary-900 text-white p-2 border">
									Default Value
								</th>
								<th className="bg-primary-900 text-white p-2 border">
									AI
								</th>
								<th className="bg-primary-900 text-white p-2 border">
									Action
								</th>
							</tr>
						</thead>

						<tbody>
							{modelFields.map((field, index) => (
								<tr key={index} className="border-t">
									<td className="p-2 border">{field.name}</td>
									<td className="p-2 border">{field.type}</td>
									<td className="p-2 border">
										{field.length || "-"}
									</td>
									<td className="p-2 border">
										{field.default_value || "-"}
									</td>
									<td className="p-2 border">
										<input
											type="checkbox"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
											defaultChecked={
												field.auto_increment
											}
											disabled
										/>
									</td>
									<td className="p-2">
										<div className="flex justify-evenly">
											<FontAwesomeIcon
												icon={icon({
													name: "pen-to-square",
													style: "solid",
												})}
												className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-orange-500 hover:text-orange-700"
												onClick={() =>
													handleEditField(index)
												}
											/>
											<FontAwesomeIcon
												icon={icon({
													name: "trash",
													style: "solid",
												})}
												className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-red-500 hover:text-red-700"
												onClick={() =>
													handleDeleteField(index)
												}
											/>
										</div>
									</td>
								</tr>
							))}
							<tr className="border-t">
								<td className="p-2 border">
									<input
										type="text"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
										placeholder="Name"
										name="name"
										required
									/>
								</td>
								<td className="p-2 border">
									<select
										name="type"
										className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
									>
										<option value="string">string</option>
										<option value="number">number</option>
										<option value="float">float</option>
										<option value="date">date</option>
									</select>
								</td>
								<td className="p-2 border">
									<input
										type="number"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
										placeholder="Length"
										name="lengths"
									/>
								</td>
								<td className="p-2 border">
									<input
										type="text"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
										placeholder="Default Value"
										name="defaultValue"
									/>
								</td>
								<td className="p-2 border">
									<input
										type="checkbox"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
										name="autoIncrement"
									/>
								</td>
								<td className="p-2 border text-center">
									<button className="bg-primary-900 text-white hover:bg-primary-700 rounded-md px-3 py-2 text-lg text-md flex items-center justify-center w-full">
										<FontAwesomeIcon
											icon={icon({
												name: "plus",
												style: "solid",
											})}
											className="text-md mr-2"
										/>
										<span>Add</span>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
			<div className="action flex gap-x-8 justify-end mb-5 mt-8">
				<button className="text-gray-500 rounded-md px-3 py-2 text-lg text-md text-center border border-gray-500 w-32 duration-100 hover:bg-gray-700 hover:text-white hover:border-gray-700">
					<span>Cancel</span>
				</button>
				<button
					className="bg-primary-900 text-white rounded-md px-3 py-2 text-lg text-md text-center w-32 duration-100 hover:bg-primary-700"
					type="submit"
				>
					<span>Edit</span>
				</button>
			</div>
		</div>
	);
}

export default ModelEdit;
