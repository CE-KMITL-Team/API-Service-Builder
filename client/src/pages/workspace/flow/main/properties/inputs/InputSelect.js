import React from "react";

export default function InputSelect({
	title,
	description,
	items = [],
	controller,
	underline = false,
}) {
	return (
		<div className="mt-4 input group text-lg">
			<div className="title text-primary-900 font-bold">{title}</div>
			<div className="description mb-2">{description}</div>
			<select
				onChange={(e) => controller(e.target.value)}
				className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
			>
				{items.map((item) => {
					return <option value={item}>{item}</option>;
				})}
			</select>
			{underline && <hr className="my-5 w-full border-gray-400 py-0" />}
		</div>
	);
}
