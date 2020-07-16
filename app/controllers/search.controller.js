const Search = require("../models/search.model.js");

exports.findOne = (req, res) => {
    var bodysearch = req.body; 
    console.log(req);
    console.log(bodysearch);

    if (!req.body) {
      res.status(500).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const search = new Search({    
        categoria : bodysearch.categoria,
        userName : bodysearch.userName,           
        ingredientes: bodysearch.ingredientes, 
        fullMatch : bodysearch.fullMatch,
    });
    
    Search.findById(search, (err, data) => {
      if (err)
        res.status(401).send({
          message:
            "No se pudo realizar el listado."
        });
      else res.send(data);
    });
};

exports.findUserName = (req, res) => {
  console.log(req.params)
   if (!req.body) {
     res.status(500).send({
       message: "Content can not be empty!"
     });
   }
 
   //busca por el usuario
   Search.findByuserName(req.params, (err, data) => {
     if (err)
       res.status(401).send({
         message:
           "No se pudo encontrar el usuario"
       });
     else res.send(data);
   });
 };



