module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    coffeelint: {
      options: {
        'no_backticks': {
          'level': 'ignore'
        }
      },
      app: ['src/*.coffee']
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['bower_components/watch/src/watch.js', 'dist/BiDirectionalBinding.js'],
        dest: 'build/BiDirectionalBinding.with.watch.js',
      },
    },
    uglify: {
      options: {
        mangle: true
      },
      withWatch: {
        files: {
          'build/BiDirectionalBinding.with.watch.js': ['build/BiDirectionalBinding.with.watch.js']
        }
      },
      withoutWatch: {
        files: {
          'build/BiDirectionalBinding.without.watch.js': ['dist/BiDirectionalBinding.js']
        }
      }
    },
    coffee: {
      compile: {
        files: {
          'dist/BiDirectionalBinding.js': 'src/BiDirectionalBinding.coffee'
        }
      }
    },
    watch: {
      files: ['src/BiDirectionalBinding.coffee'],
      tasks: ['coffeelint', 'coffee']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-coffeelint');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['coffeelint', 'coffee', 'concat', 'uglify']);

};