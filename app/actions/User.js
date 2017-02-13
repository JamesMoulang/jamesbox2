// HOST ROOM

export const HOST_ROOM_REQUEST = 'HOST_ROOM_REQUEST';
export function hostRoomRequest() {
	return {
		type: HOST_ROOM_REQUEST
	}
};

export const HOST_ROOM_SUCCESS = 'HOST_ROOM_SUCCESS';
export function hostRoomSuccess(user) {
	return {
		type: HOST_ROOM_SUCCESS,
		data: user
	}
};

export const HOST_ROOM_FAILURE = 'HOST_ROOM_FAILURE';
export function hostRoomFailure(error) {
	return {
		type: HOST_ROOM_FAILURE,
		data: error
	}
};

export function hostRoom(socket) {
	return function(dispatch) {
		dispatch(hostRoomRequest());
		socket.on('hostRoomFailure', (data) => {
			dispatch(hostRoomFailure(data));
		});
		socket.on('hostRoomSuccess', (data) => {
			dispatch(hostRoomSuccess(data));
		});
		socket.emit('hostRoom');
	};
};

// SUBMIT NAME
export const SUBMIT_NAME_REQUEST = 'SUBMIT_NAME_REQUEST';
export function submitNameRequest() {
	return {
		type: SUBMIT_NAME_REQUEST
	};
};

export const SUBMIT_NAME_SUCCESS = 'SUBMIT_NAME_SUCCESS';
export function submitNameSuccess(user) {
	return {
		type: SUBMIT_NAME_SUCCESS,
		data: user
	};
};

export const SUBMIT_NAME_FAILURE = 'SUBMIT_NAME_FAILURE';
export function submitNameFailure(error) {
	return {
		type: SUBMIT_NAME_FAILURE,
		data: error
	};
};

export function submitName(socket, player, username) {
	return function(dispatch) {
		dispatch(submitNameRequest());
		socket.on('submitNameFailure', (data) => {
			dispatch(submitNameFailure(data));
		});
		socket.on('submitNameSuccess', (data) => {
			dispatch(submitNameSuccess(data));
		});
		socket.emit('submitName', {player, username})
	}
}

// JOIN ROOM
export const JOIN_ROOM_REQUEST = 'JOIN_ROOM_REQUEST';
export function joinRoomRequest() {
	return {
		type: JOIN_ROOM_REQUEST
	};
};

export const JOIN_ROOM_SUCCESS = 'JOIN_ROOM_SUCCESS';
export function joinRoomSuccess(user) {
	return {
		type: JOIN_ROOM_SUCCESS,
		data: user
	};
};

export const JOIN_ROOM_FAILURE = 'JOIN_ROOM_FAILURE';
export function joinRoomFailure(error) {
	return {
		type: JOIN_ROOM_FAILURE,
		data: error
	}
};

export function joinRoom(socket, roomID) {
	return function(dispatch) {
		dispatch(joinRoomRequest());
		socket.on('joinRoomFailure', (data) => {
			dispatch(joinRoomFailure(data));
		});
		socket.on('joinRoomSuccess', (data) => {
			dispatch(joinRoomSuccess(data));
		});
		socket.emit('joinRoom', {roomID});
	};
};

// SUBMIT MESSAGE
export const SUBMIT_MESSAGE_REQUEST = 'SUBMIT_MESSAGE_REQUEST';
export function submitMessageRequest() {
	return {
		type: SUBMIT_MESSAGE_REQUEST
	};
};

export const SUBMIT_MESSAGE_SUCCESS = 'SUBMIT_MESSAGE_SUCCESS';
export function submitMessageSuccess(data) {
	return {
		type: SUBMIT_MESSAGE_SUCCESS,
		data
	};
};

export const SUBMIT_MESSAGE_FAILURE = 'SUBMIT_MESSAGE_FAILURE';
export function submitMessageFailure(error) {
	return {
		type: SUBMIT_MESSAGE_FAILURE,
		data: error
	};
};

export function submitMessage(socket, player, message) {
	return function(dispatch) {
		dispatch(submitMessageRequest());
		socket.on('submitMessageFailure', (data) => {
			dispatch(submitMessageFailure(data));
		});
		socket.on('submitMessageSuccess', (data) => {
			dispatch(submitMessageSuccess(data));
		});
		socket.emit('submitMessage', {player, message});
	};
};

// REJOIN ROOM
export const REJOIN_ROOM_REQUEST = 'REJOIN_ROOM_REQUEST';
export function rejoinRoomRequest() {

}

export const REJOIN_ROOM_SUCCESS = 'REJOIN_ROOM_SUCCESS';
export function rejoinRoomSuccess() {

}

export const REJOIN_ROOM_FAILURE = 'REJOIN_ROOM_FAILURE';
export function rejoinRoomFailure() {

}

export function rejoinRoom(socket, playerID) {
	return function(dispatch) {
		dispatch(rejoinRoomRequest());
		socket.on('rejoinRoomFailure', (data) => {
			dispatch(rejoinRoomFailure(data));
		});
		socket.on('rejoinRoomSuccess', (data) => {
			dispatch(rejoinRoomSuccess(data));
		});
		socket.emit('rejoinRoom', {playerID});
	};
};

// SET USER

export const SET_SOCKET = 'SET_SOCKET';
export function setSocket(socket) {
	return {
		type: 'SET_SOCKET',
		data: socket
	}
};