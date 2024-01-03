import React, { useEffect, useState } from "react";
import { getTemplates } from "../../services/workspaceService";
import { fetchCreateWorkspace } from "../../actions/workspaceActions";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Workspace() {
	const [template, setTemplate] = useState([]);
	const [projectName, setProjectName] = useState("");
	const [selectedTemplateId, setSelectedTemplateId] = useState("-1");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	//initState
	async function initState() {
		try {
			const templates = await getTemplates();
			setTemplate(templates);
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		initState();
	}, []);

	//Submit
	async function onSubmit() {
		dispatch(fetchCreateWorkspace(projectName, selectedTemplateId)).then(
			(val) => {
				if (val !== false) {
					navigate(`/workspace/${val.workspace_id}/myapi`);
				}
			}
		);
	}

	return (
		<div className="create-project flex justify-center items-center w-full whitespace-nowrap bg-gray-600">
			<div className="box flex shadow-md w-2/4 h-2/4 min-h-[384px]">
				<div className="left flex-1 bg-dark text-white pt-5 px-0">
					<div className="title text-xl font-bold px-10 pl-7">
						Create Project
					</div>
					<hr className="mb-3 mt-5 border-gray-600" />
					<div className="group px-10 pl-7">
						<ol>
							<div className="text-lg">Template</div>
							<ul className="ps-5 mt-2 space-y-1 list-disc list-inside leading-loose">
								{template.map((val) => (
									<li
										key={val.id}
										className="cursor-pointer hover:underline"
									>
										{val.name}
									</li>
								))}
							</ul>
						</ol>
					</div>
				</div>
				<div className="right flex-grow flex items-center justify-center bg-white">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							onSubmit();
						}}
						className="w-full"
					>
						<div className="group flex flex-col items-center justify-center p-10 w-full">
							<div className="text-2xl font-bold">
								Create New Project
							</div>
							<div className="text-gray-500">
								Create your Workspace to build API
							</div>
							<div className="group w-full mt-4">
								<label
									htmlFor="project-name"
									className="block mb-1 text-md font-medium text-gray-900"
								>
									Project Name
								</label>
								<input
									type="text"
									id="project-name"
									className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
									placeholder="My_New_Project"
									required
									onChange={(e) =>
										setProjectName(e.target.value)
									}
								/>
							</div>
							<div className="group w-full mt-2">
								<label
									htmlFor="template"
									className="block mb-1 text-md font-medium text-gray-900"
								>
									Template
								</label>
								<select
									className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
									onChange={(e) =>
										setSelectedTemplateId(e.target.value)
									}
								>
									<option value="-1">
										- Not use template -
									</option>
									{template.map((val) => (
										<option key={val.id} value={val.id}>
											{val.name}
										</option>
									))}
								</select>
							</div>
							<button className="bg-primary-900 text-white hover:bg-primary-800 rounded-sm py-2 text-lg shadow-md px-8 w-fit mt-8 max-w-lg">
								Create Project
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Workspace;
