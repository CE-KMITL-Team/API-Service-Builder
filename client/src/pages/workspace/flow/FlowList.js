import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function FlowList() {
	const flowLists = [
		{
			id: 0,
			name: "User Login",
			description: "ใช้สำหรับ login เข้าใช้งาน",
			path: "/user/{id}",
		},
		{
			id: 1,
			name: "Profile Page",
			description: "แสดงข้อมูลโปรไฟล์ของผู้ใช้",
			path: "/profile/{username}",
		},
		{
			id: 2,
			name: "Product Details",
			description: "แสดงรายละเอียดสินค้า",
			path: "/product/{productId}",
		},
		{
			id: 3,
			name: "Cart Checkout",
			description: "ดำเนินการสั่งซื้อและชำระเงิน",
			path: "/cart/checkout",
		},
	];

	const searchRef = useRef(null);
	const { projectName } = useParams();
	const navigate = useNavigate();

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

	const handleAddFlow = () => {
		navigate(`/workspace/${projectName}/flows/unnamedFlow`);
	};

	return (
		<div className="p-5 pl-10 pr-20 flex-1 flex flex-col h-screen">
			<div className="head items-center justify-between gap-x-10 h-12 flex">
				<div className="group flex gap-x-8">
					<h1 className="title text-2xl font-bold">Flow List</h1>
					<button
						onClick={() => handleAddFlow()}
						className="bg-primary-900 text-white hover:bg-primary-700 rounded-md px-3 py-1 flex shadow-sm items-center gap-x-3"
					>
						<FontAwesomeIcon
							icon={icon({
								name: "plus",
								style: "solid",
							})}
							className="scale-105"
						/>
						<div className="text-md">Add Flow</div>
					</button>
				</div>
				<div className="action flex gap-x-5 h-full">
					<div className="relative rounded-md shadow-sm h-full flex-1 w-full">
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
							className="h-full w-full rounded-md border-0 py-1.5 pl-12 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
			<hr className="w-full border-gray-400 my-4" />
			<div className="rounded-lg h-full bg-gray-100 overflow-hidden">
				<table className="w-full border border-collapse rounded-md">
					<thead>
						<tr>
							<th className="bg-dark text-white p-2 border border-dark-600 text-center">
								<input type="checkbox" />
							</th>
							<th className="bg-dark text-white p-2 border border-dark-600 text-left">
								Name
							</th>
							<th className="bg-dark text-white p-2 border border-dark-600 text-left">
								Description
							</th>
							<th className="bg-dark text-white p-2 border border-dark-600 text-left">
								Path
							</th>
							<th className="bg-dark text-white p-2 border border-dark-600 text-center">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{flowLists.map((flow) => (
							<tr key={flow.id}>
								<td
									align="center"
									className="border border-gray-300 p-2"
								>
									<input type="checkbox" />
								</td>
								<td className="border border-gray-300 p-2">
									{flow.name}
								</td>
								<td className="border border-gray-300 p-2">
									{flow.description}
								</td>
								<td className="border border-gray-300 p-2">
									{flow.path}
								</td>
								<td className="border border-gray-300 py-2 px-1">
									<div className="flex justify-center gap-x-5">
										<Link
											to={`/workspace/${projectName}/flows/${flow.name}`}
										>
											<FontAwesomeIcon
												icon={icon({
													name: "pen-to-square",
													style: "solid",
												})}
												className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-orange-500 hover:text-orange-700"
											/>
										</Link>
										<Link>
											<FontAwesomeIcon
												icon={icon({
													name: "trash",
													style: "solid",
												})}
												className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-red-500 hover:text-red-700"
											/>
										</Link>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default FlowList;
