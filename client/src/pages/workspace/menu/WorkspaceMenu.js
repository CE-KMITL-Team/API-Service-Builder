import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import WorkspaceMenuPopup from "./WorkspaceMenuPopup";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import MenuFooter from "./MenuFooter";

function WorkspaceMenu() {
	const models = [
		{
			id: 1,
			name: "Book",
			link: "/book",
		},
		{
			id: 2,
			name: "User",
			link: "/user",
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

	const { projectID, activeModel, activeFlow } = useParams();

	const location = useLocation();

	const toggleOnline = () => {
		setOnline(!isOnline);
		setIsPopupOpen(!isOnline);
	};

	const menuActiveClass =
		"relative text-primary-700 font-bold after:content-[''] after:absolute after:w-2 after:rounded-l after:h-full after:bg-primary-700 after:-right-10";

	return (
		<div className="h-screen bg-dark text-white pt-6 pl-10 pr-10 w-[260px] relative">
			<div className="title flex items-center justify-center">
				<img
					className="h-6 w-auto"
					src="/assets/icon-white.png"
					alt="API Forge"
				/>
				<div className="text-md font-bold ml-4">{projectID}</div>
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
				<Link
					to={`/workspace/${projectID}/myapi`}
					className={`text-gray-400 items flex cursor-pointer items-center gap-x-2 hover:text-primary-700 ease-in duration-75 hover:font-bold ${
						location.pathname.toLowerCase() ===
						`/workspace/${projectID}/myapi`.toLowerCase()
							? menuActiveClass
							: ""
					}`}
				>
					<FontAwesomeIcon
						icon={icon({
							name: "plug",
							style: "solid",
						})}
						className="text-lg w-8"
					/>
					<div className="text-lg">My API</div>
				</Link>
			</div>
			<Link
				to={`/workspace/${projectID}/model/${models[0].name}`}
				className={`flex text-gray-400 text-lg font-bold mt-8 cursor-pointer hover:text-primary-700 ease-in duration-75 hover:font-bold ${
					location.pathname.toLowerCase() ===
					`/workspace/${projectID}/addmodel`.toLowerCase()
						? menuActiveClass
						: ""
				}`}
			>
				Models
			</Link>
			<div className="text-gray-400 menu mt-3 flex flex-col gap-y-2">
				{models.map((model, index) => (
					<Link
						key={index}
						to={`/workspace/${projectID}/model/${model.name}`}
						className={`flex items-center cursor-pointer hover:text-primary-700 ease-in duration-75 hover:font-bold ${
							activeModel === model.name ? menuActiveClass : ""
						}`}
					>
						<FontAwesomeIcon
							icon={icon({
								name: "database",
								style: "solid",
							})}
							className="text-md mr-3 ml-2"
						/>
						<div className="text-lg">{model.name}</div>
					</Link>
				))}
			</div>
			<Link
				to={`/workspace/${projectID}/flows`}
				className={`flex text-gray-400 text-lg font-bold mt-8 cursor-pointer hover:text-primary-700 ease-in duration-75 hover:font-bold ${
					location.pathname.toLowerCase() ===
					`/workspace/${projectID}/flows`.toLowerCase()
						? menuActiveClass
						: ""
				}`}
			>
				Flow List
			</Link>
			<div className="text-gray-400 menu mt-3 flex flex-col gap-y-2 text-lg">
				{flows.map((flow, index) => (
					<Link
						key={index}
						to={`/workspace/${projectID}/flows/${flow.name}`}
						className={`flex items-center cursor-pointer hover:text-primary-700 ease-in duration-75 hover:font-bold ${
							activeFlow === flow.name ? menuActiveClass : ""
						}`}
					>
						<FontAwesomeIcon
							icon={icon({
								name: "diagram-project",
								style: "solid",
							})}
							className="text-md mr-3 ml-2"
						/>
						<div className="text-lg">{flow.name}</div>
					</Link>
				))}
			</div>
			<MenuFooter></MenuFooter>
		</div>
	);
}

export default WorkspaceMenu;
