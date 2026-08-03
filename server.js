const path = require('path');

// Change working directory to DarshanEase/server so relative routes & models resolve properly
const serverDir = path.join(__dirname, 'DarshanEase', 'server');
process.chdir(serverDir);

// Require and run main Express server
require(path.join(serverDir, 'server.js'));
