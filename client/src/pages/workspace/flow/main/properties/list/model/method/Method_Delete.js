import React, { useState, useEffect } from "react";
import InputCondition from "../../../inputs/InputCondition";
import { useDispatch, useSelector } from "react-redux";
import { saveProperty } from "../../../../../../../../actions/flowActions"; // Replace with your actual path

const defaultValue_conditions = [];

export default function Method_Delete({columnList}) {
	const dispatch = useDispatch();

	const nodeStore = useSelector((state) => state.focusNode.flowProperty);
	const currentID = useSelector(
		(state) => state.focusNode?.currentNode?.id ?? 0
	);

	// Input for Delete Conditions
	const [conditions, setConditions] = useState(defaultValue_conditions);
	useEffect(() => {
		dispatch(saveProperty({ deleteConditions: conditions }));
	}, [conditions]);

	// Load Default Data
	useEffect(() => {
		const { deleteConditions } = nodeStore[currentID]?.property || {};
		setConditions(deleteConditions || defaultValue_conditions);
	}, [currentID]);

	return (
		<>
			{/* InputCondition for Delete Conditions */}
			<InputCondition
				title="Delete Condition"
				controller={setConditions}
				defaultValue={conditions}
			></InputCondition>
		</>
	);
}
