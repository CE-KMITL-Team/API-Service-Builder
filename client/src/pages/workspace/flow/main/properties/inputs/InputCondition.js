import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function InputCondition({
	title,
	description,
	conditionText = [
		"equal",
		"not equal",
		"more than",
		"less than",
		"equal or more than",
		"equal or less than",
	],
}) {
	const [conditionList, setConditionList] = useState([
		{
			left: "",
			right: "",
			condition: "equal",
		}
	]);

	const addCondition = () => {
		setConditionList((prevConditions) => [
			...prevConditions,
			{
				left: "",
				right: "",
				condition: "",
			},
		]);
	};

	const deleteCondition = (index) => {
		setConditionList((prevConditions) =>
			prevConditions.filter((_, i) => i !== index)
		);
	};

	const editCondition = (index, property, value) => {
		setConditionList((prevConditions) => {
			const newConditions = [...prevConditions];
			newConditions[index] = {
				...newConditions[index],
				[property]: value,
			};
			return newConditions;
		});
	};

	return (
		<div className="mt-4 input group text-lg">
			<div className="title text-primary-900 font-bold">{title}</div>
			<div className="description mb-2">{description}</div>

			{conditionList.map((condition, index) => (
				<>
					<div
						className="group flex flex-col justify-center items-center py-3 px-4 bg-gray-300 rounded-lg"
						key={index}
					>
						<div className="bar flex justify-between w-full mb-2">
							<div className="title font-bold font-2xl">
								Condition ({index + 1})
							</div>
							<button onClick={() => deleteCondition(index)}>
								<FontAwesomeIcon
									icon={icon({
										name: "xmark",
										style: "solid",
									})}
									className="text-red-600 text-2xl"
								/>
							</button>
						</div>
						<input
							className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
							type="text"
							value={condition.left}
							onChange={(e) =>
								editCondition(index, "left", e.target.value)
							}
						/>
						<div className="bg-gray-400 font-sm w-[2px]">
							&nbsp;
						</div>
						<select
							className="w-fit bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
							value={condition.condition}
							onChange={(e) =>
								editCondition(
									index,
									"condition",
									e.target.value
								)
							}
						>
							{conditionText.map((text) => (
								<option key={text} value={text}>
									{text}
								</option>
							))}
						</select>
						<div className="bg-gray-400 font-sm w-[2px]">
							&nbsp;
						</div>
						<input
							className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
							type="text"
							value={condition.right}
							onChange={(e) =>
								editCondition(index, "right", e.target.value)
							}
						/>
					</div>

					{conditionList.length !== index + 1 && (
						<div className="connect flex justify-center flex-col items-center">
							<div className="bg-gray-400 font-sm w-[2px] text-center">
								&nbsp;
							</div>
							<select className="w-fit bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2">
								<option value="and">and</option>
								<option value="or">or</option>
							</select>
							<div className="bg-gray-400 font-sm w-[2px] text-center">
								&nbsp;
							</div>
						</div>
					)}
				</>
			))}

			<button
				onClick={addCondition}
				className="w-full bg-primary-900 mt-5 text-white hover:bg-primary-700 rounded-md px-3 py-2 text-lg font-medium shadow-md"
			>
				<FontAwesomeIcon
					icon={icon({
						name: "plus",
						style: "solid",
					})}
					className="text-lg mr-2"
				/>{" "}
				Add Condition
			</button>
			<hr className="my-5 w-full border-gray-400 py-0" />
		</div>
	);
}
