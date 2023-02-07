const db = require('../config/config');
const DetallePedidos = {};



DetallePedidos.create = (id_ped,id_pro,cantidad_pro, result) => {
    const sql = `
    INSERT INTO detalle_pedidos (
        id_ped,
        id_pro,
        cantidad_pro,
        creado,
        modificado
    )values(
        ?,
        ?,
        ?,
        ?,
        ?
    )
    `;

    db.query(
        sql,[
            id_ped, 
            id_pro,
            cantidad_pro,
            new Date(), 
            new Date()],
        (err,res) => {
            if(err){
                console.log('Error: ',err)
                result(err,null)
            }
            else{
                console.log("id del nuevo detalle: ", res.insertId)
                result(null,res.insertId);
            }
                
        }
    )
}

module.exports = DetallePedidos;