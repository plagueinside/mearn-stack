import { GET_ITEMS, ADD_ITEM, CREATE_ITEM, ITEMS_LOADING } from '../constants';

const initialState = {
	steps: [],
	loading: false,
	error: false, 
	end: false
}

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ITEMS:
			return {
				...state,
				steps: action.payload,
				loading: false
			}
		case CREATE_ITEM:
			return {
				...state,
				steps: [action.payload.data],
				error: action.payload.error,
				end: action.payload.end
			}
		case ADD_ITEM:
			return {
				...state,
				steps: [action.payload]
			}
		case ITEMS_LOADING:
			return {
				...state,
				loading: true
			}
		default:
			return state;
	}
}