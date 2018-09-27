const test = require( "ava" );
const day = require( "dayjs" );

const d = require( "../lib/datetime" );

// parse -> verify
test( "parse-verify date tom [unit]", t =>
  t.is( d.verify( d.parse( "tom" ) ), false ) );
test( "parse-verify date Xdays [unit]", t =>
  t.is( d.verify( d.parse( "2days" ) ), false ) );
test( "parse-verify date +X [unit]", t =>
  t.is( d.verify( d.parse( "+2" ) ), false ) );
test( "parse-verify date nextweek [unit]", t =>
  t.is( d.verify( d.parse( "nextweek" ) ), false ) );
test( "parse-verify date Xweeks [unit]", t =>
  t.is( d.verify( d.parse( "2weeks" ) ), false ) );
test( "parse-verify date year-month-day [unit]", t =>
  t.is( d.verify( d.parse( "2050-1-13" ) ), false ) );
test( "parse-verify date month-day [unit]", t =>
  t.is( d.verify( d.parse( "12-30" ) ), false ) );
test( "parse-verify date day [unit]", t =>
  t.is( d.verify( d.parse( "31" ) ), false ) );

test( "parse-verify time +X [unit]", t =>
  t.is( d.verify( d.parse( "tod +1" ) ), false ) );
test( "parse-verify time -X [unit]", t =>
  t.is( d.verify( d.parse( "tod -1" ) ), true ) );
test( "parse-verify time XX:XX [unit]", t =>
  t.is( d.verify( d.parse( "tod 23:59" ) ), false ) );

// test( "parse-verify date time tom -25 [unit]", t =>
// t.is( d.verify( d.parse( "tom -25") ), true ))
// test( "parse-verify date time nextweek -170 [unit]", t =>
// t.is( d.verify( d.parse( "nextweek -200") ), true ))

