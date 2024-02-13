import { FOCUS_NODE, SAVE_PROPERTY } from "../actions/flowActions";

const initialState = {
	currentNode: null,
	flowProperty: {},
};

export const flowReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOCUS_NODE:
			return {
				...state,
				currentNode: action.payload,
			};
		case SAVE_PROPERTY:
			const { property } = action.payload;

			const id = state.currentNode.id;
			const type = state.currentNode.data.ref;

			if (state.flowProperty[id]) {
				const { [id]: oldData, ...rest } = state.flowProperty;

				return {
					...state,
					flowProperty: {
						...rest,
						[id]: {
							type,
							property: {
								...state.flowProperty[id].property,
								...property,
							},
						},
					},
				};
			} else {
				return {
					...state,
					flowProperty: {
						...state.flowProperty,
						[id]: {
							type,
							property,
						},
					},
				};
			}
		default:
			return state;
	}
};
