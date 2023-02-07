const productosController = require('../controllers/productosController');
const passport = require('passport');
const { session } = require('passport');
module.exports = (app, upload) =>{

    //get = obtener datos
    //post = almacenar datos
    //put = actualizar datos
    //delete = eliminar datos

    app.post('/api/productos/create',upload.array('image',3),productosController.create);
    app.get('/api/productos/findByCategory/:id_categoria',passport.authenticate('jwt',{session: false}),productosController.findByCategory);
    app.get('/api/productos/findByNombre/:id_categoria/:nombre_pro',passport.authenticate('jwt',{session: false}),productosController.findByNombre);
    //passport.authenticate('jwt',{session: false}),
  
}