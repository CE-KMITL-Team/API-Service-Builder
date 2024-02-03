import { useDrop } from "react-dnd";
import FlowNode from "./nodes/FlowNode";

function FlowDrop({ appendCondi, onDrop }) {
	//drop node
	const [{ draggedItem, isOver, canDrop }, drop] = useDrop({
		accept: "FLOW_NODE",
		drop: (item) => {
			onDrop((prevElements) => {
				const newItem = {
					id: Date.now(),
					...item,
					...(item.type === "condition" ? { isTrue: [] } : {}),
					...(item.type === "condition" ? { isFalse: [] } : {}),
				};

				const appendDataById = (elements, targetId, newItem, way) => {
					return elements.map((element) => {
						if (element.id === targetId) {
							// If the target element is found, append data based on the way
							return {
								...element,
								...(way
									? { isTrue: [...element.isTrue, newItem] }
									: {
											isFalse: [
												...element.isFalse,
												newItem,
											],
									  }),
							};
						} else if (
							(element.isTrue && element.isTrue.length > 0) ||
							(element.isFalse && element.isFalse.length > 0)
						) {
							// If the element has nested arrays, recursively search inside them
							return {
								...element,
								isTrue: appendDataById(
									element.isTrue || [],
									targetId,
									newItem,
									way
								),
								isFalse: appendDataById(
									element.isFalse || [],
									targetId,
									newItem,
									way
								),
							};
						} else {
							// If the element is not the target and doesn't have nested arrays, return it unchanged
							return element;
						}
					});
				};

				if (appendCondi) {
					// Use the appendDataById function to update the elements
					const updatedElements = appendDataById(
						prevElements,
						appendCondi.id,
						newItem,
						appendCondi.way
					);
					return updatedElements;
				} else {
					// Append the new item to the main array
					return [...prevElements, newItem];
				}
			});
		},
		collect: (monitor) => ({
			draggedItem: monitor.getItem(),
			isOver: !!monitor.isOver(),
			canDrop: !!monitor.canDrop(),
		}),
	});

	return (
		<div ref={drop} className="drop-area">
			{isOver ? (
				<>
					<FlowNode
						key={draggedItem.id}
						name={draggedItem.name}
						type={draggedItem.type}
						icon={draggedItem.icon}
						using={true}
					/>
				</>
			) : (
				<div
					className={`duration-150 rounded-md px-5 py-2 flex justify-center items-center border-2 border-dotted border-primary-700 text-primary-800 bg-primary-900 bg-opacity-10 ${
						canDrop ? "opacity-1" : "opacity-0"
					}`}
				>
					Drop here
				</div>
			)}
		</div>
	);
}

export default FlowDrop;
