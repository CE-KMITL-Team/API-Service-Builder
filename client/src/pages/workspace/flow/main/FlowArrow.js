function FlowArrow({ direction }) {
	if (direction === "one-way") {
		return (
			<div class="relative bg-gray-400 h-9 w-0.5">
				<div
					class="absolute w-2 h-2 border-r-2 border-t-2 border-gray-400 left-1/2 bottom-0"
					style={{
						transform: "translatex(-50%) rotate(135deg)",
					}}
				></div>
			</div>
		);
	} else if (direction === "two-way") {
		return (
			<div className="arrow flex justify-evenly w-full gap-x-10">
				<div class="relative bg-gray-400 h-12 w-0.5 rotate-45">
					<div
						class="absolute w-2 h-2 border-r-2 border-t-2 border-gray-400 left-1/2 bottom-0"
						style={{
							transform: "translatex(-50%) rotate(135deg)",
						}}
					></div>
				</div>
				<div class="relative bg-gray-400 h-12 w-0.5 -rotate-45">
					<div
						class="absolute w-2 h-2 border-r-2 border-t-2 border-gray-400 left-1/2 bottom-0"
						style={{
							transform: "translatex(-50%) rotate(135deg)",
						}}
					></div>
				</div>
			</div>
		);
	}
}

export default FlowArrow;
