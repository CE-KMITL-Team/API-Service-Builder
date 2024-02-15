import React, { useState, useEffect } from "react";
import InputSelect from "../../../inputs/InputSelect";
import InputText from "../../../inputs/InputText";
import InputCondition from "../../../inputs/InputCondition";
import { useDispatch, useSelector } from "react-redux";
import { saveProperty } from "../../../../../../../../actions/flowActions";

const defaultValue_orderBy = "";
const defaultValue_direction = "ASC";
const defaultValue_limit = "";
const defaultValue_noLimit = true;

export default function Method_Query({ columnList }) {
	const dispatch = useDispatch();

	const nodeStore = useSelector((state) => state.focusNode.flowProperty);
	const currentID = useSelector(
		(state) => state.focusNode?.currentNode?.id ?? 0
	);

	// Input for Order By
	const [orderBy, setOrderBy] = useState(defaultValue_orderBy);
	useEffect(() => {
		dispatch(saveProperty({ queryOrderBy: orderBy }));
	}, [orderBy]);

	// Input for Direction
	const [direction, setDirection] = useState(defaultValue_direction);
	useEffect(() => {
		dispatch(saveProperty({ queryDirection: direction }));
	}, [direction]);

	// Input for Limit
	const [limit, setLimit] = useState(defaultValue_limit);
	useEffect(() => {
		dispatch(saveProperty({ queryLimit: limit }));
	}, [limit]);

	// Input for No Limit Checkbox
	const [noLimit, setNoLimit] = useState(defaultValue_noLimit);
	useEffect(() => {
		dispatch(saveProperty({ queryNoLimit: noLimit }));
	}, [noLimit]);

	// Input for Query Conditions
	const [queryConditions, setQueryConditions] = useState([]);
	useEffect(() => {
		dispatch(saveProperty({ queryConditions: queryConditions }));
	}, [queryConditions]);

	// Load Default Data
	useEffect(() => {
		const {
			queryConditions,
			queryOrderBy,
			queryDirection,
			queryLimit,
			queryNoLimit,
		} = nodeStore[currentID]?.property || {};
		setOrderBy(queryOrderBy ?? defaultValue_orderBy);
		setDirection(queryDirection ?? defaultValue_direction);
		setLimit(queryLimit ?? defaultValue_limit);
		setNoLimit(queryNoLimit ?? defaultValue_noLimit);
		setQueryConditions(queryConditions || []);
	}, [currentID]);

	return (
		<>
			{/* InputSelect for Order By */}
			<InputSelect
				title="Order by"
				description="Column name"
				items={[...columnList].map((item) => item.name)}
				controller={setOrderBy}
				defaultValue={orderBy}
			></InputSelect>

			{/* InputSelect for Direction */}
			<InputSelect
				description="Direction"
				items={["ASC", "DESC"]}
				controller={setDirection}
				defaultValue={direction}
				underline={true}
			></InputSelect>

			{/* InputText for Limit */}
			<InputText
				title="Limit"
				placeholder="limit data"
				type="number"
				controller={setLimit}
				defaultValue={limit}
			></InputText>

			{/* Checkbox for No Limit */}
			<div className="group mt-3 ml-1">
				<input
					className="mr-2"
					id="limit"
					type="checkbox"
					checked={noLimit}
					onChange={() => setNoLimit(!noLimit)}
				/>
				<label htmlFor="optional">no limit</label>
			</div>

			<hr className="my-5 w-full border-gray-400 py-0" />

			{/* InputCondition for Query Conditions */}
			<InputCondition
				title="Query Condition"
				controller={setQueryConditions}
				defaultValue={queryConditions}
			></InputCondition>
		</>
	);
}
