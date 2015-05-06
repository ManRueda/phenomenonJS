var plato = require('plato');
var files = 'src/**/*.js';
var output = './platoReport';

plato.inspect(files, output, {}, function(){});