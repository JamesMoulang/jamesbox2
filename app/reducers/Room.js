import _ from 'underscore';
import * as Actions from '../actions/Room';

export default function User(state={
	messages: [],
	isSending: false,
	error: undefined,
}, action) {
	switch(action.type){
		case Actions.SUBMIT_MESSAGE_REQUEST:
			return Object.assign({}, state, {isSending: true, error: undefined});
		case Actions.SUBMIT_MESSAGE_SUCCESS:
			return Object.assign({}, state, {isSending: false});
		case Actions.SUBMIT_MESSAGE_FAILURE:
			return Object.assign({}, state, {isSending: false});
		case Actions.RECEIVE_MESSAGE:
			const messages = _.clone(state.messages);
			messages.push(action.data);
			return Object.assign({}, state, {messages});
		default:
			return state;
	}
}