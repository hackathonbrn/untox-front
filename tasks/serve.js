const bs = require('browser-sync');

module.exports = (config) => () => {
    bs.init({ server: 'public' });
    bs.watch(['public/**/*.*']).on('change', bs.reload);
};
