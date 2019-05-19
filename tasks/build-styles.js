const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const multipipe = require('multipipe');

module.exports = (config) => () => {
    return  gulp.src(`${config.paths.indexStyle}`)
        .pipe($.plumber({
            errorHandler: $.notify.onError(err => ({
                title: "Hey man, error occured in your Styles, let's repair it",
                message: err.message,
            }))
        }))
        .pipe($.if(config.isDevelopment, $.sourcemaps.init()))
        .pipe($[config.preprocessor]())
        //.pipe($.postcss(config.postcssConfig))
        .pipe($.cssimport())
        .pipe($.sourcemaps.write())
        .pipe($.if(!config.isDevelopment, multipipe($.groupCssMediaQueries(),$.csso())))
        .pipe($.rename('style.css'))
        .pipe(gulp.dest(`${config.paths.dist}/${config.output.css}/`));
};