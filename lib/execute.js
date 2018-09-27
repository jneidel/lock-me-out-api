const promisify = require( "util" ).promisify;
const { exec } = require( "child_process" );

module.exports = promisify( exec ); // execute a shell command

