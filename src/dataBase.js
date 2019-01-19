//conexion a la base de datos
const mysql = require('mysql');
//aca usaremos destructuracion ya que no quiero traerme todo el objeto keys si no quiero una parte de ese objeto
const { database } = require('./keys');//es el nombre de la base de datos
//el createPool ayudara a mantener las conexiones a la base de datos y las matiene para asi evitar el gasto de recursos si todas las conexiones estan ocupadas crea una y la agrega a ese grupo de conexiones, y de paso se crea una conexion a la base de datos

//el modulo mysql no soporta promesas ni async away solo callbacks por lo tanto usaremos este modulo para poder transformar callbacks en promesas, pero es un metodo de util por lo tanto uso estructuracion por que solo me importa el metodo promisify
const { promisify } = require('util');

const pool = mysql.createPool(database);
//utilizamos pool
//utilizamos este metodo aqui para no estar teniendo que llamandolo cada momento cada vez que ejecuto el codigo, cada vez que quiero hacer una consulto simplemente llamo este modulo y ya este tiene la conexion, ademas pongo un callback con dos argumentos donde puede suceder dos casos un error o una conexion 
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('LA CONEXION CON LA BASE DE DATOS FUE CERRADA');
        }
        if (err.code === 'ER:CON_COUNT_ERROR') {
            console.error('LA BASE DE DATOS TIENE MUCHAS CONEXIONES');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('LA CONEXION  A LA BASE DE DATOS HA SIDO RECHAZADA');
        }

    }
    if (connection) connection.release();//con esto empieza la conexion
    console.log('BD CONECTADA!!');
    return;
})
//aca nos fijamos que pool es un objeto
pool.query = promisify(pool.query);//es decir cada vez que use un query voy a poder usar promesas o asyn away


module.exports = pool;