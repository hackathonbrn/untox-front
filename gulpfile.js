const gulp = require('gulp');
const config = require('./config/gulp.config');

function register(options) {
    return function (tasks) {
        for (let task in tasks) {
            gulp.task(task, require(`./tasks/${tasks[task]}`)(options));
        }
    };
}

register(config)({
    'clean'       : 'clean',
    'assets'      : 'assets',
    'build:js'    : 'build-js',
    'clean:svg'   : 'clean-svg',
    'pug'         : 'pug',
    'imagemin'    : 'imagemin',
    'watch'       : 'watch',
    'serve'       : 'serve',
    'build:svg'   : 'build-svg',
    'build:styles': 'build-styles',
    'eslint'      : 'eslint'
});

gulp.task('default', gulp.series('assets', 'build:svg', 'build:styles', 'imagemin', 'pug', 'build:js'));
gulp.task('build', gulp.series('clean','default'));
gulp.task('dev', gulp.series('build', gulp.parallel('serve', 'watch')));
gulp.task('dev-quick', gulp.series('default', gulp.parallel('serve', 'watch')));

