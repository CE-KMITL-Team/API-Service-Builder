import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../../actions/authActions";
import { useSelector } from "react-redux";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const errorMessage = useSelector((store) => store.loading.error);

	function onSubmit() {
		dispatch(fetchLogin(email, password));
	}

	return (
		<div className="w-screen h-screen flex">
			<div className="left bg-grey flex-1 flex items-center justify-center">
				<img
					src="/assets/images/login-icon.png"
					alt=""
					className="w-2/3"
				/>
			</div>
			<div className="right flex-1 flex flex-col items-center justify-center px-10">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit();
					}}
					className="container max-w-lg w-full"
				>
					<div className="w-full flex flex-col justify-center items-center">
						<img
							className="mb-4 h-auto w-16"
							src="/assets/icon-dark.png"
							alt="API Forge"
						/>
						<div className="title text-3xl font-bold text-center">
							Access your workspaces
						</div>
						<div className="group w-full mt-8">
							<label
								htmlFor="email"
								className="block mb-2 text-md font-medium text-gray-900 text-left"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								className={`${
									errorMessage != null ? "border-red-500" : ""
								} bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
								placeholder="yourmail@gmail.com"
								required
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="group w-full mt-5 max-w-lg">
							<label
								htmlFor="password"
								className="block mb-2 text-md font-medium text-gray-900 text-left"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								className={`${
									errorMessage != null ? "border-red-500" : ""
								} bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
								placeholder="************"
								required
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						{errorMessage != null ? (
							<div className="error tracking-wide text-red-500 text-left w-full">
								{errorMessage}
							</div>
						) : (
							""
						)}
						<button
							className="bg-primary-900 text-white hover:bg-primary-700 rounded-sm px-3 py-2 text-lg shadow-md w-full mt-8 max-w-lg"
							type="submit"
						>
							Login
						</button>
						<div className="ms-2 text-md text-gray-500 mt-4 w-full text-center">
							Don’t have a account? &nbsp;
							<a
								href="/Register/1"
								className="text-primary-800 dark:text-primary-800 hover:underline"
							>
								Create one here
							</a>
							.
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
