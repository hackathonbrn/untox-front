const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = (config) => () => {
    return gulp.src(`${config.paths.svg_sprite}`)
        .pipe($.plumber({
            errorHandler: $.notify.onError(err => ({
                title: "Hey guy, error occured in durring SVG, let's repair it",
                message: err.message,
            })),
        }))
        .pipe($.svgSprite({
            shape:
                {
                    spacing:
                        {
                            padding: 2,
                        },
                },
            mode: {
                dest: '',
                css: {
                    dest: 'public/css',
                    sprite: '../images/sprite/sprite.svg',
                    prefix: '@mixin svg-%s',
                    mixin: 'svg-common',
                    bust: true,
                    dimensions: true,
                    example: false,
                    render: config.preprocessor === 'sass' ? {
                            scss: {
                                dest: '../../styles/service/sprite.scss',
                            },
                        } :
                        {
                            less: {
                                dest: '../../styles/service/sprite.less',
                            },
                        },
                },
            },
            svg: {
                xmlDeclaration: false,
                doctypeDeclaration: false,
            },
        }))
        .pipe(gulp.dest('.'));
};
