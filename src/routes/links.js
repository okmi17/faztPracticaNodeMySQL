const express = require("express");
const router = express.Router();
//importo una conexion a la BD, el pool hace referencia a la conexion de la base de datos
const pool = require('../dataBase');

//cuando el navegador le pida una peticion al servidor
router.get('/add', (req, res) => {//el req y res se encargan de manejar la peticion
    //res.send('formulario');//aca esolo para que me muestre un texto
    //la siguiente linea me renderiza una pagina web con handlebars
    res.render('links/add');
});
//esta ruta es la que uno enviar en el formulario que esta en add.hbs
/*router.post('/add',async(req,res)=>{try{//los datos que estamos recibiendo los recibimos a traves de un objeto llamado req.body
    console.log(req.body);
    //usamos destructuracion
    const {title, url,description}=req.body;
    //esto se vera redundante ya que simplemente podemos usar directamente el req.body, pero se hace de esta manera ya que mas adelante el objeto newLink lo tendremos que enlazar con un usuario es decir con una persona que ha creado esta tarea
    const newLink ={
        title,
        url,
        description
    };
    //guardo este dato dentro de la base de datos
    //el set significa que voy a establecer un nuevo dato, el  ? significa que a partir de ese simbolo me va a pasar el dato a insertar, esta consulta es una peticion asincrona significa que va a llevar tiempo por lo tanto voy a usar el await, como la linea de codigo que tiene el await de demora un tiempo para cumplirse entonces el await lo que hace es que espera a que esta peticion se cumpla y ahi si sigue ejecutando el codigo restante, aunque para que await funcione la funcion principal tiene que tener un async
    await pool.query('INSERT INTO links set ?', [newLink]);
    res.send('recibido')}
    catch(e){
        console.log('Error Caught');
        
    }
    
});*/
router.post('/add', async (req, res) => {
    console.log(req.body.title);

    const { title, url, description } = req.body;
    const nuevoLink = {
        title,
        url,
        description
    };
    console.log(nuevoLink.title);

    await pool.query('INSERT INTO links set ?', [nuevoLink]);
    //res.send('recibido');
    req.flash('success','link agregado correctamente');//el primer parametro es el nombre de como uno va a guardar el mensaje y el segundo parametro es el contenido de ese mensaje, para que dicho mensaje este disponible en todas las vista este se agregara en index,js en la parte de variables globales
    res.redirect('/links');
})
//va solo / ya que le precede automaticamente el /links ya que lo definimos en index.js
router.get('/',async(req,res)=>{ //esta consulta me devolvera todos los enlaces por lo tanto lo guardo en una constante
    const links = await pool.query('SELECT * FROM links');
    //console.log(links);
   // res.send('listas iran aqui');
   //renderizo la vista, y le paso los enlaces a esa vista
   res.render('links/list', {links});//que es igual al {links:links}
    
    
});
router.get('/delete/:id', async(req, res)=>{
    //console.log(req.params.id);
    //res.send('eliminado');
    const {id} = req.params;
    await pool.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('success','enlace removido exitosamente perro!')
    res.redirect('/links');
});
router.get('/edit/:id', async(req,res)=>{
    const {id}= req.params;
    /*console.log(id);
    res.send('recibido');*/
    const link= await pool.query('SELECT * FROM links WHERE id = ?',[id]);
    //console.log(link[0]);//para que sola mente me bote un objeto y no un arreglo de objetos
    
    res.render('links/edit',{link: link[0]});
})

router.post('/edit/:id', async(req,res)=>{
    const {id}= req.params;
    const {title, url, description}= req.body;
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('UPDATE links set ? WHERE id = ?',[newLink, id]);
    req.flash('success','El link ha sido actualizado exitosamente');
    res.redirect('/links');//para que vea los datos actualizados
})
module.exports = router;