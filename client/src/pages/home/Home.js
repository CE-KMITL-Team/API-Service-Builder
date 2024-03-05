import React, { useEffect, useRef } from "react";

function Home() {
	const searchRef = useRef(null);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if ((event.ctrlKey || event.metaKey) && event.key === "k") {
				event.preventDefault();
				searchRef.current.focus();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<div className="home text-center mt-14 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pb-96 mb-24">
			<div className="title px-10">
				<h1 className="text-4xl font-bold tracking-tight text-gray-900">
					What is
					<span className="text-primary-700">
						&nbsp;API Service Builder
					</span>
				</h1>
				<h2 className="text-2xl tracking-tight text-gray-600 mt-3">
					streamlines API development, saving time and resources. It
					eliminates the need for
					<br /> extensive back-end coding knowledge and offers
					databases, APIs, and service hosts.
				</h2>
				<div className="action mt-12 flex justify-center">
					<button className="bg-primary-900 text-white hover:bg-primary-700 rounded-md px-3 py-2 text-lg font-medium shadow-md">
						Get Started
					</button>
					<div className="ml-12">
						<div className="relative rounded-md h-full shadow-md">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 h-full">
								<span className="text-gray-500 sm:text-sm">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="grey"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
										/>
									</svg>
								</span>
							</div>
							<input
								type="text"
								name="price"
								id="price"
								className="h-full block w-full rounded-md border-0 py-1.5 pl-12 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
								placeholder="Quick search..."
								ref={searchRef}
							/>
							<div className="absolute inset-y-0 right-0 flex items-center text-gray-500">
								<p className="pr-4">
									Ctrl
									<span className="font-medium">+ K</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="relative pb-6">
				<div className="group flex justify-between w-full items-center mt-24 gap-x-10 absolute">
					<article className="flex max-w-xl flex-col items-start justify-between w-2/5">
						<div className="group relative p-5 shadow-lg bg-white rounded-lg">
							<p className="text-md leading-6 text-gray-600">
								Creating APIs is complex, but "API Service
								Builder" simplifies it with code-free database
								creation, API design, and hosting services,
								removing server setup concerns.
							</p>
						</div>
					</article>
					<div className="flex max-w-xl flex-col justify-between shadow-lg rounded-md w-full">
						<img
							src="assets/images/flow-img.png"
							alt=""
							style={{
								border: "2px solid gray",
								shadow: "5px 10px gray",
							}}
						/>
						{/* <iframe
							className="w-full h-96 rounded-md"
							src="https://www.youtube.com/embed/BUZiRtGRHj0"
							allowFullScreen
							title="YouTube Video"
							
						></iframe> */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
