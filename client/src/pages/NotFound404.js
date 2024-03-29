import React from "react";
import { Link } from "react-router-dom";

function NotFound404() {
	return (
		<div className="relative flex mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-full">
			<div className="left flex-1 flex flex-col justify-center pt-48 pb-48">
				<h1 className="text-5xl font-bold text-red-400">OOPS !</h1>
				<h1 className="text-5xl font-bold text-red-400 mt-3">
					Page Not Found
				</h1>
				<div className="text-xl text-gray-500 mt-6">
					We couldn't find the page you are looking for.
				</div>
				<Link to="/home" className="no-underline">
					<button className="bg-red-400 text-white hover:bg-red-500 rounded-sm px-3 py-2 text-lg shadow-md px-8 w-fit mt-8 max-w-lg">
						Go back to homepage
					</button>
				</Link>
			</div>
			<div className="right flex items-end justify-end flex-1 relative">
				<img
					src="/assets/images/404Notfound-icon.png"
					alt=""
					className="w-fit absolute -bottom-6"
				/>
			</div>
		</div>
	);
}

export default NotFound404;
