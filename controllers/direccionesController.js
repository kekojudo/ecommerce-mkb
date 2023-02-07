const Direccion = require('../models/direccion');
module.exports = {

    create(req,res){
        const direccion = req.body;
        Direccion.create(direccion, (err,id_dir) => {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de la dirección',
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                message: "La dirección se creo correctamente",
                data: `${id_dir}` //id de la nueva categoria
            })
        })},

        findByUser(req,res){
            const id_usu = req.params.id_usu;
            Direccion.findByUser(id_usu, (err,data)=>{
                if (err){
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error al obtener las direcciones',
                        error: err
                    })
                }
                return res.status(201).json(data);
            }
            )
        }

        
    }

