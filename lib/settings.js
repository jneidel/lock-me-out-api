const mkdir = require( "make-dir" );
const expandHome = require( "expand-home-dir" );
const fs = require( "mz/fs" );
const path = require( "path" );
const gpg = require( ".." );
const log = require( "./log" );
const range = require( "py-range" );

/* Function for the intial setup and accessing the config */

const home = expandHome( "~/.config/lock-me-out" );
exports.home = home;
exports.getKeyid = () => {
  const config = require( path.resolve( home, "config.json" ) );

  return config.keyid;
};
exports.getPassphrase = async () => {
  const config = require( path.resolve( home, "config.json" ) );

  if ( config.passphrase )
    return config.passphrase;
  else {
    const { passphrase } = await log.prompt( {
      type    : "input",
      name    : "passphrase",
      message : "Please enter your passphrase to continue:",
      validate: val => val !== "",
    } );
    return passphrase;
  }
};

const createConfigDir = () => Promise.all( [
  mkdir( path.resolve( home, "gpg" ) ),
  mkdir( path.resolve( home, "data" ) ),
] );

const createConfigData = ( keyid, passphrase = "" ) => ( {
  keyid,
  passphrase,
  shell: "/bin/bash",
} );

const createConfig = configData => fs.writeFile(
  path.resolve( home, "config.json" ),
  JSON.stringify( configData, null, 2 )
);

const generatePass = () => range( 64 )
  .map( x => ( ( min, max ) => Math.floor( Math.random() * max + min ) )( 0, 9 ) ) // Generate 64 random numbers
  .reduce( ( acc, cur ) => `${acc}${cur}`, "" );

exports.setup = async function setup() {
  log.printPrompt( "This cli uses gpg (GNU Privacy Guard) to encrypt it's data.\n  A gpg key pair is required for encryption/signing." );

  await createConfigDir();

  // Passphrase creation
  const { generatePassphrase } = await log.prompt( {
    type   : "confirm",
    name   : "generatePassphrase",
    message: "Should the passphrase for your gpg key be generated?",
    default: true,
  } );

  if ( generatePassphrase ) {
    var passphrase = generatePass();
  } else {
    var { passphrase } = await log.prompt( {
      name   : "passphrase",
      message: "Enter the passphrase for your gpg pair:",
      validate( value ) {
        if ( value === "" ) // Cant be empty
          return false;
        else
          return true;
      },
    } );
  }
  log.printPrompt( `Your passphrase is: ${passphrase}` );

  log.printPrompt( `Your key pair is now being generated...` );
  const keyid = await gpg.generateKey( passphrase );

  if ( keyid === null ) {
    log.printPrompt( "There was an error creating the key pair.\n  Do maybe already have key pair?" );
    process.exit();
  } else {
    log.printPrompt( `Your key pair was successfully generated` );
  }

  const { saveToConfig } = await log.prompt( {
    type   : "confirm",
    name   : "saveToConfig",
    message: "Should your passphrase be saved to the config file (at ~/.config/lock-me-out/config.json)?",
    default: true,
  } );

  const configData = createConfigData( keyid, saveToConfig ? passphrase : null );
  createConfig( configData );
};

