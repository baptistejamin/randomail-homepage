module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ["dist", '.tmp', 'tmp'],
         i18n:{
            src: ['app/*.html'],
            dest: 'tmp/',
            options: {
                locales: 'app/locales/*.json',
                output: 'tmp/',
                base: 'app/'
            }
        },
        copy: {
            ressources: {
                expand: true,
                cwd: 'app/',
                src: ['favicon.ico', 'bower_components/**', 'js/**', 'font/**', 'css/**', 'img/**'],
                dest: 'tmp'
            },
            'template-en': {
                expand: true,
                cwd: 'app/',
                src: ['templates/**'],
                dest: 'tmp/en'
            },
            'template-fr': {
                expand: true,
                cwd: 'app/',
                src: ['templates/**'],
                dest: 'tmp/fr'
            },
            'tmp-dist': {
                expand: true,
                cwd: 'tmp/',
                src: ['**/*'],
                dest: 'dist/'
            }
        },
        includes: {
            en: {
                cwd: 'tmp/en',
                src: ['*.html'], // Source files
                dest: 'tmp/en', // Destination directory
                flatten: true
            },
            fr: {
                cwd: 'tmp/fr',
                src: ['*.html'], // Source files
                dest: 'tmp/fr', // Destination directory
                flatten: true
            }
        },
        rev: {
            files: {
                src: ['dist/**/*.{js,css}']
            }
        },

        useminPrepare: {
            html: 'dist/**/*.html'
        },

        usemin: {
            html: ['dist/**/*.html']
        },
        uglify: {
            options: {
                report: 'min',
                mangle: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-i18n');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');

    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', [
        'clean', 'i18n', 'copy:ressources', 'copy:template-en', 'copy:template-fr', 'includes', 'copy:tmp-dist', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin'
    ]);

    grunt.registerTask('include', [
        'clean', 'i18n', 'copy:ressources', 'copy:template-en', 'copy:template-fr', 'includes', 'copy:tmp-dist'
    ]);
};
