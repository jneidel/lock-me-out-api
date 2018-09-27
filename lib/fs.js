const fs = require( "mz/fs" );
const slugify = require( "slugify" );
const home = require( "./settings" ).home;

function fixFilename( name ) {
  return slugify( name, { replacement: "-", remove: /[$*~()'"!:@]/g, lower: true } );
}

/**
 * Write to .gpg file in data dir
 */
const writeMsg = ( str, name ) => fs.writeFile( `${home}/data/${name}.gpg`, str );

const readMsg = name => fs.readFile( `${home}/data/${name}.gpg`, { encoding: "utf8" } );

const walk = () => fs.readdir( `${home}/data` )
  .then( files => files.filter( x => x.match( /(.+)\.gpg/i ) ) )
  .then( files => files.map( x => x.split( ".gpg" )[0] ) );

module.exports = {
  fixFilename,
  writeMsg,
  readMsg,
  walk,
};

