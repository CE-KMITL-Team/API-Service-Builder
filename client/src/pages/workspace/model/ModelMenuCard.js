import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import modelUtils from "../../../utils/modelUtils";

function ModelMenuCard({ data }) {
	const [idParam, setIdParam] = useState(null);

	const { projectName, activeModel } = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	const handleModelLinkClick = (modelName) => {
		modelUtils.setCurrent(data);

		navigate(`/workspace/${projectName}/model/${modelName}`);
	};

	const handleModelEditLinkClick = (modelID) => {
		modelUtils.setCurrent(data);

		navigate(`/workspace/${projectName}/editModel?id=${modelID}`);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const id = urlParams.get("id");

		setIdParam(id);
	}, [location]);

	return (
		<div className="card text-black flex items-center cursor-pointer">
			<div
				onClick={() => handleModelLinkClick(data.name)}
				className={`group flex-1 ${
					`${idParam}` === `${data.id}` || data.name === activeModel
						? "text-primary-800"
						: ""
				}`}
			>
				<div className="group-hover:text-primary-900">
					<div className="title text-lg font-bold leading-5">
						{data.name}
					</div>
					<div className="title text-md text-gray-600 group-hover:text-primary-800">
						{data.description}
					</div>
				</div>
			</div>
			<div className="p-3 justify-center cursor-pointer text-primary-900 flex items-center gap-x-5 hover:text-primary-700 duration-100">
				<div onClick={() => handleModelEditLinkClick(data.id)}>
					<FontAwesomeIcon
						icon={icon({
							name: "pen-to-square",
							style: "solid",
						})}
						className="scale-105 opacity-90 cursor-pointer duration-75 text-orange-500 hover:text-orange-700"
					/>
				</div>
				<Link>
					<FontAwesomeIcon
						icon={icon({
							name: "trash",
							style: "solid",
						})}
						className="scale-105 opacity-90 cursor-pointer duration-75 text-red-500 hover:text-red-700"
					/>
				</Link>
			</div>
		</div>
	);
}

export default ModelMenuCard;
