const Favorite = require("../models/favorite.model.js");

exports.create = (req, res) => {
    // Validate request
   
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    const favorite = new Favorite({     
        userName : req.body.userName,
        idReceta : req.body.idReceta,
    });   
       
  
     // Save Customer in the database
    Favorite.create(favorite, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            "No se pudo insert."
        });
      else res.send(data);
    });
};



exports.findAll = (req, res) => {   
    console.log(req.params)
    if (!req.body) {
      res.status(500).send({
        message: "Content can not be empty!"
      });
    }
  
   
    Favorite.getAll(req.params, (err, data) => {
      if (err)
        res.status(401).send({
          message:
            "No se pudo encontrar las recetas"
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
  
    Favorite.updateById(req.params.idReceta,req.body.userName,(err, data) => {
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