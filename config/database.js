// Require Environment Variables if they don't exist
if (!process.env.DB_USERNAME){
	require('./env.js');
}

// Create URL String from Environment Variables
var urlString = 'mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD;
urlString += '@' + process.env.DB_URI;

// Export Settings
module.exports = {

    'url' : urlString 

};