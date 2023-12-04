import React from "react";

function RegisterStep1() {
	return (
		<div className="w-screen h-screen flex">
			<div className="left bg-grey flex-1 flex items-center justify-center">
				<img
					src="/assets/images/register-step-1.png"
					alt=""
					className="w-2/3"
				/>
			</div>
			<div className="right flex-1 flex flex-col items-center justify-center px-10">
				<img
					className="h-12 w-auto mb-3"
					src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
					alt="API Forge"
				/>
				<div className="title text-3xl font-bold text-center">
					Create your free workspace
				</div>
				<div className="subtitle text-md text-gray-500 text-center">
					Enter your email below to create your workspace.
				</div>

				<div className="group w-full mt-8 max-w-lg">
					<label
						for="email"
						className="block mb-2 text-md font-medium text-gray-900 text-left"
					>
						Your work email
					</label>
					<input
						type="text"
						id="email"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						placeholder="yourmail@gmail.com"
						required
					/>
				</div>
				<button className="bg-primary-900 text-white hover:bg-primary-700 rounded-sm px-3 py-2 text-lg shadow-md w-full mt-8 max-w-lg">
					Sign Up
				</button>
			</div>
		</div>
	);
}

export default RegisterStep1;
