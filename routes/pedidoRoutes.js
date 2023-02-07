
const passport = require('passport');
const pedidosController = require('../controllers/pedidosController');
const { session } = require('passport');
module.exports = (app) =>{

    //get = obtener datos
    //post = almacenar datos
    //put = actualizar datos
    //delete = eliminar datos

    app.post('/api/pedidos/create',passport.authenticate('jwt',{session: false}),pedidosController.create);
    app.get('/api/pedidos/findByStatus/:status',passport.authenticate('jwt',{session: false}),pedidosController.findByStatus);
    app.get('/api/pedidos/findByBodegaYStatus/:status',passport.authenticate('jwt',{session: false}),pedidosController.findByBodegaYStatus);
    app.get('/api/pedidos/findByClienteYStatus/:id_cliente/:status',passport.authenticate('jwt',{session: false}),pedidosController.findByClienteYStatus);
    app.put('/api/pedidos/updateDespachado',passport.authenticate('jwt',{session: false}),pedidosController.updateDespachado);
    app.put('/api/pedidos/updateEnviado',passport.authenticate('jwt',{session: false}),pedidosController.updateEnviado);

    //passport.authenticate('jwt',{session: false}),
  
}