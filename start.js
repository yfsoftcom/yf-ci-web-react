var register = require('babel-core/register');

register({
    presets: ['stage-3', 'es2015-node6']
});

require('./app.js');
