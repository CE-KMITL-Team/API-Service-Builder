import React, { memo, useCallback } from "react";
import { Handle, Position, getConnectedEdges, useReactFlow } from "reactflow";
import CustomHandle from "./CustomHandle";

const ConditionNode = memo(({ data }) => {
	const useValidatorFn = () => {
		const { getNode, getEdges } = useReactFlow();

		return useCallback(
			(connection) => {
				const edges = getConnectedEdges(
					[getNode(connection.target)],
					getEdges()
				);

				return !edges.length;
			},
			[getNode, getEdges]
		);
	};

	return (
		<>
			<Handle
				type="target"
				position={Position.Top}
				isValidConnection={useValidatorFn()}
			/>
			<div className="text-[12px]">{data.label}</div>
			<Handle
				type="source"
				position={Position.Bottom}
				id="a"
				style={{
					right: "auto",
					left: "25%",
					transform: "translateX(-50%)",
				}}
			/>
			<Handle
				type="source"
				position={Position.Bottom}
				id="b"
				style={{
					right: "25%",
					left: "auto",
					transform: "translateX(50%)",
				}}
			/>
		</>
	);
});

export default ConditionNode;
