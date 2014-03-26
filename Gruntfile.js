/*

    This file is used to convert .mid files to data and insert into
    location IN a raw/HTML file.

    So from "midi/filename.mid" -> to -> "data:audio/midi;base64,TVRoZAAAAA.."


 Build environment
 ----------------------------------------
 1) Install NodeJS:
 http://nodejs.org/
 2) Install dev dependencies
 npm install
 3) Install Grunt CLI globally
 npm install grunt-cli -g
 */

module.exports = function (grunt) {
    grunt.initConfig({
        // sample configuration
        dataUri: {
            dist: {
                // src file
                src: ['raw/*.html'],
                // output dir
                dest: '',
                options: {
                    // specified files are only encoding
                    target: ['midi/*.*'],
                    // adjust relative path?
                    fixDirLevel: true
                    // img detecting base dir
                    // baseDir: './'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-data-uri');

    //grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-uglify');

    ///
    grunt.registerTask('default', ['dataUri']);
    ///
};