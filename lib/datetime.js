const day = require( "dayjs" );
const relativeTime = require( "dayjs/plugin/relativeTime" );
day.extend( relativeTime );
const log = require( "./log" );

function isValidDate( ipt ) {
  let isValid = true;

  if ( typeof ipt !== "string" ) {
    log.printPrompt( "date/time has to be a string" );
    isValid = false;
  }

  if ( ipt.split( " " ).length !== 1 && ipt.split( " " ).length !== 2 ) {
    log.printPrompt( "date/time has to many or to few values separated by spaces (max two: 1 date, 1 time)" );
    isValid = false;
  }

  if ( !isValid )
    process.exit();
}

/**
 * Possible dates: tomorrow (default), next(-/ )week,Xweek(s), +X, (2018)-07-13
 * Possible times: now (default), +X, -X, 12(:00)
 */
function parse( ipt ) {
  isValidDate( ipt );

  const [ dateRaw, timeRaw ] = ipt.split( " " );

  if ( dateRaw === "tod" || dateRaw === "today" ) {
    var d = day();
  } else if ( dateRaw === "tom" || dateRaw === "tomorrow" ) {
    var d = day().add( 1, "day" );
  } else if ( dateRaw.match( /\d+days?/ ) ) {
    const days = dateRaw.match( /(\d+)days?/ )[1];
    var d = day().add( days, "day" );
  } else if ( dateRaw === "nextweek" || dateRaw === "next-week" ) {
    var d = day().add( 1, "week" );
  } else if ( dateRaw.match( /\d+weeks?/ ) ) {
    const weeks = dateRaw.match( /(\d+)weeks?/ )[1];
    var d = day().add( weeks, "week" );
  } else if ( dateRaw.match( /\+\d+/ ) ) {
    const days = dateRaw.match( /\+(\d+)/ )[1];
    var d = day().add( days, "day" );
  } else if ( dateRaw.match( /(\d+-)?(\d+-)?\d+/ ) ) { // 2018-8-13
    const dateStr = dateRaw.match( /(\d+)?-?(\d+)?-?(\d+)?/ );
    const len = dateStr[0].split( "-" ).length;

    if ( len === 3 ) {
      var year = dateStr[1];
      var month = dateStr[2];
      var days = dateStr[3];
    } else if ( len === 2 ) {
      var year = day().year();
      var month = dateStr[1];
      var days = dateStr[2];
    } else if ( len === 1 ) {
      var year = day().year();
      var month = day().month();
      var days = dateStr[1];
    }

    var d = day( `${year}-${month}-${days}` );
    d.$M++;
  } else { // default: tomorrow
    var d = day().add( 1, "day" );
  }

  if ( timeRaw ) {
    if ( timeRaw === "now" ) {
      var t = day();
    } else if ( timeRaw.match( /\+\d+/ ) ) {
      const hours = timeRaw.match( /\+(\d+)/ )[1];
      var t = day().add( hours, "hour" );
    } else if ( timeRaw.match( /-\d+/ ) ) {
      const hours = timeRaw.match( /-(\d+)/ )[1];
      var t = day().subtract( hours, "hour" );
    } else if ( timeRaw.match( /\d+:?(\d+)?/ ) ) {
      const timeStr = timeRaw.match( /(\d+):?(\d+)?/ );
      const len = timeRaw.split( ":" ).length;

      if ( len === 2 ) {
        var hour = timeStr[1];
        var minute = timeStr[2];
      } else if ( len === 1 ) {
        var hour = timeStr[1];
        var minute = day().minute();
      }

      var t = day( `2000-1-1 ${hour}:${minute}` );
    } else { // now - if incorrect time
      var t = day();
    }
  } else { // now - if no time
    var t = day();
  }

  const date = `${d.year()}-${d.month() + 1}-${d.date()}`;
  const time = `${t.hour()}:${t.minute()}`; // This is inflexible, as it does not change the date if its the next/prev day

  return `${date} ${time}`;
}

/**
 * If dateTime is in the past
 */
function verify( dateTime ) {
  const dt = day( dateTime );

  return dt.isBefore( day() );
}

/**
 * Turn dateTime into smt human-readable
 */
function stringify( dateTime ) {
  const dt = day( dateTime );

  const isPast = verify( dateTime );

  return dt.fromNow();
}

module.exports = {
  parse,
  verify,
  stringify,
};

