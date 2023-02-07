const db = require('../config/config');
const Rol = {};

Rol.create = (id_usu, id_rol, result) => {
const sql = `insert into detalle_roles(id_usu,id_rol, creado, modificado)values(?,?,?,?);`;
db.query(sql,[id_usu, id_rol,new Date(), new Date()],
    (err,res) => {
        if(err){
            console.log('Error: ',err)
            result(err,null)
        }
        
        else
            console.log("Usuario Obtenido: ", res.insertId)
            result(null,res.insertId);
    })
};
module.exports = Rol;