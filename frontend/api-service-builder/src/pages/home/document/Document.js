import React, { useEffect, useRef } from "react";
import DocumentMenu from "./DocumentMenu";

function Document() {
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

	const menu = [
		{
			name: "Getting Started",
			submenu: [
				{
					name: "Introduction",
					link: "/#",
				},
				{
					name: "Example project",
					link: "/#",
				},
				{
					name: "Work with front-end",
					link: "/#",
				},
			],
		},
		{
			name: "Model",
			submenu: [
				{
					name: "Overview",
					link: "/#",
				},
				{
					name: "Create my first model",
					link: "/#",
				},
				{
					name: "Field list",
					link: "/#",
				},
				{
					name: "Auto generate",
					link: "/#",
				},
				{
					name: "Data",
					link: "/#",
				},
			],
		},
		{
			name: "Flow",
			submenu: [
				{
					name: "Overview",
					link: "/#",
				},
				{
					name: "How it works",
					link: "/#",
				},
				{
					name: "Settings",
					link: "/#",
				},
				{
					name: "Properties",
					link: "/#",
				},
				{
					name: "Test & Debug",
					link: "/#",
				},
			],
		},
		{
			name: "Nodes",
			submenu: [
				{
					name: "Overview",
					link: "/#",
				},
				{
					name: "Variable",
					link: "/#",
				},
				{
					name: "Condition",
					link: "/#",
				},
				{
					name: "Trigger-Node",
					link: "/#",
					submenu: [
						{
							name: "Request",
							link: "/#",
						},
					],
				},
				{
					name: "Node",
					link: "/#",
					submenu: [
						{
							name: "Condition",
							link: "/#",
						},
						{
							name: "Count",
							link: "/#",
						},
						{
							name: "Base64",
							link: "/#",
						},
						{
							name: "Return Response",
							link: "/#",
						},
					],
				},
			],
		},
	];
	return (
		<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
			<div className="flex justify-center items-center h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] bg-white">
				<div className="mainmenu w-1/5 p-5 pl-0 h-full">
					<div className="relative rounded-md shadow-sm shadow-md bg-white mb-5">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
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
							className="block w-full rounded-md border-0 py-1.5 pl-12 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
					<div className="h-[calc(100%-36px)] relative overflow-y-auto">
						<DocumentMenu menu={menu} />
					</div>
				</div>
				<div className="doc flex-grow h-full p-5"></div>
			</div>
		</div>
	);
}

export default Document;
