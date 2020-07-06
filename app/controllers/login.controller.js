
const Customer = require("../models/login.model.js");

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  console.log(req);
  if (!req.body) {
    res.status(500).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const customer = new Customer({
    pass : req.body.pass,
    name: req.body.name,
  });

  // busca el usuario
  Customer.findById(customer, (err, data) => {
    if (err)
      res.status(401).send({
        message:
          "Usuario incorrecto, culiau."
      });
    else res.send(data);
  });
};

//register
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  var register = req.body.register;
  // Create a Customer
  const customer = new Customer({
    pass : register.pass,
    email: register.email,
    name: register.name,
    userName: register.userName,
    apellido: register.apellido,
    dni: register.dni,
    direccion: register.direccion, 
    urlfoto: register.urlfoto 
  });

   // Save Customer in the database
  Customer.create(register, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          "No se pudo registrar."
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

  Customer.updateById(req.params.customerId,req.body.register,(err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Customer.remove(req.params.userName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.userName}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.userName
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};


