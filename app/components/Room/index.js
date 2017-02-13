// a. Log in to an existing room.
// b. Host a new room.
// c. Rejoin the room I was just in.

import React, { Component } from 'react';
import _ from 'underscore';
import { Router, Route, Link, browserHistory } from 'react-router'
import io from 'socket.io-client';
import { connect } from 'react-redux';
import container from '../visual/container';
import { submitName } from '../../actions/User';
import { receiveMessage, submitMessage } from '../../actions/Room';
import Message from '../visual/Message';

function mapStateToProps(state) {
  return {
    player: state.User.player,
    messages: state.Room.messages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitName: (socket, player, username) => {
    	dispatch(submitName(socket, player, username));
    },
    submitMessage: (socket, player, message) => {
    	dispatch(submitMessage(socket, player, message));
    },
    receiveMessage: (message) => {
    	dispatch(receiveMessage(message));
    },
  };
}

// So, at this point. We have joined a room and we have a player object.
// We need to:
	// 1. Connect to the specific socket for this room.
	// 2. Set ourselves a name if we don't have one already.
class RoomComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			room: null,
			message: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.buttonIsEnabled()) {
			console.log(this.state.name);
			this.props.submitName(this.state.room, this.props.player, this.state.name);
		}
	}

	handleChange(key, event) {
		let state = {};
		state[key] = event.target.value;
		this.setState(state);
	}

	componentDidMount() {
		if (!this.props.player) {
			browserHistory.push('/play');
		} else {
			console.log(this.props.player);
			// Then we need to properly connect to the socket.
			if (this.state.room === null) {
				const room = io('/' + this.props.player.currentRoomID);
				
				room.on('receiveMessage', (data) => {
					console.log(data);
					if (data.roomID === this.props.player.currentRoomID) {
						this.props.receiveMessage(data);
					}
				});

				this.setState({room});
			}
		}
	}

	componentDidUpdate() {

	}

	buttonIsEnabled() {
		return this.state.room !== null && this.state.name !== '';
	}

	getButtonClassName() {
		return 'btn btn-primary btn-lg' + (this.buttonIsEnabled() ? '' : ' disabled');
	}

	handleKeyPress(key, event) {
		if (event.key === 'Enter') {
			switch(key) {
			case 'message':
				console.log(this.state.message);
				this.props.submitMessage(this.state.room, this.props.player, this.state.message);
				this.setState({message: ''});
				break;
			default:
				break;
			}
		}
	}

	render() {
		const date = Date.now();
		var c = null;
		if (typeof(this.props.player) !== 'undefined') {
			if (this.props.player.username === null) {
				// Username entry form.
				return (
					<div style={container}>
						<div className="form-group">
							<h1>Enter your name</h1>
							<br/>
							<input
								className="form-control"
								type="text"
								value={this.state.name}
								onChange={this.handleChange.bind(this, 'name')}
							/>
							<br/>
							<button
								className={this.getButtonClassName()}
								type="button"
								onClick={this.handleSubmit}
							>
								Submit
							</button>
						</div>
					</div>
				);
			} else {
				// Show messages.
				return <div style={{position: 'absolute', width: '100%', height: '100%', overflow: ''}}>
					<div style={{zIndex: 2, position: 'fixed', bottom: '0%', width: '100%', height: '34px', overflow: '', backgroundColor: 'white', borderTop: '#000000'}}>
						<input 
							onKeyPress={this.handleKeyPress.bind(this, 'message')}
							className="form-control"
							type="text"
							value={this.state.message}
							onChange={this.handleChange.bind(this, 'message')}
						/>
					</div>
					<div style={{zIndex: 1, position: 'fixed', width: '100%', height: 'calc(100% - 34px)', overflow: 'scroll'}}>
						{
							_.map(
								_.sortBy(
									this.props.messages,
									(message) => {
										return message.timestamp - date;
									}
								),
								(message, index) => {
									return <Message key={index} message={message}/>
								}
							)
						}
					</div>
				</div>
			}
		}

		return c;
	}
}

const Room = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomComponent);

export default Room;