const express = require('express');
const morgan = require('morgan');//midleware
const exphbs = require('express-handlebars');//engine html
const path = require('path');

//inicializacion
const app = express();//me devuelve un objeto


//configuraciones
//lo que se esta diciendo aqui es que definimos un puerto y si hay un puerto disponible en el SO lo coge y si no ps use el puerto 4000
app.set('port',process.env.PORT || 4000);
//la siguiente linea de codigo le dice donde esta la carpeta views a node ya que este no sabe
app.set('views',path.join(__dirname, 'views'));//aca establezco donde esta la carpeta views, __dirname me devuelve la direccion de donde se esta ejecutando este archivo 
app.engine('.hbs', exphbs({//en este objeto pondre el nombre de la plantilla q voy a utilizar, donde estaran las vistas que voy a crear
    defaultLayout: 'main',//nombre de la plantilla principal
    layoutsDir: path.join(app.get('views'),'layouts'),//aqui pongo la direccion donde esta el archivo main
    //partials es la carpeta donde ira codigo html reutilizable
    partialsDir: path.join(app.get('views') , 'partials'),
    //extname es el nombre de la extension que voy a usar para loar achivos de handlebars
    extname: '.hbs',
    //con handlebars se pueden agregar funciones para darle superpoderes al html el problema es que estos tienen que ir en un archivo aparte entonces estas funciones las pondre en la carpeta de lib
    helpers: require('./lib/handlebars')
}))

//inicio el engine de handlebars
app.set('view engine', '.hbs');


//midlewares ( son funciones que se ejecutan cada vez que un usuario pide una peticion al server)
app.use(morgan('dev'));//para ejecutarlo necesitamos un parametro y usamos 'dev' el cual nos muestra un determinado tipo de mensaje por la consola
//la siguiente linea me servira para poder aceptar los datos que me envia los usuarios a traves de formularios, la propiedad extended :false se refiere a que solo voy a aceptar datos sencillos como string, es decir no voy a aceptar datos como imagenes y eso 
app.use(express.urlencoded({extended: false}))
//si quiero recibir y enviar json
app.use(express.json());



//variables Globales
//esta funcion me servira para poner variables en cualquier archivo del proyecto
app.use((req, res,next)=>{
    next();
})


//routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
//el primer argumento de la siguiente linea se refiere A QUE CUANDO  yo quiera obtener todas las rutas links yo tengo que pedirle a '/links
app.use('/links',require('./routes/links'));

//archivos publicos ( es una carpeta donde se pondra todo el codigo que el navegador puede acceder)
//el metodo static recibe una direccion 
app.use(express.static(path.join(__dirname+'public')));

//starting the server
//aca estamos utilizando el puerto que definimos arriba, despues se hace un callback
app.listen(app.get('port'),()=>{
    console.log('server on port: '+ app.get('port'));
    
})

//1:53:27





//npm run dev