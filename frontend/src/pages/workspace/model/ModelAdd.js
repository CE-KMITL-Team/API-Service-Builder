import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ModelAdd() {
	const fieldLists = [
		{
			name: "id",
			type: "number",
			ai: true,
		},
		{
			name: "username",
			type: "text",
			length: 50,
			ai: false,
		},
		{
			name: "password",
			type: "text",
			length: 50,
			ai: false,
		},
		{
			name: "location",
			type: "text",
			default: "Thailand",
			ai: false,
		},
	];
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
				<span className="font-bold">Create</span>
			</div>
			<div className="font-bold title flex w-full items-center mt-3">
				<h1 className="text-xl whitespace-nowrap">Create Models</h1>
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
						placeholder="Smith"
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
						placeholder="Smith"
						required
					/>
				</div>
			</div>
			<div className="font-bold title flex w-full items-center mt-3">
				<h1 className="text-xl whitespace-nowrap">Field List</h1>
				<hr className="w-full border-gray-400 ml-5" />
			</div>
			<div className="field-list">
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
						{fieldLists.map((field, index) => (
							<tr key={index} className="border-t">
								<td className="p-2 border">{field.name}</td>
								<td className="p-2 border">{field.type}</td>
								<td className="p-2 border">
									{field.length || "-"}
								</td>
								<td className="p-2 border">
									{field.default || "-"}
								</td>
								<td className="p-2 border">
									<input
										type="checkbox"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
										required
										defaultChecked={field.ai}
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
										/>
										<FontAwesomeIcon
											icon={icon({
												name: "trash",
												style: "solid",
											})}
											className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-red-500 hover:text-red-700"
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
									required
								/>
							</td>
							<td className="p-2 border">
								<select className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
									<option>text</option>
									<option>number</option>
								</select>
							</td>
							<td className="p-2 border">
								<input
									type="text"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="Length"
									required
								/>
							</td>
							<td className="p-2 border">
								<input
									type="text"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="Default Value"
									required
								/>
							</td>
							<td className="p-2 border">
								<input
									type="checkbox"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="Name"
									required
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
			</div>

			<div className="font-bold title flex w-full items-center mt-3">
				<h1 className="text-xl whitespace-nowrap">Auto Generate</h1>
				<hr className="w-full border-gray-400 ml-5" />
			</div>
			<div className="flex mt-6 flex-wrap gap-6 items-start mb-auto">
				<div class="group border flex items-center gap-x-3 p-3 relative rounded-md min-w-[12rem]">
					<div className="title font-bold text-gray-600 absolute -top-3 left-3 whitespace-nowrap bg-white px-2">
						Retrieve methods
					</div>
					<div className="check-list ml-3 flex flex-col">
						<div className="group flex gap-x-3">
							<input type="checkbox" id="find_all" />
							<label
								htmlFor="find_all"
								className="block text-md text-left"
							>
								Find all
							</label>
						</div>
					</div>
				</div>
				<div class="group border flex items-center gap-x-3 p-3 relative rounded-md min-w-[12rem]">
					<div className="title font-bold text-gray-600 absolute -top-3 left-3 whitespace-nowrap bg-white px-2">
						Create methods
					</div>
					<div className="check-list ml-3 flex flex-col">
						<div className="group flex gap-x-3">
							<input type="checkbox" id="insert_all" />
							<label
								htmlFor="insert_all"
								className="block text-md text-left"
							>
								insert Data
							</label>
						</div>
					</div>
				</div>
				<div class="group border flex items-center gap-x-3 p-3 relative rounded-md min-w-[12rem]">
					<div className="title font-bold text-gray-600 absolute -top-3 left-3 whitespace-nowrap bg-white px-2">
						Delete methods
					</div>
					<div className="check-list ml-3 flex flex-col">
						<div className="group flex gap-x-3">
							<input type="checkbox" id="delete_one" />
							<label
								htmlFor="delete_one"
								className="block text-md text-left"
							>
								Delete one
							</label>
						</div>
						<div className="group flex gap-x-3">
							<input type="checkbox" id="delete_all" />
							<label
								htmlFor="delete_all"
								className="block text-md text-left"
							>
								Delete all
							</label>
						</div>
					</div>
				</div>
				<div class="group border flex items-center gap-x-3 p-3 relative rounded-md min-w-[12rem]">
					<div className="title font-bold text-gray-600 absolute -top-3 left-3 whitespace-nowrap bg-white px-2">
						Update methods
					</div>
					<div className="check-list ml-3 flex flex-col">
						<div className="group flex gap-x-3">
							<input type="checkbox" id="update" />
							<label
								htmlFor="update"
								className="block text-md text-left"
							>
								Update
							</label>
						</div>
					</div>
				</div>
			</div>
			<div className="action flex gap-x-8 justify-end mb-5 mt-8">
				<button className="text-gray-500 rounded-md px-3 py-2 text-lg text-md text-center border border-gray-500 w-32 duration-100 hover:bg-gray-700 hover:text-white hover:border-gray-700">
					<span>Cancel</span>
				</button>
				<button className="bg-primary-900 text-white rounded-md px-3 py-2 text-lg text-md text-center w-32 duration-100 hover:bg-primary-700">
					<span>Save</span>
				</button>
			</div>
		</div>
	);
}

export default ModelAdd;
