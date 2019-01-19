const express = require ("express");
const router= express.Router();

//definiendo rutas
router.get('/',(req,res)=>{
    res.send('hola putitos');
    
})
module.exports = router;