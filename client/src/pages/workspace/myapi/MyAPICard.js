import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Dropdown from "../../../components/Dropdown";
import { fetchDeleteFlows } from "../../../actions/flowActions";
import workspaceUtils from "../../../utils/workspaceUtils";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function MyAPICard({ data, reload }) {
	const menuItems = [
		{
			label: (
				<>
					<FontAwesomeIcon
						icon={icon({
							name: "pen-to-square",
							style: "solid",
						})}
						className="text-lg w-8 text-gray-500"
					/>
					Edit
				</>
			),
			link: () => onEdit(),
		},
		{
			label: (
				<>
					<FontAwesomeIcon
						icon={icon({
							name: "trash",
							style: "solid",
						})}
						className="text-lg w-8 text-gray-500"
					/>
					Delete
				</>
			),
			link: (id) => onDelete(),
		},];
	const { projectName } = useParams();
	const navigate = useNavigate();
	function onEdit() {
		navigate(`/workspace/${projectName}/flows/${data.name}`);
	}
	const dispatch = useDispatch();
	async function onDelete() {
		try {
			await dispatch(
				fetchDeleteFlows(workspaceUtils.getID(), data.id)
			);

			reload();

		} catch (error) {
			console.error("Error deleting data:", error);
		}
	}

	return (
		<div className="bg-dark text-white w-full rounded-lg p-3 px-5 flex justify-between">
			<div className="detail flex gap-x-7 items-center">
				<div className="path font-bold">{data.API}</div>
				<div className="path text-gray-400">{data.description}</div>
			</div>
			<div className="group relative tools">

				<Dropdown menu={menuItems} background="">
					<div className="text hover:text-primary-700 hover:scale-110 duration-100 flex items-center mr-3 cursor-pointer text-primary-900 z-1">Options</div>
					<FontAwesomeIcon
						icon={icon({ name: "ellipsis-vertical", style: "solid" })}
						className="scale-125 cursor-pointer text-primary-900 "
					/>
				</Dropdown>
			</div>
		</div>
	);
}

export default MyAPICard;
