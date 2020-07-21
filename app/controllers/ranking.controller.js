
const Ranking = require("../models/ranking.model.js");

exports.create = (req, res) => {    
     // Validate request
      if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      } 
  
      const ranking = new Ranking({     
       userName : req.body.userName,
       idReceta : req.body.idReceta,
        });   
      
        Ranking.create(ranking, (err, data) => {        
        if (err)
          res.status(500).send({
            message:
              "No se pudo realizar la transaccion."
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

 
  Ranking.getAll(req.params, (err, data) => {
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
  
    Ranking.updateById(req.params.idReceta,req.body.userName,(err, data) => {
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

