const test = require( "ava" );

const gpg = require( "../lib/gpg" );

// verify - only works for one specifc key
// test( "verify correct [unit]", t =>
// gpg.verifyMsg( `-----BEGIN PGP SIGNED MESSAGE-----
// Hash: SHA256

// this is pass
// -----BEGIN PGP SIGNATURE-----

// iQIzBAEBCAAdFiEERlwH6gJl75lKFrMH1inUH73cyJcFAltORAEACgkQ1inUH73c
// yJdFbQ/9ErK2Jg+vA1SAzerI8ZZ+192wP3xC+cg65xMCUcubsq3ToilQQ2UaScr7
// 5tF93vPOxGGwSbdczUsnAIM5nU+f589GpS2ssy4qwFtP+KOCIjWJg+AgGa0O7zEp
// mtO3j46EO0jOQpSYxbsqbe7oNOfA+Q3yCDk2swBvS2Rz0Hg2Z9Eq+pMLd0mmjG24
// uZzxW0439tB3QsMoY59dMrluATKWa5DNdS94A8kelF5SgJhD+oqqyE/3cNghZ/bR
// 8y51R+QavZequ2KbNFTdknIhhUWdD7xycD+vBHUNz2U8uPgFkOnLLz2K2KI3ee32
// mnUF5OUj2/bNrkIKt3NdgyIU95uyjDaITRcbwXho+brfdeqPHKZKRBh7OD7++Fyh
// DfF19eANYYJs+Jgs0gpWvr5O+8akLJh0lKcl/IYqAW8YJ7cOE1SEDh0gYE1XM39n
// qIaiH+HdFDd5KONYdvDUXMPWG544u5IAxrH7yDWreKG7DiPuGU+h+TSTcxiaQ97z
// 62wJkGMz9DqHbORGdOdq95lWucQgix8zGC/IMbOcwuyB+dHi2nPtk/Lzhw7WNRX5
// zmIjIEdBaat4MwcbMuH2JdootUjG5YQ4yOoa8KhnBgDK33fYpUHIScksiJjOyZ3T
// E5Hgxu7lWXN9fbMb2hhOcS/Rt7uuY1WU4KL/lGhCYRsmYbTnfr0=
// =4PTP
// -----END PGP SIGNATURE-----` )
// .then( res => t.is( res, "this is pass" ) )
// );
// test( "verify false [unit]", t =>
// gpg.verifyMsg( `-----BEGIN PGP SIGNED MESSAGE-----
// Hash: SHA256

// this is not pass
// -----BEGIN PGP SIGNATURE-----

// iQIzBAEBCAAdFiEERlwH6gJl75lKFrMH1inUH73cyJcFAltORAEACgkQ1inUH73c
// yJdFbQ/9ErK2Jg+vA1SAzerI8ZZ+192wP3xC+cg65xMCUcubsq3ToilQQ2UaScr7
// 5tF93vPOxGGwSbdczUsnAIM5nU+f589GpS2ssy4qwFtP+KOCIjWJg+AgGa0O7zEp
// mtO3j46EO0jOQpSYxbsqbe7oNOfA+Q3yCDk2swBvS2Rz0Hg2Z9Eq+pMLd0mmjG24
// uZzxW0439tB3QsMoY59dMrluATKWa5DNdS94A8kelF5SgJhD+oqqyE/3cNghZ/bR
// 8y51R+QavZequ2KbNFTdknIhhUWdD7xycD+vBHUNz2U8uPgFkOnLLz2K2KI3ee32
// mnUF5OUj2/bNrkIKt3NdgyIU95uyjDaITRcbwXho+brfdeqPHKZKRBh7OD7++Fyh
// DfF19eANYYJs+Jgs0gpWvr5O+8akLJh0lKcl/IYqAW8YJ7cOE1SEDh0gYE1XM39n
// qIaiH+HdFDd5KONYdvDUXMPWG544u5IAxrH7yDWreKG7DiPuGU+h+TSTcxiaQ97z
// 62wJkGMz9DqHbORGdOdq95lWucQgix8zGC/IMbOcwuyB+dHi2nPtk/Lzhw7WNRX5
// zmIjIEdBaat4MwcbMuH2JdootUjG5YQ4yOoa8KhnBgDK33fYpUHIScksiJjOyZ3T
// E5Hgxu7lWXN9fbMb2hhOcS/Rt7uuY1WU4KL/lGhCYRsmYbTnfr0=
// =4PTP
// -----END PGP SIGNATURE-----` )
// .then( res => t.is( res, null ) )
// );

// version
test( "version [unit]", t => gpg.version()
  .then( x => t.is( x, "2.2.8" ) ) );

