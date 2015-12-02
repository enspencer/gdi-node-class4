module.exports = function(grunt) {
  // 1st parameter: task command
  // 2nd parameter: description
  // 3rd parameter: function to run when `grunt default` is entered
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', 'this task says hello', function() {
    console.log('Hello!');
  });

  grunt.registerTask('greeting', 'say hello', function(name) {
    if (!name || !name.length) {
      grunt.warn('Please enter a name in the format grunt greeting:name');
    }

    console.log('Hello ' + name);
  });

  // Chaining Tasks





  grunt.initConfig({
    htmlhint: {
      build: {
        options: {
          'tag-pair': true,
          'tagname-lowercase': true,
          'attr-lowercase': true,
          'attr-value-double-quotes': true
        },
        src: ['index.html']
      }
    },
    watch: {
      html: {
        files: ['index.html'],
        tasks: ['htmlhint']
      }
    }
  });

};