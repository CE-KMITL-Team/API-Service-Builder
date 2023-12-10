import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function MyAPITest() {
	return (
		<div className="test-section h-full flex flex-col">
			<div className="group">
				<div className="title flex gap-x-3 w-full items-center">
					<div className=" text-xl">
						<FontAwesomeIcon
							icon={icon({
								name: "bug",
								style: "solid",
							})}
							className="text-lg w-8"
						/>
					</div>
					<h1 className=" text-2xl font-bold">Test</h1>
				</div>
				<div className="group w-full mt-4">
					<label
						htmlFor="api-path"
						className="block mb-1 text-md text-gray-900 font-bold"
					>
						API Path
					</label>
					<input
						type="text"
						id="api-path"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						placeholder="/user/3"
						required
					/>
				</div>
				<button className="bg-primary-900 text-white hover:bg-primary-800 rounded-md py-2 text-lg shadow-md px-8 w-fit mt-3 max-w-lg flex items-center gap-x-3">
					<FontAwesomeIcon
						icon={icon({
							name: "play",
							style: "solid",
						})}
						className="text-lg"
					/>
					<div className="text-md">Run</div>
				</button>
				<hr className="mb-3 mt-5 border-solid border-t-2 border-gray-400" />
			</div>
			<div className="flex flex-col h-full">
				<label
					htmlFor="Parameter"
					className="mb-2 text-md font-bold text-gray-900"
				>
					Parameter
				</label>

				<div className="group flex-1">
					<textarea
						id="Parameter"
						className="resize-none h-full p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
					></textarea>
				</div>
				<hr className="mb-3 mt-5 border-solid border-t-2 border-gray-400" />
				<label
					htmlFor="Response"
					className="mb-2 text-md font-bold text-gray-900"
				>
					Response: <span className="text-green-500">200 OK</span>
				</label>
				<div className="group flex-1">
					<textarea
						id="Response"
						contentEditable
						className="resize-none h-full p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
					></textarea>
				</div>
			</div>
		</div>
	);
}

export default MyAPITest;
