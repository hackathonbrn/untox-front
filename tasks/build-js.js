const gulp = require('gulp');
const webpack = require('webpack');
const wpConfig = require('../config/webpack.config');
const gulplog = require('gulplog');
const notifier = require('node-notifier');

module.exports = (config) => (callback) => {
    /*let firstBuildReady = false;

    function done(err, stats) {
        firstBuildReady = true;

        if (err) { // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
            return; // emit('error', err) in webpack-stream
        }

        gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
            colors: true,
            chunks: false,
        }));
    }
    */

    webpack(wpConfig, function(err, stats) {
        if (!err) { // no hard error
            // try to get a soft error from stats
            err = stats.toJson().errors[0];
        }

        if (err) {
            notifier.notify({
                title: 'Webpack',
                message: err
            });

            gulplog.error(err);
        } else {
            gulplog.info(stats.toString({
                colors: true
            }));
        }

        // task never errs in watch mode, it waits and recompiles
        if (!config.watch && err) {
            callback(err);
        } else {
            callback();
        }
    });

   /* return gulp.src(config.paths.js)
        .pipe($.plumber({
            errorHandler(err) {
                return $.notify("Hey dawg, error occured in Webpack, let's repair it");
            },
        }))
        .pipe(webpackStream(webpackConfig, null, done))
        .pipe(gulp.dest(`${config.paths.dist}/${config.output.js}`))
        .on('data', () => {
            if (firstBuildReady) {
                callback();
            }
        });
    */
};
