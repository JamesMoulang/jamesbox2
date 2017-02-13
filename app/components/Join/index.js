// a. Log in to an existing room.
// b. Host a new room.
// c. Rejoin the room I was just in.

import React, { Component } from 'react';
import _ from 'underscore';
import { Router, Route, Link, browserHistory } from 'react-router'
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { joinRoom } from '../../actions/User';

function mapStateToProps(state) {
  return {
    socket: state.User.socket,
    player: state.User.player,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    joinRoom: (socket, id) => {
    	dispatch(joinRoom(socket, id));
    }
  };
}

class JoinComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sentJoinRequest: false
		}
	}

	componentDidMount() {
		
	}

	componentDidUpdate() {
		if (!this.state.sentJoinRequest && this.props.socket) {
			this.props.joinRoom(this.props.socket, this.props.params.id);
			this.setState({sentJoinRequest: true})
		} else {
			if (this.props.player) {
				browserHistory.push('/room');
			}
		}
	}

	render() {
		return (
			<div>
				
			</div>
		);
	}
}

const Join = connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinComponent);

export default Join;