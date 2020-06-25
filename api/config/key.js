const prod = require('./prod');
const dev = require('./dev');

/*To check the production environment*/
if(process.env.NODE_ENV === 'production'){
    module.exports = prod;
}else {
    module.exports = dev;
}
