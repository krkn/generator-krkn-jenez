"use strict";

var util = require( "util" ),
    path = require( "path" ),
    yeoman = require( "yeoman-generator" ),
    yosay = require( "yosay" ),
    chalk = require( "chalk" );

// TODO : generate jenez files (cf. http://yeoman.io/generators.html#writing-your-first-generator)
var KrknJenezGenerator = yeoman.generators.Base.extend( {
    init: function() {
        this.pkg = require( "../package.json" );

        this.on( "end", function() {
            if( !this.options[ "skip-install" ] ) {
                this.installDependencies();
            }
        } );
    },

    askFor: function() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log( yosay( "Welcome to the KRKN jenez generator." ) );

        var prompts = [ {
            type: "confirm",
            name: "someOption",
            message: "Would you like to enable this option?",
            default: true
        } ];

        this.prompt( prompts, function( props ) {
            this.someOption = props.someOption;

            done();
        }.bind( this ) );
    },

    app: function () {
        this.mkdir( "app" );
        this.mkdir( "app/templates" );

        this.copy( "_package.json", "package.json" );
        this.copy( "_bower.json", "bower.json" );
    },

    projectfiles: function () {
        this.copy( "editorconfig", ".editorconfig" );
        this.copy( "jshintrc", ".jshintrc" );
    }
} );

module.exports = KrknJenezGenerator;
