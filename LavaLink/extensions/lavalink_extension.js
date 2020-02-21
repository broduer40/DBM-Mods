module.exports = {

//---------------------------------------------------------------------
// Editor Extension Name
//
// This is the name of the editor extension displayed in the editor.
//---------------------------------------------------------------------

name: "Lavalink",

//---------------------------------------------------------------------
// Is Command Extension
//
// Must be true to appear in "command" context menu.
// This means each "command" will hold its own copy of this data.
//---------------------------------------------------------------------

isCommandExtension: false,

//---------------------------------------------------------------------
// Is Event Extension
//
// Must be true to appear in "event" context menu.
// This means each "event" will hold its own copy of this data.
//---------------------------------------------------------------------

isEventExtension: false,

//---------------------------------------------------------------------
// Is Editor Extension
//
// Must be true to appear in the main editor context menu.
// This means there will only be one copy of this data per project.
//---------------------------------------------------------------------

isEditorExtension: false,

//---------------------------------------------------------------------
// Extension Fields
//
// These are the fields for the extension. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the command's/event's JSON data.
//---------------------------------------------------------------------

fields: [],

//---------------------------------------------------------------------
// Default Fields
//
// The default values of the fields.
//---------------------------------------------------------------------

defaultFields: {

},

//---------------------------------------------------------------------
// Extension Dialog Size
//
// Returns the size of the extension dialog.
//---------------------------------------------------------------------

size: function() {
	return { width: 300, height: 170 };
},

//---------------------------------------------------------------------
// Extension HTML
//
// This function returns a string containing the HTML used for
// the context menu dialog.
//---------------------------------------------------------------------

html: function(data) {
	return ``
},

//---------------------------------------------------------------------
// Extension Dialog Init Code
//
// When the HTML is first applied to the extension dialog, this code
// is also run. This helps add modifications or setup reactionary
// functions for the DOM elements.
//---------------------------------------------------------------------

init: function() {

},

//---------------------------------------------------------------------
// Extension Dialog Close Code
//
// When the dialog is closed, this is called. Use it to save the data.
//---------------------------------------------------------------------

close: function(document, data) {

},

//---------------------------------------------------------------------
// Extension On Load
//
// If an extension has a function for "load", it will be called
// whenever the editor loads data.
//
// The "DBM" parameter is the global variable. Store loaded data within it.
//---------------------------------------------------------------------

load: function(DBM, projectLoc) {

},

//---------------------------------------------------------------------
// Extension On Save
//
// If an extension has a function for "save", it will be called
// whenever the editor saves data.
//
// The "data" parameter contains all data. Use this to modify
// the data that is saved. The properties correspond to the
// data file names:
//
//  - data.commands
//  - data.settings
// etc...
//---------------------------------------------------------------------

save: function(DBM, data, projectLoc) {

},

//---------------------------------------------------------------------
// Editor Extension Bot Mod
//
// Upon initialization of the bot, this code is run. Using the bot's
// DBM namespace, one can add/modify existing functions if necessary.
// In order to reduce conflictions between mods, be sure to alias
// functions you wish to overwrite.
//
// This is absolutely necessary for editor extensions since it
// allows us to setup modifications for the necessary functions
// we want to change.
//
// The client object can be retrieved from: `const bot = DBM.Bot.bot;`
// Classes can be retrieved also using it: `const { Actions, Event } = DBM;`
//---------------------------------------------------------------------

mod: function(DBM) {
	const { PlayerManager } = require("discord.js-lavalink");
	const fetch = require("node-fetch");
	const { URLSearchParams } = require("url");
	// Let's make our own namespace like the chads we are.
	DBM.LavaLink_EXT = DBM.Bot.onReady || {};

	DBM.Bot.onReady = function () {
		const client = DBM.Bot.bot
 
		const nodes = [
			{ host: "localhost", port: 2333, password: "dbmLavaLinkExtension" }
		];
		 
		client.player = new PlayerManager(client, nodes, {
			user: client.user.id, 
			shards: 1
		})

		function getSongs() {
			const node = client.player.nodes.first();
		
			const params = new URLSearchParams();
			params.append("identifier", 'ytsearch: Top 100 songs');
		
			return fetch(`http://${node.host}:${node.port}/loadtracks?${params.toString()}`, { headers: { Authorization: node.password } })
				.then(res => res.json())
				.then(data => data.tracks)
				.catch(err => {
					console.error(err);
					return null;
			});
		}


		// Call original function
		DBM.LavaLink_EXT.apply(this, arguments);
	}
}

}; // End of module
