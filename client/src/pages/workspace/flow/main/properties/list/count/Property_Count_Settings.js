import React, { useEffect, useState } from "react";
import InputText from "../../inputs/InputText";
import { useDispatch, useSelector } from "react-redux";
import { saveProperty } from "../../../../../../../actions/flowActions";

const defaultValue_count = "";
const defaultValue_output = "$response";

export default function Property_Count_Settings() {
	const dispatch = useDispatch();

	const nodeStore = useSelector((state) => state.focusNode.flowProperty);
	const currentID = useSelector(
		(state) => state.focusNode?.currentNode?.id ?? 0
	);

	// Input
	const [outputValue, setOutputValue] = useState(defaultValue_output);
	useEffect(() => {
		dispatch(saveProperty({ output: outputValue }));
	}, [outputValue]);

	const [countData, setCountData] = useState(defaultValue_count);
	useEffect(() => {
		dispatch(
			saveProperty({
				count: countData,
			})
		);
	}, [countData]);

	// Load Default Data
	useEffect(() => {
		const { count, output } = nodeStore[currentID]?.property || {};
		setCountData(count ?? defaultValue_count);
		setOutputValue(output ?? defaultValue_output);
	}, [currentID]);

	return (
		<>
			<InputText
				title="Count Data"
				description="Data you want to count"
				placeholder="variable"
				defaultValue={countData}
				controller={setCountData}
				underline={true}
			></InputText>
			<InputText
				title="Output"
				description="Output variable"
				placeholder="$imageBase64"
				defaultValue={outputValue}
				controller={setOutputValue}
				underline={true}
			></InputText>
		</>
	);
}
