import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import Modal from "react-modal";

function WorkspaceMenuPopup({ isOpen, onRequestClose }) {
	const inputRef = useRef(null);

	const handleCopyClick = () => {
		inputRef.current.select();
		document.execCommand("copy");
	};

	return (
		<Modal
			isOpen={isOpen}
			overlayClassName="z-50 fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
			className="z-50 bg-white w-1/3 p-6 rounded-md sm:w-2/3 md:w-1/2 lg:w-1/3"
		>
			<div className="flex justify-between">
				<h1 className="text-xl text-black font-bold">API Path</h1>
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
			<div className="relative rounded-md h-full shadow-md">
				<input
					ref={inputRef}
					type="text"
					className="mt-3 mb-2 h-full block w-full rounded-md border-0 py-2.5 px-2.5 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
					value="https://www.apiservicebuilder.com/baan_skypruek.api/"
					required
					readOnly // Make the input read-only to prevent editing
				/>
				<div className="absolute inset-y-0 right-0 flex items-center justify-center text-gray-500">
					<button
						className="p-4 text-gray-600 hover:text-black duration-100"
						onClick={handleCopyClick}
					>
						<FontAwesomeIcon
							icon={icon({
								name: "copy",
								style: "regular",
							})}
						/>
					</button>
				</div>
			</div>
		</Modal>
	);
}

export default WorkspaceMenuPopup;
