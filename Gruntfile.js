module.exports = function(grunt) {
  require('time-grunt')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['js/**/*.js']
    },


    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true,
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }
      }
    },


    notify_hooks: {
      options: {
        enabled: true,
        max_jshint_notifications: 5, // maximum number of notifications from jshint output 
        title: "Portfolio", // defaults to the name in package.json, or will use project directory's name 
        success: true, // whether successful grunt executions should be notified automatically 
        duration: 3 // the duration of notification in seconds, for `notify-send only 
      }
    },

    watch: {
      grunt: {
        options: {
          reload: true 
        },
        files: ['Gruntfile.js']
      },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },
      js: {
        files: ['js/**/*.js'],
        tasks: ['jshint']
      },
    },

    imagemin: {
      dynamic: {                         // Another target 
        files: [{
          expand: true,                  // Enable dynamic expansion 
          cwd: 'src/',                   // Src matches are relative to this path 
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match 
          dest: 'dist/'                  // Destination path prefix 
        }]
      }
    },

    plato: {
      your_task: {
        options : {
          jshint : false
        },
        files: {
          'reports': ['js/**/*.js']
        }
      }
    }, 

    uglify: {
    my_target: {
      files: {
        'main.min.js': ['bower_components/jquery/dist/jquery.min.js', 'bower_components/foundation/js/foundation.min.js', 'bower_components/foundation/js/foundation/foundation.magellan.js', 'bower_components/foundation/js/foundation/foundation.equalizer.js', 'js/app.js']
      }
    }
  }
    


  });

  grunt.loadNpmTasks('grunt-plato');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');

  // This is required if you use any options. 
  grunt.task.run('notify_hooks');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build', 'uglify', 'jshint', 'plato', 'newer:imagemin', 'watch']);
}
