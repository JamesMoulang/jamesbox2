"use strict";

class Player {
	constructor(id) {
		this.id = id;
		this.username = null;
		this.currentRoomID = null;
		this.colour = undefined;
	}
}

module.exports = Player;