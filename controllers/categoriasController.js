const Categoria = require('../models/categoria');
module.exports = {

    create(req,res){
        const categoria = req.body;
        Categoria.create(categoria, (err,id_cat) => {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                message: "La categoria se creo correctamente",
                data: `${id_cat}` //id de la nueva categoria
            })
        })},

        getAll(req,res){
            Categoria.getAll((err,data) => {
                if (err){
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error en el select',
                        error: err
                    })
                }
                return res.status(201).json(data);

            })
        }
    }

