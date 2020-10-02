const client = require('./client.js')
const commandResolver = require('./commandResolver.js')
const fs = require('fs');

client.connect()
/*
client.on("subscription", function (channel, username, method) {
	
}
*/
/*
client.on('subscription', function(_channel, username, method, message, userstate) {
    let channel = _channel.slice(1);
    let output = '';
    switch(channel) {
        case 'channel1':
            output = 'output test 1';
        case 'channel2':
            output = 'output test 2';
        case 'channel3':
            output = 'output test 3';
    }
    if(output) client.say(channel, output);
});
*/
// Commands
client.on('chat', (channel, user, message, self) => {
	if (self) return // bot message

	// if message has symbol whats mean command - !
	if ((message.indexOf('!')) !== -1) {
	commandResolver.resolve(channel, user, message)
	}
	msg = message.toLowerCase();

	if (msg == '!vreau') {
		if (user.subscriber == true) {
			client.say(channel, `!permit @${user.username}`);
		}
	}
	
	/*if (msg.includes("onlyfans") && (msg.includes("amyclaire") || msg.includes("ami") || msg.includes("bianca"))) {
		client.say(channel, `@${user.username} nu vrei sa o intrebi pe maica-ta de ce este pe onlyfans?`)
	}*/
	
	
	if (msg.includes("ban @bocalee") || msg.includes("ban bocalee") || msg.includes("timeout bocalee") || msg.includes("timeout @bocalee")) {
		client.say(channel, `@${user.username} nu cred ca tu chiar incerci sa ii dai ban lui @BocaLee LUL LUL LUL`)
	}
	
	/*if (msg.includes("ioanit0")) {
		client.say(channel, `/timeout @IoanIT0 600`)
	}*/
	
	try {
		const data_ban = fs.readFileSync('injuraturiban.txt', 'UTF-8');
		const data_to = fs.readFileSync('injuraturitimeout.txt', 'UTF-8');
		const mesaje_automate = fs.readFileSync('mesajeautomate.txt', 'UTF-8');

		// split the contents by new line
		const lines_ban = data_ban.split(/\r?\n/);
		const lines_to = data_to.split(/\r?\n/);
		const lines_msg = mesaje_automate.split(/\r?\n/);

		// print all lines
		lines_ban.forEach((line_ban) => {
			if(msg.includes(line_ban) && !msg.includes('popula') && !msg.includes('copula') && !msg.includes('future')) {
				client.say(channel, `/ban @${user.username} Injuratura!!!!`);
			}
		});
		lines_to.forEach((line_to) => {
			if(msg.includes(line_to) && !msg.includes('popula') && !msg.includes('copula') && !msg.includes('future')) {
				client.say(channel, `/timeout @${user.username} 1`);
			}
		});

	} catch (err) {
		console.error(err);
	}
})