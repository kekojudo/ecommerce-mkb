const db = require('../config/config');
const Direccion = {};


Direccion.create = (direccion, result) => {
    const sql = `
    INSERT INTO direcciones (
        direccion_dir,
        provincia_dir,
        ciudad_dir,
        latitud_dir,
        longitud_dir,
        id_usu,
        creado,
        modificado
    )values(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )
    `;

    db.query(
        sql,[
            direccion.direccion_dir, 
            direccion.provincia_dir,
            direccion.ciudad_dir,
            direccion.latitud_dir,
            direccion.longitud_dir,
            direccion.id_usu,
            new Date(), 
            new Date()],
        (err,res) => {
            if(err){
                console.log('Error: ',err)
                result(err,null)
            }
            else{
                console.log("id direccion nueva: ", res.insertId)
                result(null,res.insertId);
            }
                
        }
    )
}
Direccion.findByUser = (id_usu,result) => {
    const sql = `
        select 
            Convert(id_dir,char) as id_dir,
            direccion_dir,
            provincia_dir,
            ciudad_dir,
            latitud_dir,
            longitud_dir,
            convert(id_usu,char) as id_usu
        from direcciones
        where id_usu = ?

    `;
    db.query(
        sql,
        id_usu,
        (err,data) => {
            if(err){
                console.log('Error: ',err)
                result(err,null)
            }
            else{
            
                result(null,data);
            }
                
        }

    );
}

module.exports = Direccion;