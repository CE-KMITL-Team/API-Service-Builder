import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProperty } from "../../../../../../../actions/flowActions"; // Replace with your actual path
import InputSelect from "../../inputs/InputSelect";
import Method_Query from "./method/Method_Query";
import Method_Delete from "./method/Method_Delete";
import Method_Insert from "./method/Method_Insert";
import Method_Update from "./method/Method_Update";
import {
	fetchGetModelByName,
	fetchGetModelDetail,
} from "../../../../../../../actions/modelActions";
import workspaceUtils from "../../../../../../../utils/workspaceUtils";

const defaultValue_method = "Query";

export default function Property_Model_Function() {
	const [modelFields, setModelFields] = useState([]);

	const dispatch = useDispatch();

	const nodeStore = useSelector((state) => state.focusNode.flowProperty);
	const currentID = useSelector(
		(state) => state.focusNode?.currentNode?.id ?? 0
	);
	const currentNode = useSelector(
		(state) => state.focusNode?.currentNode ?? {}
	);

	// Input for Method
	const [method, setMethod] = useState(defaultValue_method);
	useEffect(() => {
		dispatch(saveProperty({ method }));
	}, [method]);

	async function initState() {
		if (currentNode?.data?.ref ?? "" === "database") {
			try {
				const data = await dispatch(
					fetchGetModelByName(
						currentNode?.data?.model ?? "",
						workspaceUtils.getID()
					)
				);

				if (data.status === true) {
					setModelFields(data.data.tables);

					console.log(data.data.tables);
				} else {
					setModelFields([]);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}
	}

	// Load Default Data
	useEffect(() => {
		const { method } = nodeStore[currentID]?.property || {};
		setMethod(method ?? defaultValue_method);
	}, [currentID]);

	// Save Default Property
	useEffect(() => {
		dispatch(saveProperty({ method }));
		initState();
	}, []);

	return (
		<>
			{/* InputSelect for Method */}
			<InputSelect
				title="Method"
				items={["Query", "Delete", "Insert", "Update"]}
				underline={true}
				controller={setMethod}
				defaultValue={method}
			></InputSelect>

			{/* Render the respective method component based on the selected method */}
			{method === "Query" && (
				<Method_Query columnList={modelFields}></Method_Query>
			)}
			{method === "Delete" && (
				<Method_Delete columnList={modelFields}></Method_Delete>
			)}
			{method === "Insert" && (
				<Method_Insert columnList={modelFields}></Method_Insert>
			)}
			{method === "Update" && (
				<Method_Update columnList={modelFields}></Method_Update>
			)}
		</>
	);
}
