const direccionesController = require('../controllers/direccionesController');
const passport = require('passport');
const { session } = require('passport');
module.exports = (app) =>{

    //get = obtener datos
    //post = almacenar datos
    //put = actualizar datos
    //delete = eliminar datos

    app.post('/api/direcciones/create',passport.authenticate('jwt',{session: false}),direccionesController.create);
    app.get('/api/direcciones/findByUser/:id_usu',passport.authenticate('jwt',{session: false}),direccionesController.findByUser);

    //passport.authenticate('jwt',{session: false}),
  
}