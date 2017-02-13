import * as Actions from '../actions/User';

export default function User(state={
	isFetching: false,
	player: undefined,
	error: undefined,
	socket: undefined,
}, action) {
	switch(action.type){
		case Actions.HOST_ROOM_REQUEST:
			return Object.assign({}, state, {isFetching: true, error: undefined});
		case Actions.HOST_ROOM_SUCCESS:
			return Object.assign({}, state, {isFetching: false, player: action.data.player});
		case Actions.HOST_ROOM_FAILURE:
			return Object.assign({}, state, {isFetching: false, error: action.data.message});
		case Actions.JOIN_ROOM_REQUEST:
			return Object.assign({}, state, {isFetching: true, error: undefined});
		case Actions.JOIN_ROOM_SUCCESS:
			return Object.assign({}, state, {isFetching: false, player: action.data.player});
		case Actions.JOIN_ROOM_FAILURE:
			return Object.assign({}, state, {isFetching: false, error: action.data.message});
		case Actions.REJOIN_ROOM_REQUEST:
			return Object.assign({}, state, {isFetching: true, error: undefined});
		case Actions.REJOIN_ROOM_SUCCESS:
			return Object.assign({}, state, {isFetching: false, player: action.data.player});
		case Actions.REJOIN_ROOM_FAILURE:
			return Object.assign({}, state, {isFetching: false, error: action.data.message});
		case Actions.SUBMIT_NAME_REQUEST:
			return Object.assign({}, state, {isFetching: true, error: undefined});
		case Actions.SUBMIT_NAME_SUCCESS:
			return Object.assign({}, state, {isFetching: false, player: action.data.player});
		case Actions.SUBMIT_NAME_FAILURE:
			return Object.assign({}, state, {isFetching: false, error: action.data.message});
		case 'SET_SOCKET':
			return Object.assign({}, state, {socket: action.data});
		default:
			return state;
	}
}