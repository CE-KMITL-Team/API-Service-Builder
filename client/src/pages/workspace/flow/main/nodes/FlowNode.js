import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { saveFocusNode } from "../../../../../actions/flowActions";

function FlowNode({
	id,
	name,
	type,
	icon,
	using = false,
	allowDrag = true,
	children,
}) {
	const dispatch = useDispatch();
	const currentNode = useSelector((state) => state.focusNode.currentNode);

	const [{ isDragging }, drag, preview] = useDrag(() => ({
		type: "FLOW_NODE",
		canDrag: allowDrag,
		item: { name, type, icon },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	const handleClick = () => {
		dispatch(
			saveFocusNode({
				id,
				name,
				type,
			})
		);
	};

	return using === false ? (
		<>
			<DragPreviewImage connect={preview} />
			{/* Show in node frame */}
			<div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
				<div
					ref={drag}
					className="rounded-md bg-white text-black flex items-center p-2 px-3 border border-gray-400 cursor-pointer"
				>
					<FontAwesomeIcon icon={icon} className="mr-3 w-4" />
					<span className="whitespace-nowrap">{name}</span>
				</div>
				{children}
			</div>
		</>
	) : (
		//Show in workspace
		<>
			<div className="h-fit flex flex-col items-center">
				<div
					id={`FlowNode-${id}`}
					onClick={handleClick}
					className={`${
						id === (currentNode?.id ?? 0)
							? "outline-primary-900 outline-dashed"
							: ""
					} w-fit rounded-md bg-white text-black flex items-center p-2 px-3 border border-gray-400 cursor-pointer`}
				>
					<FontAwesomeIcon icon={icon} className="mr-3 w-4" />
					<span className="whitespace-nowrap">{name}</span>
				</div>
				{children}
			</div>
		</>
	);
}

export default FlowNode;
