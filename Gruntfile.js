module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      dev: [
        'Gruntfile.js',
        'src/**/*.js',
        'test/**/*.js'
      ]
    },
    uglify: {
      build: {
        files: {
          'dist/phenomenonJS.min.js': ['src/phenomenonJS.js']
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('release', ['jshint', 'uglify:build']);

  // By default, lint and run all tests.
  grunt.registerTask('default', []);

};
