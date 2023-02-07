const db = require('../config/config');
const Pedido = {};



Pedido.create = (pedido, result) => {
    const sql = `
    INSERT INTO pedidos (
        id_cliente,
        id_dir,
        status,
        timestamp,
        creado,
        modificado
    )values(
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
            pedido.id_cliente, 
            pedido.id_dir,
            "PAGADO", // 1. PAGADO 2. DESPACHADO 3. EN CAMINO 4. ENTREGADO 
            Date.now(),
            new Date(), 
            new Date()],
        (err,res) => {
            if(err){
                console.log('Error: ',err)
                result(err,null)
            }
            else{
                console.log("id orden: ", res.insertId)
                result(null,res.insertId);
            }
                
        }
    )
}
Pedido.findByStatus = (status,result) => {
    const sql = `select 
	convert(p.id_ped,char) as id_ped,
    convert(p.id_cliente,char) as id_cliente,
    convert(p.id_bodega,char) as id_bodega,
    convert(p.id_dir,char) as id_dir,
    p.timestamp,
    p.status,
    JSON_OBJECT(
    'id_dir',convert(d.id_dir,char),
    'direccion_dir',d.direccion_dir,
    'ciudad_dir',d.ciudad_dir,
    'provincia_dir',d.provincia_dir,
    'latitud_dir',d.latitud_dir,
    'longitud_dir',d.longitud_dir
    ) as direccion,
    JSON_OBJECT(
    'id_usu',convert(u.id_usu,char),
    'nombre_usu',u.nombre_usu,
    'apellido_usu',u.apellido_usu,
    'foto_usu',u.foto_usu,
    'telefono_usu',u.telefono_usu
    ) as cliente,
    JSON_ARRAYAGG(
    JSON_OBJECT(
	'id_pro', convert(pro.id_pro,char),
    'nombre_pro', pro.nombre_pro,
    'desc_pro',pro.desc_pro,
    'foto1_pro',pro.foto1_pro,
    'foto2_pro',pro.foto2_pro,
    'precio_pro',pro.precio_pro,
    'cantidad_pro', dp.cantidad_pro 
    )
    ) as productos
from pedidos as p
inner join direcciones as d on d.id_dir = p.id_dir
inner join usuarios as u on u.id_usu = p.id_cliente
inner join detalle_pedidos dp on dp.id_ped = p.id_ped
inner join productos as pro on pro.id_pro = dp.id_pro
where status = ? 
group by p.id_ped
order by p.timestamp`;
db.query(
    sql,
    status,
    (err,data) => {
        if(err){
            console.log('Error: ',err)
            result(err,null)
        }
        else{
            result(null,data);
        }
            
    });

}
Pedido.findByBodegaYStatus = (status,result) => {
    const sql = `select 
	convert(p.id_ped,char) as id_ped,
    convert(p.id_cliente,char) as id_cliente,
    convert(p.id_bodega,char) as id_bodega,
    convert(p.id_dir,char) as id_dir,
    p.timestamp,
    p.status,
    JSON_OBJECT(
    'id_dir',convert(d.id_dir,char),
    'direccion_dir',d.direccion_dir,
    'ciudad_dir',d.ciudad_dir,
    'provincia_dir',d.provincia_dir,
    'latitud_dir',d.latitud_dir,
    'longitud_dir',d.longitud_dir
    ) as direccion,
    JSON_OBJECT(
    'id_usu',convert(u.id_usu,char),
    'nombre_usu',u.nombre_usu,
    'apellido_usu',u.apellido_usu,
    'foto_usu',u.foto_usu,
    'telefono_usu',u.telefono_usu
    ) as cliente,
    JSON_ARRAYAGG(
    JSON_OBJECT(
	'id_pro', convert(pro.id_pro,char),
    'nombre_pro', pro.nombre_pro,
    'desc_pro',pro.desc_pro,
    'foto1_pro',pro.foto1_pro,
    'foto2_pro',pro.foto2_pro,
    'precio_pro',pro.precio_pro,
    'cantidad_pro', dp.cantidad_pro 
    )
    ) as productos
from pedidos as p
inner join direcciones as d on d.id_dir = p.id_dir
inner join usuarios as u on u.id_usu = p.id_cliente
inner join detalle_pedidos dp on dp.id_ped = p.id_ped
inner join productos as pro on pro.id_pro = dp.id_pro
where status = ? and p.id_bodega =10
group by p.id_ped
order by p.timestamp`;
db.query(
    sql,
    status,
    (err,data) => {
        if(err){
            console.log('Error: ',err)
            result(err,null)
        }
        else{
            result(null,data);
        }
            
    });

}
Pedido.findByClienteYStatus = (id_usu,status,result) => {
    const sql = `select 
	convert(p.id_ped,char) as id_ped,
    convert(p.id_cliente,char) as id_cliente,
    convert(p.id_bodega,char) as id_bodega,
    convert(p.id_dir,char) as id_dir,
    p.timestamp,
    p.status,
    JSON_OBJECT(
    'id_dir',convert(d.id_dir,char),
    'direccion_dir',d.direccion_dir,
    'ciudad_dir',d.ciudad_dir,
    'provincia_dir',d.provincia_dir,
    'latitud_dir',d.latitud_dir,
    'longitud_dir',d.longitud_dir
    ) as direccion,
    JSON_OBJECT(
    'id_usu',convert(u.id_usu,char),
    'nombre_usu',u.nombre_usu,
    'apellido_usu',u.apellido_usu,
    'foto_usu',u.foto_usu,
    'telefono_usu',u.telefono_usu
    ) as cliente,
    JSON_ARRAYAGG(
    JSON_OBJECT(
	'id_pro', convert(pro.id_pro,char),
    'nombre_pro', pro.nombre_pro,
    'desc_pro',pro.desc_pro,
    'foto1_pro',pro.foto1_pro,
    'foto2_pro',pro.foto2_pro,
    'precio_pro',pro.precio_pro,
    'cantidad_pro', dp.cantidad_pro 
    )
    ) as productos
from pedidos as p
inner join direcciones as d on d.id_dir = p.id_dir
inner join usuarios as u on u.id_usu = p.id_cliente
inner join detalle_pedidos dp on dp.id_ped = p.id_ped
inner join productos as pro on pro.id_pro = dp.id_pro
where status = ? and p.id_cliente =?
group by p.id_ped
order by p.timestamp`;
db.query(
    sql,
    [status,id_usu],
    (err,data) => {
        if(err){
            console.log('Error: ',err)
            result(err,null)
        }
        else{
            result(null,data);
        }
            
    });

}
Pedido.updateDespachado = (id_ped, result) => {
    const sql = `
    update pedidos
        set 
        id_bodega = 10,
        status = ?,
        modificado = ?
    where
        id_ped = ?

    `;
    db.query(sql, [
        'EN DESPACHO',
        new Date(),
        id_ped
    ],(err,data) => {
        if(err){
            console.log('Error: ',err)
            result(err,null)
        }
        else{
            result(null,id_ped);
        }
            
    })
}
Pedido.updateEnviado = (id_ped, result) => {
    const sql = `
    update pedidos
        set 
        id_bodega = 10,
        status = ?,
        modificado = ?
    where
        id_ped = ?

    `;
    db.query(sql, [
        'ENVIADO',
        new Date(),
        id_ped
    ],(err,data) => {
        if(err){
            console.log('Error: ',err)
            result(err,null)
        }
        else{
            result(null,id_ped);
        }
            
    })
}

module.exports = Pedido;