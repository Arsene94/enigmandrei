const config = require('config')
const client = require('./client.js')
const activeChannel = config.get('channel')
let state = null;

let clear = () => {
	if (!checkModeratorPermission()) return

	client.clear(config.get('channel'))
}

let timeOutUser = (args) => {
	if (!checkModeratorPermission()) return client.say(activeChannel, 'Ne pare rau @' + state.user.username + ' dar nu ai acces la aceasta comanda')

	let targetUser = args[0]
	let timeOutDuration = args[1]

	if (timeOutDuration == undefined) {
			timeOutDuration = 300
	}
	var min = timeOutDuration / 60  + ''
	let sec = timeOutDuration % 60
	client.timeout(activeChannel, targetUser, timeOutDuration)
	client.action(activeChannel, targetUser + ' ai primit timeout! Durata: ' + min.split('.')[0] + ' minute si ' + sec + ' secunde')
}

const callCommand = (command, messageInfo) => {
	state = messageInfo;

	switch (command.command) {
		case 'to':
			timeOutUser(command.args)
			break
		case 'uto':
		case 'unto':
			unTimeOutUser(command.args)
			break
		/*case 'emote':
		if (command.args != '') {
			var user = `Pentru ` + command.args;
		} else {
			var user = '';
		}
			client.say(activeChannel, `/me ` + user + ` amyclaNuk amyclaNuk amyclaNuk amyclaNuk amyclaNuk amyclaNukNervos amyclaNukNervos amyclaNukNervos amyclaWAWIC amyclaWAWIC amyclaWAWIC amyclaPuki amyclaPuki amyclaPuki  amyclaNukSuspicios  amyclaNukSuspicios  amyclaNukSuspicios`);
			break*/
		/*case 'vreau':
			if (user.subscriber == true) {
				client.say(activeChannel, `/permit @${user.username}`);
			}
			break*/
		default:
			break
	}

}
const checkModeratorPermission = () => state.user.mod || state.user.username === activeChannel.toLowerCase()

module.exports = {
	call: (command, messageInfo) => {
		callCommand(command, messageInfo)
	}
}
