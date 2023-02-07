const categoriasController = require('../controllers/categoriasController');
const passport = require('passport');
const { session } = require('passport');
module.exports = (app) =>{

    //get = obtener datos
    //post = almacenar datos
    //put = actualizar datos
    //delete = eliminar datos

    app.post('/api/categorias/create',passport.authenticate('jwt',{session: false}),categoriasController.create);
    app.get('/api/categorias/getAll',passport.authenticate('jwt',{session: false}),categoriasController.getAll);

    //passport.authenticate('jwt',{session: false}),
  
}