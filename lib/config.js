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

// create config directory/files
function createConfigDir() {
  return Promise.all( [
    mkdir( path.resolve( configDir, "gpg" ) ),
    mkdir( path.resolve( configDir, "data" ) ),
  ] );
}
function createConfig(configData) {
  return fs.writeFile(
    path.resolve( configDir, "config.json" ),
    JSON.stringify( configData, null, 2 )
  )
}
function createConfigData( keyid, passphrase = "", shell = "/bin/bash" ) {
  return {
    keyid,
    passphrase,
    shell,
  }
}

function getConfig() {
  try {
    const config = require( path.resolve( configDir, "config.json" ) );
    return config;
  } catch( err ) {
    return null; // Config doesn't exist
  }
}

function generatePassphrase() { // Generate 64 random numbers
  return range( 64 )
    .map( x => ( ( min, max ) => Math.floor( Math.random() * max + min ) )( 0, 9 ) )
    .reduce( ( acc, cur ) => `${acc}${cur}`, "" );
}

module.exports = {
  setConfigDir,
  getConfigDir,
  createConfigDir,
  createConfigData,
  createConfig,
  generatePassphrase,
  getConfig,
}

