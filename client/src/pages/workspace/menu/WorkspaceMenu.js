import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import WorkspaceMenuPopup from "./WorkspaceMenuPopup";
import { Link, useLocation } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import MenuFooter from "./MenuFooter";
import { useDispatch } from "react-redux";
import { fetchGetModelWorkspace } from "../../../actions/modelActions";
import workspaceUtils from "../../../utils/workspaceUtils";
import modelUtils from "../../../utils/modelUtils";
import { fetchGetFlows } from "../../../actions/flowActions";
function WorkspaceMenu() {
	// const flows = [
	// 	{
	// 		id: 1,
	// 		name: "Login",
	// 		link: "user",
	// 	},
	// 	{
	// 		id: 2,
	// 		name: "Register",
	// 		link: "register",
	// 	},
	// ];

	const [isOnline, setOnline] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [models, setModel] = useState([]);
	const [flows , setFlows] = useState([]);

	const dispatch = useDispatch();

	const { projectName, activeModel, activeFlow } = useParams();

	const location = useLocation();
	const navigate = useNavigate();

	const handleModelLinkClick = (modelData) => {
		modelUtils.setCurrent(modelData);

		navigate(`/workspace/${projectName}/model/${modelData.name}`);
	};

	const linkToAddModel = () => navigate(`/workspace/${projectName}/addmodel`);

	const toggleOnline = () => {
		setOnline(!isOnline);
		setIsPopupOpen(!isOnline);
	};

	async function initState() {
		try {
			const data = await dispatch(
				fetchGetModelWorkspace(workspaceUtils.getID())
			);

			const flowData = await dispatch(
				fetchGetFlows(workspaceUtils.getID())
				);
			if (flowData.status === true) {
				setFlows(flowData.data);
			}
			else{
				setFlows([]);
			}
			if (data.status === true) {
				setModel(data.data);
			} else {
				setModel([]);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	useEffect(() => {
		initState();
	}, [location]);

	const menuActiveClass =
		"relative text-primary-700 font-bold after:content-[''] after:absolute after:w-2 after:rounded-l after:h-full after:bg-primary-700 after:-right-10";

	return (
		<div className="h-screen bg-dark text-white pt-6 pl-10 pr-10 w-[310px] relative overflow-auto">
			<div className="title flex items-center justify-center">
				<img
					className="h-6 w-auto"
					src="/assets/icon-white.png"
					alt="API Forge"
				/>
				<div className="text-md font-bold ml-4">
					{workspaceUtils.getName()}
				</div>
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
					to={`/workspace/${projectName}/myapi`}
					className={`text-gray-400 items flex cursor-pointer items-center gap-x-2 hover:text-primary-700 ease-in duration-75 hover:font-bold ${
						location.pathname.toLowerCase() ===
						`/workspace/${projectName}/myapi`.toLowerCase()
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
			<div
				onClick={() =>
					models[0] !== undefined
						? handleModelLinkClick(models[0])
						: linkToAddModel()
				}
				className={`flex text-gray-400 text-lg font-bold mt-8 cursor-pointer hover:text-primary-700 ease-in duration-75 hover:font-bold ${
					location.pathname.toLowerCase() ===
					`/workspace/${projectName}/addmodel`.toLowerCase()
						? menuActiveClass
						: ""
				}`}
			>
				Models
			</div>
			<div className="text-gray-400 menu mt-3 flex flex-col gap-y-2">
				{models.map((model, index) => (
					<div
						className={`flex items-center cursor-pointer hover:text-primary-700 ease-in duration-75 hover:font-bold ${
							activeModel === model.name ? menuActiveClass : ""
						}`}
						onClick={() => handleModelLinkClick(model)}
					>
						<FontAwesomeIcon
							icon={icon({
								name: "database",
								style: "solid",
							})}
							className="text-md mr-3 ml-2"
						/>
						<div className="text-lg">{model.name}</div>
					</div>
				))}
			</div>
			<Link
				to={`/workspace/${projectName}/flows`}
				className={`flex text-gray-400 text-lg font-bold mt-8 cursor-pointer hover:text-primary-700 ease-in duration-75 hover:font-bold ${
					location.pathname.toLowerCase() ===
					`/workspace/${projectName}/flows`.toLowerCase()
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
						to={`/workspace/${projectName}/flows/${flow.name}`}
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
