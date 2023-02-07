const Producto = require('../models/producto');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');


module.exports = {

    async create(req,res){
        
        const producto = JSON.parse(req.body.producto); //capturar datos que envia el cliente
        
        const files = req.files;

        let inserts = 0;

        if(files.length === 0){
            return  res.status(501).json({
                success: false,
                message: 'Error, el producto no tiene imagenes',
                error: err
            });

        }else{

            Producto.create(producto, (err,id_pro) => {
                if (err){
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del producto',
                        error: err
                    })
                }
                producto.id_pro = id_pro;
                const start = async () => {
                    await asyncForEach(files,async (file) => {
                        const path = `image_${Date.now()}`;
                        const url = await storage(file,path);

                        if(url != undefined && url != null){
                            if(inserts === 0){
                                producto.foto1_pro = url;
                            }else if (inserts === 1){
                                producto.foto2_pro = url;
                            }
                            
                        }
                        await Producto.update(producto, (err, data) =>{
                            if (err){
                                return res.status(501).json({
                                    success: false,
                                    message: 'Hubo un error con el registro del producto',
                                    error: err
                                })
                            }
                            inserts = inserts + 1;
                            if(inserts == files.length){//termino de almacenar las imagenes
                                return res.status(201).json({
                                    success: true,
                                    message: 'El registro se realizo correctamente',
                                    data: data
                                })
                            }
                        });
                    })
                }
                start();
                
            
            })

        }

        if(files.length > 0){
            
        }
        
    },

    findByCategory(req,res){
        const id_categoria = req.params.id_categoria;

        Producto.findByCategory(id_categoria, (err,data) => {

            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al listar los productos',
                    error: err
                })
            }
            return res.status(201).json(data);

        })
    },
    findByNombre(req,res){
        const id_categoria = req.params.id_categoria;
        const nombre_pro = req.params.nombre_pro;

        Producto.findByNombre(id_categoria, nombre_pro, (err,data) => {

            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al listar los productos',
                    error: err
                })
            }
            return res.status(201).json(data);

        })
    }
    
}
