import React, { Component } from 'react';
import _ from 'underscore';
import { Router, Route, Link, browserHistory } from 'react-router'
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { setSocket } from '../../actions/User';

function mapStateToProps(state) {
  return {
    socket: state.User.socket
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSocket: (socket) => {
      dispatch(setSocket(socket));
    }
  };
}

class AppComponent extends Component {
	componentDidMount() {
		const socket = io();
		this.props.setSocket(socket);
	}

	componentDidUpdate() {
		
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

export default App;