import {
	DELETE_NODE_PROPERTY,
	FOCUS_NODE,
	SAVE_PROPERTY,
} from "../actions/flowActions";

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
			const { property, force } = action.payload;

			if (force) {
				return {
					...state,
					flowProperty: property,
				};
			}

			const saveId = state.currentNode.id;
			const type = state.currentNode.data.ref;
			const model = state.currentNode.data?.model ?? undefined;

			if (state.flowProperty[saveId]) {
				const { [saveId]: oldData, ...rest } = state.flowProperty;

				return {
					...state,
					flowProperty: {
						...rest,
						[saveId]: {
							type,
							...(model !== "" &&
								model !== undefined &&
								model !== null && { model: model }),
							property: {
								...state.flowProperty[saveId].property,
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
						[saveId]: {
							type,
							property,
						},
					},
				};
			}

		case DELETE_NODE_PROPERTY:
			const { id } = action.payload;
			const newState = { ...state };

			if (newState.flowProperty[id]) {
				const { [id]: deletedNode, ...remainingFlowProperty } =
					newState.flowProperty;

				newState.flowProperty = remainingFlowProperty;

				return newState;
			}

			return state;

		default:
			return state;
	}
};
