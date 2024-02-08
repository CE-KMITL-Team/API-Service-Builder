import React, { useState } from "react";

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
	return (
		<div className="mt-4 input group text-lg">
			<div className="title text-primary-900 font-bold">{title}</div>
			<div className="description">{description}</div>
			<input
				className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				type={type}
				required={required}
				placeholder={placeholder}
				onChange={(e) => controller(e.target.value)}
				defaultValue={defaultValue}
			/>
			{underline && <hr className="my-5 w-full border-gray-400 py-0" />}
		</div>
	);
}
