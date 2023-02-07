const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');

/*
importar rutas
*/

const usuariosRoutes = require('./routes/usuarioRoutes');
const categoriasRoutes = require('./routes/categoriaRoutes');
const productosRoutes = require('./routes/productoRoutes');
const direccionesRoutes = require('./routes/direccionRoutes');
const pedidosRoutes = require('./routes/pedidoRoutes');
const { urlencoded } = require('express');
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express(urlencoded({
    extended: true
})));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.disable('x-powered-by');
app.set('port',port);
const upload = multer({
    storage: multer.memoryStorage()
})
//llamado de las rutas

usuariosRoutes(app,upload);
categoriasRoutes(app);
productosRoutes(app,upload);
direccionesRoutes(app);
pedidosRoutes(app);

/*server.listen(3000, '192.168.61.253' || 'localhost',function(){
    console.log('Aplicacion de nodejs ' + process.pid + ' Iniciado')
});*/

server.listen(port);
/*
server.listen(3000, '192.168.3.9' || 'localhost',function(){
    console.log('Aplicacion de nodejs ' + process.pid + ' Iniciado')
});*/
app.get('/',(req,res) => {
    res.send('Ruta raiz del backend');
});
app.get('/test',(req,res) => {
    res.send('Ruta del test');
});
//Manejo de errores
app.use((err,req,res,next) => {
console.log(err);
res.status(err.status || 500).send(err.stack);
});
