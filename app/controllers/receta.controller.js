const Receta = require("../models/receta.model.js");

//alta receta falta
exports.create = (req, res) => {   
  var bodyreceta = req.body.receta;  
  console.log(bodyreceta)

  // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    } 

    const receta = new Receta({     
        tipoReceta : bodyreceta.tipoReceta, 
        titulo : bodyreceta.titulo, 
        userName : bodyreceta.userName,
        categoria : bodyreceta.categoria,  
        urlFoto : bodyreceta.urlFoto,       
        //Ingredientes
        ingredientes: req.body.ingredientes,        
        //Pasos
        pasos : req.body.pasos,   
        //fotos
        fotos : req.body.fotos,         
      });   
    
      Receta.create(receta, (err, data) => {        
      if (err)
        res.status(500).send({
          message:
            "No se pudo realizar la transaccion."
        });
      else res.send(data);
    });
  };

  //categoria
  exports.findAll = (req, res) => {
    console.log(req)
    Receta.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
  };
 