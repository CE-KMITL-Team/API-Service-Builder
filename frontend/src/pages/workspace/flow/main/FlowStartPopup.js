import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Modal from "react-modal";

function FlowStartPopup({ isOpen, onRequestClose }) {
	return (
		<Modal
			isOpen={isOpen}
			overlayClassName="z-50 fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
			className="z-50 bg-white w-1/3 p-6 rounded-md sm:w-2/3 md:w-4/5 lg:w-2/5"
		>
			<div className="flex justify-between">
				<h1 className="text-xl text-black font-bold">Settings Flows</h1>
				<button
					onClick={onRequestClose}
					className="text-gray-500 hover:text-gray-700"
				>
					<FontAwesomeIcon
						icon={icon({
							name: "times",
							style: "solid",
						})}
					/>
				</button>
			</div>
			<hr className="w-full border-gray-400 my-4" />
			<div className="flex gap-x-10">
				<div className="relative rounded-md h-full flex-1">
					<div className="group w-full">
						<label
							htmlFor="name"
							className="block mb-2 text-md font-medium text-gray-900 text-left"
						>
							Name
						</label>
						<input
							type="text"
							id="name"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							placeholder="my_new_api"
							required
						/>
					</div>
					<div className="group w-full mt-4">
						<label
							htmlFor="name"
							className="block mb-2 text-md font-medium text-gray-900 text-left"
						>
							Description
						</label>
						<textarea
							id="request"
							rows="5"
							className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
							placeholder="API Description"
						></textarea>
					</div>
					<div className="group w-full mt-4">
						<label
							htmlFor="name"
							className="block mb-2 text-md font-medium text-gray-900 text-left"
						>
							API Path
						</label>
						<input
							type="text"
							id="name"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							placeholder="/user/login"
							required
						/>
					</div>
				</div>
				<div className="relative rounded-md flex items-end justify-center">
					<img
						src="/assets/images/flow-setting-icon.png"
						alt=""
						className="w-56"
					/>
				</div>
			</div>
		</Modal>
	);
}

export default FlowStartPopup;
