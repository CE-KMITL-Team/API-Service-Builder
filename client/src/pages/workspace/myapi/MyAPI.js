import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import MyAPICard from "./MyAPICard";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import MyAPITest from "./MyAPITest";
import workspaceUtils from "../../../utils/workspaceUtils";
import { fetchGetFlows, fetchDeleteFlows } from "../../../actions/flowActions";


function MyAPI() {
	// ];
	const [flowLists, setFlowlist] = useState([]);
	const dispatch = useDispatch();

	async function initialState() {
		try {
			const data = await dispatch(
				fetchGetFlows(workspaceUtils.getID())
			);


			if (data.status === true) {
				setFlowlist(data.data);

			}
			else {
				setFlowlist([]);

			}

		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	useEffect(() => {
		initialState()
	}, [])


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
						{flowLists.length !== 0 ? (
							flowLists.map((val) => (
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
