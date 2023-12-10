import React from "react";

function Workspace() {
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
								<li className="cursor-pointer hover:underline">
									Login & Register
								</li>
								<li className="cursor-pointer hover:underline">
									Buying & Selling
								</li>
								<li className="cursor-pointer hover:underline">
									E-Commerce
								</li>
							</ul>
						</ol>
					</div>
				</div>
				<div className="right flex-grow flex items-center justify-center bg-white">
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
							/>
						</div>
						<div className="group w-full mt-2">
							<label
								htmlFor="template"
								className="block mb-1 text-md font-medium text-gray-900"
							>
								Template
							</label>

							<select className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
								<option>- Not use template -</option>
								<option>Login & Register</option>
								<option>Buying & Selling</option>
								<option>E-Commerce</option>
							</select>
						</div>
						<button className="bg-primary-900 text-white hover:bg-primary-800 rounded-sm py-2 text-lg shadow-md px-8 w-fit mt-8 max-w-lg">
							Create Project
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Workspace;
