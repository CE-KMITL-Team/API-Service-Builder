import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import React from "react";

function ProjectMenu() {
	const projects = [
		{
			name: "Co-Working",
			online: false,
		},
		{
			name: "Hotel",
			online: false,
		},
	];

	// const menuItems = [
	// 	{ label: "Account settings", link: "#" },
	// 	{ label: "Support", link: "#" },
	// 	{ label: "License", link: "#" },
	// 	// Add more menu items as needed
	// ];

	return (
		<div className="h-screen bg-dark text-white pt-6 pl-10 pr-10 w-72 relative">
			<div className="title flex items-center justify-center">
				<img
					className="h-6 w-auto"
					src="/assets/icon-white.png"
					alt="API Forge"
				/>
				<div className="text-md font-bold ml-4">API Forge</div>
			</div>
			<div className="menu mt-8 flex flex-col gap-y-2">
				<div className="items flex text-primary-700 items-center gap-x-2 relative">
					<FontAwesomeIcon
						icon={icon({
							name: "square-plus",
							style: "regular",
						})}
						className="text-lg w-8"
					/>
					<div className="text-lg after:content-[''] after:absolute after:w-2 after:rounded-l after:h-full after:bg-primary-700 after:-right-10 after:mb-5">
						Create Project
					</div>
				</div>
				<div className="items flex text-gray-400 items-center cursor-pointer gap-x-2 hover:text-gray-200">
					<FontAwesomeIcon
						icon={icon({
							name: "right-from-bracket",
							style: "solid",
						})}
						className="text-lg w-8"
					/>
					<div className="text-lg">Logout</div>
				</div>
			</div>
			<div className="text-xl font-bold text-gray-400 mt-12">Project</div>
			<div className="menu mt-4 flex flex-col gap-y-2">
				{projects.map((project, index) => (
					<div
						key={index}
						className={`items flex text-${
							project.online ? "lime-400" : "red-400"
						} items-center cursor-pointer gap-x-2 hover:text-${
							project.online ? "lime-500" : "red-500"
						}`}
					>
						<FontAwesomeIcon
							icon={icon({
								name: "circle",
								style: "solid",
							})}
							className="scale-50 w-8"
						/>
						<div className="text-lg text-gray-400 hover:text-gray-300">
							{project.name}
						</div>
					</div>
				))}
			</div>
			{/* <Dropdown menu={menuItems} />; */}
			<div className="setting absolute bottom-3 right-3 cursor-pointer">
				<FontAwesomeIcon
					icon={icon({
						name: "gear",
						style: "solid",
					})}
					className="text-lg w-8 text-gray-500"
				/>
			</div>
		</div>
	);
}

export default ProjectMenu;
