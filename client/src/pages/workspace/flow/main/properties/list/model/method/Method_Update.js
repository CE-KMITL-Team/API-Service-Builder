import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import InputCondition from "../../../inputs/InputCondition";
import InputText from "../../../inputs/InputText";

export default function Method_Update() {
	const [value1, setValue1] = useState("$");
	const [value2, setValue2] = useState("$");
	const [value3, setValue3] = useState("$");
	const [value4, setValue4] = useState("$");

	return (
		<>
			<Tab.Group>
				<Tab.List
					className={({ selected }) => {
						return `flex font-bold text-lg mb-3 w-full justify-between`;
					}}
				>
					{["Data", "Condition"].map((key) => (
						<Tab
							key={key}
							className={({ selected }) => {
								return `${
									selected
										? "text-black flex-1 border-t-2 border-x-2 border-gray-400/30 rounded-t-md"
										: "text-gray-600/40 bg-gray-400/30 p-3 flex-1 scale-90 translate-y-1 rounded-t-md"
								}`;
							}}
						>
							{key}
						</Tab>
					))}
				</Tab.List>
				<Tab.Panels>
					{/* Data Panel */}
					<Tab.Panel>
						<>
							<InputText
								title="Update Column"
								description={
									<div className="font-bold">id</div>
								}
								placeholder="value"
								defaultValue={value1}
								controller={setValue1}
							></InputText>
							<InputText
								description={
									<div className="font-bold">Firstname</div>
								}
								placeholder="value"
								defaultValue={value2}
								controller={setValue2}
							></InputText>
							<InputText
								description={
									<div className="font-bold">Lastname</div>
								}
								placeholder="value"
								defaultValue={value3}
								controller={setValue3}
							></InputText>
							<InputText
								description={
									<div className="font-bold">Password</div>
								}
								placeholder="value"
								defaultValue={value4}
								controller={setValue4}
								underline={true}
							></InputText>
						</>
					</Tab.Panel>

					{/* Conditon Panel */}
					<Tab.Panel>
						<InputCondition title="Update Condition"></InputCondition>
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</>
	);
}
