const db = require('../config/config');
const Producto = {};

Producto.findByCategory = (id_categoria, result) => {
    const sql = `
    SELECT
        Convert(P.id_pro,char) as id_pro,  
        P.nombre_pro,
        P.desc_pro,
        P.precio_pro,
        P.stock_pro,
        P.foto1_pro,
        P.foto2_pro,
        Convert(P.id_cat,char) as id_cat
    FROM productos as P WHERE 
        
        P.id_cat = ? 
    `;
    db.query(
        sql,
        [id_categoria],
        (err,res) => {
            if(err){
                console.log('Error: ',err)
                result(err,null)
            }
            else
                console.log("id nuevo producto: ", res)
                result(null,res);
        }
    );
}
Producto.findByNombre = (id_categoria,nombre_pro, result) => {
    const sql = `
    SELECT
        Convert(P.id_pro,char) as id_pro,  
        P.nombre_pro,
        P.desc_pro,
        P.precio_pro,
        P.stock_pro,
        P.foto1_pro,
        P.foto2_pro,
        Convert(P.id_cat,char) as id_cat
    FROM productos as P WHERE 
        
        P.id_cat = ? AND LOWER(P.nombre_pro) LIKE ?
    `;
    db.query(
        sql,
        [id_categoria,`%${nombre_pro.toLowerCase()}%`],
        (err,res) => {
            if(err){
                console.log('Error: ',err)
                result(err,null)
            }
            else
                console.log("id nuevo producto: ", res)
                result(null,res);
        }
    );
}


Producto.create = (producto, result) => {
    const sql = `
    INSERT INTO productos (
        nombre_pro,
        desc_pro,
        precio_pro,
        stock_pro,
        foto1_pro,
        foto2_pro,
        id_cat,
        creado,
        modificado

    )values(
        ?,?,?,?,?,?,?,?,?
    )
    `;

    db.query(
        sql,[
            producto.nombre_pro, 
            producto.desc_pro, 
            producto.precio_pro,
            producto.stock_pro,
            producto.foto1_pro,
            producto.foto2_pro,
            producto.id_cat,
            new Date(),
            new Date()
            ],
        (err,res) => {
            if(err){
                console.log('Error: backend ',err)
                result(err,null)
            }
            
            else
                console.log("id nuevo producto: ", res.insertId)
                result(null,res.insertId);
        }
    )
}
Producto.update = (producto, result) => {
    const sql = `
     update productos 
     set 
        nombre_pro = ?,
        desc_pro = ?,
        precio_pro = ?,
        stock_pro = ?,
        foto1_pro = ?,
        foto2_pro = ?,
        id_cat = ?,
        modificado = ?
     where
        id_pro = ?
    `;

    db.query(
        sql,[
            producto.nombre_pro, 
            producto.desc_pro, 
            producto.precio_pro,
            producto.stock_pro,
            producto.foto1_pro,
            producto.foto2_pro,
            producto.id_cat,
            new Date(),
            producto.id_pro
            ],
        (err,res) => {
            if(err){
                console.log('Error: ',err)
                result(err,null)
            }
            
            else
                console.log("id producto actualizado: ", producto.id_pro)
                result(null,producto.id_pro);
        }
    )
}

module.exports = Producto;