const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const emitty = require('emitty').setup('pug', 'pug');

const onError = $.notify.onError('Line: <%= error.lineNumber %>: <%= error.message %>\n<%= error.fileName %> title: <%= error.plugin %>');

module.exports = (config) => () => {
    return new Promise((resolve, reject) => {
        emitty.scan(global.emittyChangedFile).then(() => {
            return gulp.src(['pug/*.pug', '!pug/_*.pug'])
                .pipe($.plumber({ errorHandler: onError }))
                .pipe($.if(global.watch, emitty.filter(global.emittyChangedFile)))
                .pipe($.pug({ pretty: true }))
                .pipe(gulp.dest(`${config.paths.dist}`))
                .on('end', resolve)
                .on('error', reject);
        });
    });

};
