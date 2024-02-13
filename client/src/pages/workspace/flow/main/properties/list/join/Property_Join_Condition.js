import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProperty } from "../../../../../../../actions/flowActions"; // Replace with your actual path
import InputCondition from "../../inputs/InputCondition";

const defaultValue_conditions = [];

export default function Property_Join_Condition() {
	const dispatch = useDispatch();

	const nodeStore = useSelector((state) => state.focusNode.flowProperty);
	const currentID = useSelector(
		(state) => state.focusNode?.currentNode?.id ?? 0
	);

	// Input for Join Conditions
	const [joinConditions, setJoinConditions] = useState(
		defaultValue_conditions
	);
	useEffect(() => {
		dispatch(saveProperty({ joinConditions }));
	}, [joinConditions]);

	// Load Default Data
	useEffect(() => {
		const { joinConditions } = nodeStore[currentID]?.property || {};
		setJoinConditions(joinConditions ?? defaultValue_conditions);
	}, [currentID]);

	return (
		<InputCondition
			title="Join Condition"
			description={"User join to Customers on"}
			controller={setJoinConditions}
			defaultValue={joinConditions}
		></InputCondition>
	);
}
