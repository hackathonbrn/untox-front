const del = require('del');

module.exports = (config) => () => {
    return del(['public']);
};
