// a. Log in to an existing room.
// b. Host a new room.
// c. Rejoin the room I was just in.

import React, { Component } from 'react';
import _ from 'underscore';
import { Router, Route, Link, browserHistory } from 'react-router'
import io from 'socket.io-client';
import { connect } from 'react-redux';
import container from '../visual/container';
import { hostRoom, joinRoom } from '../../actions/User';

function mapStateToProps(state) {
  return {
    isFetching: state.User.isFetching,
    player: state.User.player,
    socket: state.User.socket,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hostRoom: (socket) => {
      dispatch(hostRoom(socket));
    },
    joinRoom: (socket) => {
    	dispatch(joinRoom(socket));
    },
    rejoinRoom: (socket, playerID) => {
    	dispatch(rejoinRoom(socket, playerID));	
    }
  };
}

class PlayComponent extends Component {
	componentDidUpdate() {
		if (typeof(this.props.player) !== 'undefined') {
			// Then we have a user (and hence, a room).
			// We're not connected to the room's socket yet but we can move on to entering our name if needed.
			console.log(this.props.player);
			browserHistory.push('/room');
		}
	}

	clickButton(key) {
		switch(key) {
		case 'host':
			this.props.hostRoom(this.props.socket);
			break;
		case 'rejoin':
			if (localStorage.getItem('loginToken') !== null) {
				console.log("click rejoin");
			}
			break;
		default:
			break;
		}
	}

	buttonsDisabled(requireToken=false) {
		let disabled = false;
		if (this.props.isFetching || !this.props.socket) {
			disabled = true;
		} else if (requireToken && localStorage.getItem('loginToken') === null) {
			disabled = true;
		}

		return disabled ? ' disabled' : '';
	}

	render() {
		return (
			<div style={container}>
				<div className="row">
					<div className="col-sm-6" style={{height: '64px'}}>
						<button
							type="button" 
							onClick={this.clickButton.bind(this, 'host')} 
							className={"btn btn-success btn-lg" + this.buttonsDisabled()}
						>
							Host a game
						</button>
					</div>
					<div className="col-sm-6" style={{height: '64px'}}>
						<div className="form-group">
							<button 
								type="button" 
								onClick={this.clickButton.bind(this, 'rejoin')} 
								className={"btn btn-info btn-lg" + this.buttonsDisabled(true)}
							>Rejoin last game
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const Play = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayComponent);

export default Play;