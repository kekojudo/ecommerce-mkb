const Pedido = require('../models/pedido');
const DetallePedidos = require('../models/detalle_pedido');
module.exports = {
    findByStatus(req,res){
        const status = req.params.status;
        Pedido.findByStatus(status, (err,data) => {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el listado de ordenes',
                    error: err
                })
            }
            
            for(const d of data){
                d.direccion = JSON.parse(d.direccion);
                d.cliente = JSON.parse(d.cliente);
                d.productos = JSON.parse(d.productos);
            }
            
            return res.status(201).json(data);
        })
    },
    findByBodegaYStatus(req,res){
        const status = req.params.status;
        Pedido.findByBodegaYStatus(status, (err,data) => {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el listado de ordenes',
                    error: err
                })
            }
            
            for(const d of data){
                d.direccion = JSON.parse(d.direccion);
                d.cliente = JSON.parse(d.cliente);
                d.productos = JSON.parse(d.productos);
            }
            
            return res.status(201).json(data);
        })
    },
    findByClienteYStatus(req,res){
        const status = req.params.status;
        const id_cliente = req.params.id_cliente;
        Pedido.findByClienteYStatus(id_cliente,status, (err,data) => {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el listado de ordenes',
                    error: err
                })
            }
            
            for(const d of data){
                d.direccion = JSON.parse(d.direccion);
                d.cliente = JSON.parse(d.cliente);
                d.productos = JSON.parse(d.productos);
            }
            
            return res.status(201).json(data);
        })
    },

    async create(req,res){
        const pedido = req.body;
        Pedido.create(pedido, async (err,id_ped) => {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de la orden',
                    error: err
                })
            }
            for(const producto of pedido.productos){
                await DetallePedidos.create(id_ped, producto.id_pro, producto.cantidad_pro,(err,id_data) => {
                    if (err){
                        return res.status(501).json({
                            success: false,
                            message: 'Hubo un error con el registro del detalle',
                            error: err
                        })
                    }

                });
            }
            return res.status(201).json({
                success: true,
                message: "El pedido se creo correctamente",
                data: `${id_ped}` //id de la nueva categoria
            })
        })},

        updateDespachado(req,res){
            const pedido = req.body;
            Pedido.updateDespachado(pedido.id_ped, (err,id_ped) => {
                if (err){
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error actualizando la orden',
                        error: err
                    })
                }
                return res.status(201).json({
                    success: true,
                    message: "El pedido se actualizo correctamente",
                    data: `${id_ped}` //id de la nueva categoria
                })
            })
        },
        updateEnviado(req,res){
            const pedido = req.body;
            Pedido.updateEnviado(pedido.id_ped, (err,id_ped) => {
                if (err){
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error actualizando la orden',
                        error: err
                    })
                }
                return res.status(201).json({
                    success: true,
                    message: "El pedido se actualizo correctamente",
                    data: `${id_ped}` //id de la nueva categoria
                })
            })
        }
       

    }

