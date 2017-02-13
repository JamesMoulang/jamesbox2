// SUBMIT MESSAGE

export const SUBMIT_MESSAGE_REQUEST = 'SUBMIT_MESSAGE_REQUEST';
export function submitMessageRequest() {
	return {
		type: SUBMIT_MESSAGE_REQUEST
	};
};

export const SUBMIT_MESSAGE_SUCCESS = 'SUBMIT_MESSAGE_SUCCESS';
export function submitMessageSuccess(message) {
	return {
		type: SUBMIT_MESSAGE_SUCCESS,
		data: message
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
			submitMessageFailure(data);
		});
		socket.on('submitMessageSuccess', (data) => {
			submitMessageSuccess(data);
		});
		socket.emit('submitMessage', {player, message});
	};
};

// RECEIVE MESSAGE (OUT OF THE BLUE)

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export function receiveMessage(message) {
	return {
		type: RECEIVE_MESSAGE,
		data: message
	};
};