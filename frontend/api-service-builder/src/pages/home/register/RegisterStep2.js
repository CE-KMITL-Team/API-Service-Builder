import React from "react";

function RegisterStep2() {
	return (
		<div className="w-screen h-screen flex">
			<div className="left bg-grey flex-1 flex items-center justify-center">
				<img
					src="/assets/images/register-step-2.png"
					alt=""
					className="w-2/3"
				/>
			</div>
			<div className="right flex-1 flex flex-col items-center justify-center px-10">
				<div className="container max-w-xl p-10">
					<div className="title text-3xl font-bold text-center">
						Almost done !
					</div>
					<div className="subtitle text-md text-gray-500 text-center">
						Before we dive in,help us by entering your information.
					</div>

					<div className="flex gap-x-10 w-full max-w-lg mt-8">
						<div className="group w-full">
							<label
								for="first_name"
								className="block mb-2 text-md font-medium text-gray-900 text-left"
							>
								First Name
							</label>
							<input
								type="text"
								id="first_name"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
								placeholder="John"
								required
							/>
						</div>
						<div className="group w-full">
							<label
								for="last_name"
								className="block mb-2 text-md font-medium text-gray-900 text-left"
							>
								Last Name
							</label>
							<input
								type="text"
								id="last_name"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
								placeholder="Smith"
								required
							/>
						</div>
					</div>
					<div className="group w-full mt-5 max-w-lg">
						<label
							for="password"
							className="block mb-2 text-md font-medium text-gray-900 text-left"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-700 focus:border-primary-700 block w-full p-2.5"
							placeholder="***********"
							required
						/>
					</div>
					<hr className="mt-10"/>
					<div className="flex self-start mt-5">
						<input
							id="link-checkbox"
							type="checkbox"
							value=""
							className="w-4 h-4 text-primary-800 bg-gray-100 border-gray-300 rounded"
						/>
						<label
							for="link-checkbox"
							className="ms-2 text-sm font-medium"
						>
							I agree with the{" "}
							<a
								href="/#"
								className="text-primary-800 dark:text-primary-800 hover:underline"
							>
								terms and conditions
							</a>
							.
						</label>
					</div>
					<button className="bg-primary-900 text-white hover:bg-primary-700 rounded-sm px-3 py-2 text-lg shadow-md w-full mt-5 max-w-lg">
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
}

export default RegisterStep2;
