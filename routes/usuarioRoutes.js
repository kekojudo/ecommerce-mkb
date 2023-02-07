const usuarioController = require('../controllers/usuariosController');
const passport = require('passport');
module.exports = (app, upload) =>{

    //get = obtener datos
    //post = almacenar datos
    //put = actualizar datos
    //delete = eliminar datos

    app.post('/api/usuarios/create',usuarioController.register);
    app.post('/api/usuarios/createWithImage',upload.array('image',1),usuarioController.registerWithImage);
    app.post('/api/usuarios/login',usuarioController.login);
    
    app.put('/api/usuarios/update', usuarioController.updateConPass);
}