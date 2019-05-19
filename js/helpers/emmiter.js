const ee = require('event-emitter');

const Emitter = function() { /* ... */ };
ee(Emitter.prototype); 

export default new Emitter();

