import React, { useEffect, useState } from "react";
import InputCondition from "../../inputs/InputCondition";
import { useDispatch, useSelector } from "react-redux";
import { saveProperty } from "../../../../../../../actions/flowActions";

export default function Property_Condition_Settings() {
	const dispatch = useDispatch();

	const nodeStore = useSelector((state) => state.focusNode.flowProperty);
	const currentID = useSelector(
		(state) => state.focusNode?.currentNode?.id ?? 0
	);

	const [conditionValue, setConditionValue] = useState([]);
	useEffect(() => {
		dispatch(saveProperty({ condition: conditionValue }));
	}, [conditionValue]);

	// Load Default Data
	useEffect(() => {
		const { condition } = nodeStore[currentID]?.property || [];
		setConditionValue(condition ?? []);
	}, [currentID]);

	return (
		<InputCondition
			title="Condition List"
			underline="true"
			defaultValue={conditionValue}
			controller={setConditionValue}
		></InputCondition>
	);
}
