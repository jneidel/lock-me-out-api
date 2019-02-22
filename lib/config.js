const mkdir = require( "make-dir" );
const expandHome = require( "expand-home-dir" );
const fs = require( "mz/fs" );
const path = require( "path" );
const range = require( "py-range" );

/* Function for the intial setup and accessing the config */

// config directory path
var configDir = null;
function setConfigDir( dir = "~/.config/lock-me-out" ) {
  configDir = path.resolve( expandHome( dir ) );
  return configDir;
}
function getConfigDir() {
  return configDir;
}

// create config directory
function createConfigDir() {
  return Promise.all( [
    mkdir( path.resolve( configDir, "gpg" ) ),
    mkdir( path.resolve( configDir, "data" ) ),
  ] );
}

module.exports = {
  setConfigDir,
  getConfigDir,
  createConfigDir,
}

