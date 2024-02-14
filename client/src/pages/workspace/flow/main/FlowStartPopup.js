import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";
import workspaceUtils from "../../../../utils/workspaceUtils";
import { useDispatch } from "react-redux";
import {
	fetchAddFlow,
	fetchEditDataFlows,
	fetchGetModelDetail,
} from "../../../../actions/flowActions";

function FlowStartPopup({ isOpen, onRequestClose }) {
	const [isNew, setIsNew] = useState(false);

	const [idFlow, setIdFlow] = useState("")
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [path, setPath] = useState("");
	

	const { projectName, activeFlow } = useParams();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const getFlowDetail = async () => {
		const response = await dispatch(fetchGetModelDetail(activeFlow));

		if (response.status) {
			setIdFlow(response.data.id)
			setName(response.data.name);
			setDescription(response.data.description);
			setPath(response.data.API);
		} else {
			navigate(`/workspace/${projectName}/flows`);
		}
	};
	useEffect(() => {
		if (activeFlow === "unnamedFlow") {
			setIsNew(true);
		} else {
			getFlowDetail();
		}
	}, []);

	const handleCancel = () => {
		onRequestClose();

		if (isNew) {
			navigate(`/workspace/${projectName}/flows`);
		}
	};


	const handleSavePopup = async (event) => {
		event.preventDefault();

		const editedData = {
			name: name,
			description: description,
			API: path,
		};
		console.log(editedData)
		console.log("asdasdas", activeFlow)
		try {
			await dispatch(fetchEditDataFlows(idFlow, editedData));
			console.log("test", idFlow, editedData)
			onRequestClose();
			navigate(`/workspace/${projectName}/flows/${activeFlow}`);
		} catch (error) {
			console.error("Error editing data:", error);
		}
	};



	const handleSave = async (event) => {
		if (isNew) {
			const response = await dispatch(
				fetchAddFlow({
					name: name,
					description: description,
					API: path,
					markdown: "",
					status: 1,
					workspace_id: workspaceUtils.getID(),
				})
			);

			if (!response.status) {
				alert(response.msg);
			} else {
				onRequestClose();
				navigate(
					`/workspace/${projectName}/flows/${response.flow_data.name}`
				);
			}
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			overlayClassName="z-40 fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
			className="z-40 bg-white w-1/3 p-6 rounded-md sm:w-2/3 md:w-4/5 lg:w-2/5"
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSavePopup(e)
					handleSave(e);
				}}
			>
				<div className="flex justify-between">
					<h1 className="text-xl text-black font-bold">
						Settings Flows
					</h1>
					{!isNew && (
						<button
							onClick={handleCancel}
							className="text-gray-500 hover:text-gray-700"
						>
							<FontAwesomeIcon
								icon={icon({
									name: "times",
									style: "solid",
								})}
							/>
						</button>
					)}
				</div>
				<hr className="w-full border-gray-400 my-4" />
				<div className="flex gap-x-10">
					<div className="relative rounded-md h-full flex-1">
						<div className="group w-full">
							<label
								htmlFor="name"
								className="block mb-2 text-md font-medium text-gray-900 text-left"
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
								placeholder="my_new_api"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="group w-full mt-4">
							<label
								htmlFor="name"
								className="block mb-2 text-md font-medium text-gray-900 text-left"
							>
								Description
							</label>
							<textarea
								id="request"
								rows="5"
								className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
								placeholder="API Description"
								required
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></textarea>
						</div>
						<div className="group w-full mt-4">
							<label
								htmlFor="name"
								className="block mb-2 text-md font-medium text-gray-900 text-left"
							>
								API Path
							</label>
							<input
								type="text"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
								placeholder="/user/login"
								required
								value={path}
								onChange={(e) => setPath(e.target.value)}
							/>
						</div>
					</div>
					<div className="relative rounded-md flex items-end justify-center">
						<img
							src="/assets/images/flow-setting-icon.png"
							alt=""
							className="w-56"
						/>
					</div>
				</div>
				<hr className="w-full border-gray-400 my-4 mt-6" />
				<div className="flex justify-end">
					<button
						className="text-gray-500 hover:text-gray-700"
						onClick={() => handleCancel()}
					>
						Cancel
					</button>
					<button
						type="submit"
						// onClick={handleSavePopup()}
						className="bg-primary-900 text-white ml-8 hover:bg-primary-700 rounded-md px-3 py-2 flex shadow-sm items-center gap-x-3"
					>
						<FontAwesomeIcon
							icon={icon({
								name: "save",
								style: "solid",
							})}
							className="scale-105"
						/>
						<div className="text-md">Save</div>
					</button>
				</div>
			</form>
		</Modal>
	);
}

export default FlowStartPopup;
