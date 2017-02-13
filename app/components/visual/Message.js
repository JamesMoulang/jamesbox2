import React, { Component } from 'react';
import _ from 'underscore';

let style = {
	borderRadius: '16px',
	paddingLeft: '16px',
	paddingTop: '8px',
	paddingBottom: '1px',
	margin: '16px',
	width: '90%'
};

class Message extends Component {
	render() {
		const messageStyle = Object.assign(
			{}, 
			style, 
			{
				'backgroundColor': this.props.message.colour[0],
				color: this.props.message.colour[1],
			}
		)
		return (
			<div style={messageStyle}>
				<p>{this.props.message.message}</p>
			</div>
		);
	}
}

export default Message;