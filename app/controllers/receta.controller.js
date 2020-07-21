const Receta = require("../models/receta.model.js");

//alta receta falta
exports.create = (req, res) => {   
  var bodyreceta = req.body.receta;  
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
    Receta.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
  };

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
 console.log(req.params)
  if (!req.body) {
    res.status(500).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const receta = new Receta({
    pass : req.body.idReceta,    
  });

  // busca el usuario
  Receta.findById(req.params, (err, data) => {
    if (err)
      res.status(401).send({
        message:
          "No se pudo cargar la receta"
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  Receta.updateById(req.params.idReceta,req.body.userName,(err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.idReceta}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.idReceta
          });
        }
      } else res.send(data);
    }
  );
};



 