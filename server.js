"use strict";
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var uid = require('uid');
var _ = require('underscore');
var app = express();
var compiler = webpack(config);
var Player = require('./player');
var Room = require('./room');

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, 'app', 'assets')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

const players = {};
const rooms = {};

var server = require('http').createServer(app);
var io = require('socket.io')(server);

const getPlayer = (id) => {
	if (players[id]) {
		return players[id];
	} else {
		return null;
	}
};

const getRoom = (id) => {
	if (rooms[id]) {
		return rooms[id];
	} else {
		return null;
	}
};

const createRoom = () => {
	const room = new Room(uid(), getPlayer, io);
	rooms[room.id] = room;
	return room;
}

const createPlayer = () => {
	const player = new Player(uid());
	players[player.id] = player;
	return player;
}

io.on('connection', function(socket) {
	console.log("new connection");
	let playerID = null;

	// {roomID} => {player}
	// Check for a room with id: data.roomID.
	// If it exists
		// Create a new player.
		// Add them to the room
		// Return them.
	// If not
		// Return an error
	socket.on('joinRoom', (data) => {
		if (rooms[data.roomID]) {
			const player = createPlayer();
			playerID = player.id;
			rooms[data.roomID].addPlayer(player.id);
			socket.emit('joinRoomSuccess', {player});
		} else {
			socket.emit('joinRoomFailure', {message: 'No room found with that ID.'});
		}
	});

	// => {player}
	// Create a new room.
	// Create a new player.
	// Add them to the room.
	// Return them.
	socket.on('hostRoom', () => {
		const room = createRoom();
		const player = createPlayer();
		playerID = player.id;
		room.addPlayer(player.id);

		socket.emit('hostRoomSuccess', {player});
	});

	socket.on('rejoinRoom', (data) => {
		if (players[data.playerID]) {
			if (players[data.playerID].currentRoomID) {
				const room = getRoom(player.currentRoomID);
				if (room) {
					room.onPlayerRejoin(player.id);
				}
			} else {
				socket.emit('rejoinRoomFailure', {message: "Couldn't find a previous game!"});	
			}
		} else {
			socket.emit('rejoinRoomFailure', {message: 'No player found with that ID.'});
		}
	});

	socket.on('disconnect', () => {
		if (playerID !== null) {
			const player = getPlayer(playerID);
			if (player !== null) {
				// Then we need to notify the room that they've disconnected.
				if (player.currentRoomID) {
					const room = getRoom(player.currentRoomID);
					if (room) {
						room.onPlayerAFK(player.id);
					}
				}
			}
		}
	});
});
server.listen(3000, function() {
	console.log("listening on port 3000");
});