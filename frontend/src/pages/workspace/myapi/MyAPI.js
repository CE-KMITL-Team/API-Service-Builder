import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import MyAPICard from "./MyAPICard";
import MyAPITest from "./MyAPITest";

function MyAPI() {
	const data = [
		{
			id: 1,
			path: "/user/{id}",
			description: "ใช้สำหรับ login เข้าใช้งาน",
		},
		{
			id: 2,
			path: "/Book/{id}",
			description: "ใช้สำหรับ ดึงข้อมูลหนังสือ...",
		},
	];

	return (
		<div className="pl-5 w-full ">
			<div className="workspace flex w-full gap-x-12 h-full">
				<div className="api w-1/2 pt-5">
					<div className="title flex gap-x-3 w-full items-center">
						<div className=" text-xl">
							<FontAwesomeIcon
								icon={icon({
									name: "plug",
									style: "solid",
								})}
								className="text-lg w-8"
							/>
						</div>
						<h1 className=" text-2xl font-bold">My API</h1>
					</div>
					<div className="list mt-3 flex flex-col gap-y-5">
						{data.length !== 0 ? (
							data.map((val) => (
								<MyAPICard data={val}></MyAPICard>
							))
						) : (
							<div className="ml-11 text-gray-700">You need to create api first . . .</div>
						)}
					</div>
				</div>
				<div className="test w-1/2 bg-grey p-5 border-solid border-l-2 border-gray-400 h-full">
					<MyAPITest />
				</div>
			</div>
		</div>
	);
}

export default MyAPI;
