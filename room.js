"use strict";

var _ = require('underscore');

var colours = [
	['#247BA0', '#ffffff'],
	['#70C1B3', '#ffffff'],
	['#B2DBBF', '#ffffff'],
	['#F3FFBD', '#ffffff'],
	['#FFE066', '#ffffff'],
	['#247BA0', '#ffffff'],
	['#70C1B3', '#ffffff'],
];

class Room {
	constructor(id, getPlayer, io) {
		console.log("creating a room with id " + id);
		this.id = id;
		this.username = null;
		this.playerIDs = [];
		this.started = false;
		this.getPlayer = getPlayer;
		this.io = io.of('/' + id);
		this.messages = [];
		this.colourIndex = 0;

		this.io.on('connection', (socket) => {
			console.log("Room with id " + this.id + " just got a connection on its private socket.");

			// data.player
			// data.username
			socket.on('submitName', (data) => {
				const player = this.getPlayer(data.player.id);
				player.colour = this.getColour();
				if (player !== null && player.currentRoomID === this.id) {
					// Then the player exists and is in this room.
					player.username = data.username;
					socket.emit('submitNameSuccess', {player});
					socket.broadcast.emit('playerJoined', {player});
					this.sendMessage(undefined, "Player " + player.username + " just joined!");
				} else {
					socket.emit('submitNameFailure', {message: "Couldn't find that player in this room!"});
				}
			});

			// data.player
			// data.message
				// timestamp
				// contents
			socket.on('submitMessage', (data) => {
				const player = this.getPlayer(data.player.id);
				if (player !== null && player.currentRoomID === this.id) {
					this.sendMessage(player.id, data.message);
				}
			});
		});
	}

	getColour() {
		const colour = colours[this.colourIndex];
		this.colourIndex++;
		if (this.colourIndex >= colours.length) {
			this.colourIndex = 0;
		}
		return colour;
	}

	sendMessage(playerID, message, timestamp) {
		if (typeof(timestamp) === 'undefined') {
			timestamp = Date.now();
		}
		const player = this.getPlayer(playerID);
		let colour = ['#FF1654', '#ffffff'];
		if (player !== null) {
			colour = player.colour;
		}

		const msg = {
			roomID: this.id,
			playerID, playerID,
			colour: colour,
			message: message,
			timestamp
		};
		this.io.emit('receiveMessage', msg);
	}

	addPlayer(playerID) {
		console.log("adding a player with id " + playerID + " to room " + this.id);
		this.getPlayer(playerID).currentRoomID = this.id;
		console.log("room id now " + this.getPlayer(playerID).currentRoomID);
		this.playerIDs.push(playerID);
	}

	onPlayerAFK(playerID) {
		console.log("player with id " + playerID + " just went afk in room with id " + this.id);
	}

	onPlayerRejoin(playerID) {
		console.log("player with id " + playerID + " just rejoined in room with id " + this.id);	
	}
}

module.exports = Room;