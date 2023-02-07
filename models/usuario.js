
const db = require('../config/config');
const bcrypt = require('bcryptjs');

const Usuario = {};

Usuario.FindById  = (id, result) =>{
    const sql = `select 
    CONVERT(us.id_usu, char),
    us.nombre_usu,
    us.apellido_usu,
    us.email_usu,
    us.telefono_usu,
    us.foto_usu,
    us.contra_usu,
    json_arrayagg(
    json_object(
    'id_rol',CONVERT(r.id_rol,char),
    'nombre_rol',r.nombre_rol,
    'imagen_rol',r.imagen_rol,
    'route',r.route)
    ) as roles
    from usuarios as us 
    inner join detalle_roles as dr on dr.id_usu = us.id_usu 
    inner join roles as r on r.id_rol = dr.id_rol
    where us.id_usu = ? group by us.id_usu`;
    db.query(sql,[id[0]],
        (err,user) => {
            console.log(id);
            if(err){
                console.log('Error: ',err)
                result(err,null)
            }
            
            else
                console.log("Usuario Obtenido: ", user)
                result(null,user);
        })

}
Usuario.FindByEmail  = (email_usu, result) =>{
    const sql = `select 
    us.id_usu,
    us.nombre_usu,
    us.apellido_usu,
    us.email_usu,
    us.telefono_usu,
    us.foto_usu,
    us.contra_usu,
    json_arrayagg(
    json_object(
    'id_rol',CONVERT(r.id_rol,char),
    'nombre_rol',r.nombre_rol,
    'imagen_rol',r.imagen_rol,
    'route',r.route)
    ) as roles
    from usuarios as us 
    inner join detalle_roles as dr on dr.id_usu = us.id_usu 
    inner join roles as r on r.id_rol = dr.id_rol
    where email_usu = ? `;
    db.query(sql,[email_usu],
        (err,user) => {
            if(err){
                console.log('Error: ',err)
                result(err,null)
            }
            
            else
                console.log("Usuario Obtenido: ", user[0])
                result(null,user[0]);
        })

}
Usuario.create = async (user,result) => {
    const hash = await bcrypt.hash(user.contra_usu,10);
    const sql = `
    insert into usuarios(
        email_usu,
        nombre_usu,
        apellido_usu,
        telefono_usu,
        contra_usu,
        foto_usu,
        creado_usu,
        modificado_usu
    ) values(?,?,?,?,?,?,?,?);`;
    db.query(
        sql,
        [
            user.email_usu,
            user.nombre_usu,
            user.apellido_usu,
            user.telefono_usu,
            hash,
            user.foto_usu,
            new Date(),
            new Date()
            
        ],
        (err,res) => {
            if(err){
                console.log('Error: ',err)
                result(err,null)
            }
            
            else
                console.log("id: ", res.insertId)
                result(null,res.insertId);
        }
    )
}
Usuario.updateConPass = async (user, result) => {

    const sql = `
    UPDATE usuarios
    set
        contra_usu = ?,
        modificado_usu = ?
    where
        id_usu = ?
    `;
    const hash = await bcrypt.hash(user.contra_usu,10);
    db.query(
        sql,
        [
            hash,
            new Date(),
            user.id_usu
            
        ],
        (err,res) => {
            if(err){
                console.log('Error: ',err)
                result(err,null)
            }
            
            else
                console.log("Usuario Actualizado: ", user.id_usu)
                result(null,user.id_usu);
        }
    )
    
}
    module.exports = Usuario;