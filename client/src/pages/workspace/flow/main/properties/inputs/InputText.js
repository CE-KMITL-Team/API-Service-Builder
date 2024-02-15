import React, { useEffect, useState } from "react";

export default function InputText({
	title = "",
	description = "",
	defaultValue = "",
	placeholder = "",
	type = "text",
	required = true,
	underline = false,
	controller,
}) {
	const [value, setValue] = useState(defaultValue);

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	return (
		<div className="mt-4 input group text-lg">
			<div className="title text-primary-900 font-bold">{title}</div>
			<div className="description">{description}</div>
			<input
				className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				type={type}
				required={required}
				placeholder={placeholder}
				onChange={(e) => {
					setValue(e.target.value);
					controller(e.target.value);
				}}
				value={type !== "number" ? value : parseInt(value ?? 0)}
			/>
			{underline && <hr className="my-5 w-full border-gray-400 py-0" />}
		</div>
	);
}
