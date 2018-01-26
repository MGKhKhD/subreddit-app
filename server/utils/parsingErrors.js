const _ = require('lodash');

function parsingErrors(erros){
    let output ={};
    _.forEach(erros, (value, key) => 
        output[key] = value.message);
    return output;
}

module.exports = parsingErrors;