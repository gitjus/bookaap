const localServer = require('./localServer');
const path = require('path');

const localPort = 3400;
const localFolder = '/public/bookApp';
const localPath = localFolder + '/index.html';
const localApp = localServer.init(localFolder, localPort);

localApp.get('/', (req, res) => {
	res.send('We are having some troubles, please come back in a while!');
});

//Pointing to angular app
localApp.get('/*', (req, res) => {
	var fileToSend = path.join(__dirname, localPath);
	res.sendFile(fileToSend);
});

localApp.listen(localPort, () => {
	console.log('Server running at: ' + localPort);
});
