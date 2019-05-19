const gulp = require('gulp');

module.exports = (config) => () => {
    global.watch = true;
    gulp.watch(config.paths.styles, gulp.series('build:styles'));
    gulp.watch('pug/**/*.pug', gulp.series('pug'))
        .on('all', (event, filepath) => { global.emittyChangedFile = filepath; });
    gulp.watch(config.paths.imagmin, gulp.series('clean:svg', 'imagemin', 'build:svg'));
    gulp.watch(config.paths.svg_sprite, gulp.series('clean:svg', 'imagemin', 'build:svg'));
};
