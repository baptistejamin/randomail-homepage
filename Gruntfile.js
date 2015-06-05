module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ["dist", '.tmp', 'tmp'],
        i18n: {
            src: ['tmp/*.html'],
            dest: 'dist/',
            options: {
                locales: 'tmp/locales/*.json',
                output: 'dist/',
                base: 'tmp/'
            }
        },
        copy: {
            tmp: {
                expand: true,
                cwd: 'app/',
                src: ['favicon.ico', 'bower_components/**', 'js/**', 'font/**', 'css/**', 'img/**', 'locales/*', 'templates/**', '*.html'],
                dest: 'tmp'
            },
            dist: {
                expand: true,
                cwd: 'tmp/',
                src: ['favicon.ico', 'bower_components/**', 'js/**', 'font/**', 'css/**', 'img/**', 'en/**', 'fr/**'],
                dest: 'dist'
            }
        },
        includes: {
            files: {
                cwd: 'tmp/',
                src: ['*.html'],
                dest: 'tmp/',
                flatten: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-i18n');

    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', [
        'clean', 'copy:tmp', 'includes', 'i18n', 'copy:dist'
    ]);
};
