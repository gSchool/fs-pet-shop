var fs = require( "fs" );
var file = "./pets.json";
var subCommand = process.argv[ 2 ];

if ( !subCommand ) {
	console.error( "Usage: node pets.js [read | create | update | destroy]" );
	process.exit( 9 );
}

if ( subCommand === "read" ) {
	var petIndex = process.argv[ 3 ];

	fs.readFile( file, "utf8", function( err, data ) {

		var pets = JSON.parse( data );
		if ( !petIndex || !pet[ petIndex ] ) {

			console.log( data );
		} else {
			//parse data
			console.log( pets[ petIndex ] );
		}

	} );

	if ( subCommand === "create" ) {
		var age = process.argv[ 3 ];
		var kind = process.argv[ 4 ];
		var name = process.argv[ 5 ];
		var pet = {
			"age": age,
			"kind": kind,
			"name": name
		}

		fs.readFile( file, "utf8", function( err, data ) {
			var parseFile = JSON.parse( data );
			parseFile.push( pet );
			fs.writeFile( file, JSON.stringify( parseFile ), function( err ) {

			} );
		} );

	}
}
