import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import ModelTable from "./ModelTable";

function ModelView() {
	const data = [
		{
			name: "John Doe",
			email: "john@example.com",
			password: "password123",
			tel: "123-456-7890",
		},
		{
			name: "John Doe",
			email: "john@example.com",
			password: "password123",
			tel: "123-456-7",
		},
		{
			name: "John Doe",
			email: "john@example.com",
			password: "password123",
			tel: "123-456-7890",
		},
		{
			name: "John Doe",
			email: "john@example.com",
			password: "password123",
			tel: "123-456-7890",
		},
	];

	const searchRef = useRef(null);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if ((event.ctrlKey || event.metaKey) && event.key === "k") {
				event.preventDefault();
				searchRef.current.focus();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);
	return (
		<div className="p-5 pl-10 pr-20 flex-1">
			<div className="head flex items-center justify-between gap-x-10 h-12">
				<h1 className="title text-2xl font-bold">User</h1>
				<div className="action flex gap-x-5 h-full">
					<div className="select">
						<select className="h-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
							<option>- All -</option>
							<option>Username</option>
							<option>Password</option>
						</select>
					</div>
					<div className="relative rounded-md shadow-sm h-full flex-1 w-full">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 h-full">
							<span className="text-gray-500 sm:text-sm">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="grey"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
									/>
								</svg>
							</span>
						</div>
						<input
							type="text"
							name="price"
							id="price"
							className="h-full w-full rounded-md border-0 py-1.5 pl-12 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
							placeholder="Quick search..."
							ref={searchRef}
						/>
						<div className="absolute inset-y-0 right-0 flex items-center text-gray-500">
							<p className="pr-4">
								Ctrl
								<span className="font-medium">+ K</span>
							</p>
						</div>
					</div>
					<button className="bg-primary-900 text-white hover:bg-primary-700 rounded-md px-3 py-2 flex shadow-sm items-center gap-x-3">
						<FontAwesomeIcon
							icon={icon({
								name: "file-import",
								style: "solid",
							})}
							className="scale-105"
						/>
						<div className="text-md">Import</div>
					</button>
				</div>
			</div>
			<div className="data mt-5">
				<ModelTable data={data} />
			</div>
		</div>
	);
}

export default ModelView;