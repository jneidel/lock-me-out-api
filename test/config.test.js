const test = require( "ava" );
const path = require( "path" );
const fs = require("mz/fs");

const lib = require( "../lib/config.js" );

// config dir path
test.serial( "get config dir before setting it", t => {
  t.is( lib.getConfigDir(), null );
} )
test.serial( "set config dir" , t => {
  const configDir = "./test/config";
  lib.setConfigDir( configDir );

  t.is( lib.getConfigDir(), path.resolve( configDir ) );
} );

// create config dir/files
test.serial( "get config before it is created" , t => {
  t.is( lib.getConfig(), null );
} );

test( "create config directories, config file" , async t => {
  const result = {
    keyid: "B29E6A7A7DFD16FA",
    passphrase: "123456",
    shell: "/bin/bash",
  }

  const configData = lib.createConfigData( result.keyid, result.passphrase );

  await lib.createConfigDir()
  await lib.createConfig( configData );

  const config = lib.getConfig();

  t.deepEqual( config, result );
} );

test.after( "cleanup", async t => {
  const configDir = lib.getConfigDir();

  await Promise.all( [
    fs.unlink( path.resolve( configDir, "config.json" ) ),
    fs.rmdir( path.resolve( configDir, "gpg" ) ),
    fs.rmdir( path.resolve( configDir, "data" ) ),
  ] );
  await fs.rmdir( configDir );
} );

