const db = require('../config/config');
const Categoria = {};

Categoria.getAll = (result) => {

    const sql = `select CONVERT(id_cat, char) as id_cat, nombre_cat, desc_cat from categorias order by nombre_cat`;
    db.query(sql,(err,data) => {
        if(err){
            console.log('Error: ',err)
            result(err,null)
        }
        else{
            console.log("Categorias", data)
            result(null,data);
        }
    })

}

Categoria.create = (categoria, result) => {
    const sql = `
    INSERT INTO categorias (
        nombre_cat,
        desc_cat,
        creado,
        modificado
    )values(
        ?,
        ?,
        ?,
        ?
    )
    `;

    db.query(
        sql,[categoria.nombre_cat, categoria.desc_cat, new Date(), new Date()],
        (err,res) => {
            if(err){
                console.log('Error: ',err)
                result(err,null)
            }
            else{
                console.log("id categoria: ", res.insertId)
                result(null,res.insertId);
            }
                
        }
    )
}

module.exports = Categoria;