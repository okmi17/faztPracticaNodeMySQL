const {format} = require('timeago.js');

//este objeto tiene que ser accedido por las vistas
const helpers ={};
//el timestamp es el que tengo en la bd, aunque este timestamp sera tomado desde la vista
helpers.timeago = (timestamp)=>{
    return format(timestamp);
}
module.exports= helpers;