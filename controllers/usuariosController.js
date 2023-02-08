
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');
const Rol = require('../models/rol');
const { updateConPass } = require('../models/usuario');
module.exports = {
    
    login(req,res){

        // puede que aqui haya un error
        const email = req.body.email_usu;
        const password = req.body.contra_usu;
        //puede que aqui termine el error

        Usuario.FindByEmail(email, async (err,myUser) => {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'No se encontro al usuario',
                    error: err
                })
            }
            if(!myUser){
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado',
                    
                })
            }
            const isPasswordValid = await bcrypt.compare(password,myUser.contra_usu);
            if(isPasswordValid){
                const token = jwt.sign({id_usu:myUser.id_usu,email_usu:myUser.email_usu},keys.secretOrKey, {});
                const data ={
                    id_usu: `${myUser.id_usu}`,
                    nombre_usu: myUser.nombre_usu,
                    apellido_usu: myUser.apellido_usu,
                    email_usu: myUser.email_usu,
                    telefono_usu : myUser.telefono_usu,
                    foto_usu : myUser.foto_usu,
                    session_token: `JWT ${token}`,
                    roles: JSON.parse(myUser.roles)
                }
                console.log(data);
                
                return res.status(201).json({
                    success: true,
                    message: "La autenticación fue exitosa",
                    data: data
                })
                
            }
            else{
                return res.status(401).json({
                    success: false,
                    message: 'El password es incorrecto',
                    
                })
            }
            
        } );
    },

    register(req,res){

        const usuario = req.body; //capturar datos que envia el cliente
        Usuario.create(usuario, (err,data) => {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                message: "El registro fue exitoso",
                data: data
            })
        })
    },
    async registerWithImage(req,res){

        const usuario = JSON.parse(req.body.usuario); //capturar datos que envia el cliente
        
        const files = req.files;

        if(files.length > 0){
            const path = `image_${Date.now()}`;
            const url = await storage(files[0],path);

            if(url != undefined && url != null){
                usuario.foto_usu = url;
            }
        }
        Usuario.create(usuario, (err,data) => {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                })
            }
            
            usuario.id_usu = `${data}`;
            const token = jwt.sign({id_usu:usuario.id_usu,email_usu:usuario.email_usu},keys.secretOrKey, {});
            usuario.session_token = `JWT ${token}`;
            Rol.create(usuario.id_usu,3, (err,data) => {
                if (err){
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del rol',
                        error: err
                    })
                }
            })

            return res.status(201).json({
                success: true,
                message: "El registro fue exitoso",
                data: usuario
            })
        })
    },
    async updateConPass(req,res){

        const usuario = req.body; //capturar datos que envia el cliente
        usuario.roles = JSON.parse(usuario.roles);
        Usuario.updateConPass(usuario, (err,data) => {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                message: "El registro fue exitoso",
                data: usuario
            });
            
            
        })
    }
    
}