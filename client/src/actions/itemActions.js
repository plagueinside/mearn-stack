import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, CREATE_ITEM, ITEMS_LOADING } from '../constants';

export const getSteps = () => dispatch => {
	dispatch(setItemsLoading());
	axios
		.get('/api/steps')
		.then(res => dispatch({
			type: GET_ITEMS,
			payload: res.data
		}))
};

export const createStep = () => dispatch => {
	dispatch(setItemsLoading());
	axios.post(`/api/steps`)
		.then(res => dispatch({
			type: ADD_ITEM,
			payload: res.data
		}))
};

export const nextStep = (answer, step) => dispatch => {
	axios
		.post('/api/steps/next', {answer, step})
		.then(res => dispatch({
			type: CREATE_ITEM,
			payload: {data: res.data.data, error: res.data.error}
		}))
};

export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING
	}
}	