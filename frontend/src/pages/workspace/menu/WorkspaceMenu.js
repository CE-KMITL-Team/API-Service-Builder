import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import WorkspaceMenuPopup from "./WorkspaceMenuPopup";

function WorkspaceMenu() {
	const models = [
		{
			id: 1,
			name: "Book",
			link: "book",
		},
		{
			id: 2,
			name: "User",
			link: "user",
		},
	];

	const flows = [
		{
			id: 1,
			name: "Login",
			link: "user",
		},
		{
			id: 2,
			name: "Register",
			link: "register",
		},
	];

	const [isOnline, setOnline] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const toggleOnline = () => {
		setOnline(!isOnline);
		setIsPopupOpen(!isOnline);
	};

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
			<div className="status mt-4">
				<div className="p-2 bg-dark-800 flex rounded-md justify-evenly gap-5">
					<div
						className={`online px-3 py-2 rounded-md flex-1 text-center font-bold ${
							isOnline
								? `bg-dark font-bold text-green-500`
								: `text-gray-600 cursor-pointer hover:text-gray-400 hover:bg-gray-800 duration-100`
						}`}
						onClick={(event) =>
							!isOnline ? toggleOnline() : undefined
						}
					>
						Online
					</div>
					<div
						className={`offline px-3 py-2 rounded-md flex-1 text-center font-bold ${
							!isOnline
								? `bg-dark font-bold text-red-500`
								: `text-gray-600 cursor-pointer hover:text-gray-600 hover:bg-gray-800 duration-100`
						}`}
						onClick={(event) =>
							isOnline ? toggleOnline() : undefined
						}
					>
						Offline
					</div>
					<WorkspaceMenuPopup
						isOpen={isPopupOpen}
						onRequestClose={() => setIsPopupOpen(false)}
					/>
				</div>
			</div>
			<div className="menu mt-8 flex flex-col gap-y-2">
				<div className="items flex text-primary-700 items-center gap-x-2 relative">
					<FontAwesomeIcon
						icon={icon({
							name: "plug",
							style: "solid",
						})}
						className="text-lg w-8"
					/>
					<div className="text-lg after:content-[''] after:absolute after:w-2 after:rounded-l after:h-full after:bg-primary-700 after:-right-10 after:mb-5">
						My API
					</div>
				</div>
			</div>
			<div className="text-lg font-bold text-gray-400 mt-8 cursor-pointer hover:text-primary-700 ease-in duration-75 hover:font-bold">
				Models
			</div>
			<div className="menu mt-3 flex flex-col gap-y-2">
				{models.map((project, index) => (
					<div
						key={index}
						className="flex items-center text-gray-400 cursor-pointer hover:text-primary-700 ease-in duration-75 hover:font-bold"
					>
						<FontAwesomeIcon
							icon={icon({
								name: "database",
								style: "solid",
							})}
							className="text-md mr-3 ml-2"
						/>
						<div className="text-lg">{project.name}</div>
					</div>
				))}
			</div>
			<div className="text-lg font-bold text-gray-400 mt-8 cursor-pointer hover:text-primary-700 ease-in duration-75 hover:font-bold">
				Flows
			</div>
			<div className="menu mt-3 flex flex-col gap-y-2 text-lg">
				{flows.map((project, index) => (
					<div
						key={index}
						className="flex items-center text-gray-400 cursor-pointer hover:text-primary-700 ease-in duration-75 hover:font-bold"
					>
						<FontAwesomeIcon
							icon={icon({
								name: "diagram-project",
								style: "solid",
							})}
							className="text-md mr-3 ml-2"
						/>
						<div className="text-lg">{project.name}</div>
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

export default WorkspaceMenu;
