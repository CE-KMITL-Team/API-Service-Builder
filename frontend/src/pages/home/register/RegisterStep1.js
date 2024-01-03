import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkEmailAvailability } from "../../../services/authService";

function RegisterStep1() {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState({ error: null });

	async function onSubmit() {
		try {
			const emailAvailabilityResponse = await checkEmailAvailability(
				email
			);

			if (emailAvailabilityResponse.status) {
				navigate("/Register/2", { state: { email: email } });
			} else {
				setErrorMessage({ error: emailAvailabilityResponse.msg });
			}
		} catch (error) {
			setErrorMessage({ error: error });
		}
	}

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
					className="mb-4 h-auto w-16"
					src="/assets/icon-dark.png"
					alt="API Forge"
				/>
				<div className="title text-3xl font-bold text-center">
					Create your free workspace
				</div>
				<div className="subtitle text-md text-gray-500 text-center">
					Enter your email below to create your workspace.
				</div>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit();
					}}
					className="w-full mt-10 max-w-lg"
				>
					<div className="group w-full">
						<label
							htmlFor="email"
							className="block mb-2 text-md font-medium text-gray-900 text-left"
						>
							Your work email
						</label>
						<input
							type="email"
							id="email"
							className={`${
								errorMessage.error != null
									? "border-red-500"
									: ""
							} bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
							placeholder="yourmail@gmail.com"
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
						{errorMessage.error != null ? (
							<div className="error tracking-wide text-red-500 text-left w-full">
								{errorMessage.error}
							</div>
						) : (
							""
						)}
					</div>

					<button
						className="bg-primary-900 text-white hover:bg-primary-700 rounded-sm px-3 py-2 text-lg shadow-md w-full mt-8 max-w-lg"
						type="submit"
					>
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
}

export default RegisterStep1;
