const fs = require( "mz/fs" );
const slugify = require( "slugify" );
const config = require( "./config" );
const configDir = config.getConfigDir();

function fixFilename( name ) {
  return slugify( name, { replacement: "-", remove: /[$*~()'"!:@]/g, lower: true } );
}

/**
 * Write to .gpg file in data dir
 */
function writeMsg( str, name ) {
  fs.writeFile( `${configDir}/data/${name}.gpg`, str );
}
function readMsg( name ) {
  fs.readFile( `${configDir}/data/${name}.gpg`, { encoding: "utf8" } );
}

function walkMsgs() {
  return fs.readdir( `${configDir}/data` )
    .then( files => files.filter( x => x.match( /(.+)\.gpg/i ) ) )
    .then( files => files.map( x => x.split( ".gpg" )[0] ) );
}

module.exports = {
  fixFilename,
  writeMsg,
  readMsg,
  walkMsgs,
};

