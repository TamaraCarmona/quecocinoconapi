const sql = require("./db.js");

// constructor
const Customer = function(customer) {
  this.pass = customer.pass;
  this.userName = customer.userName;
  this.email = customer.email;
  this.name = customer.name;
  this.apellido = customer.apellido;
  this.direccion = customer.direccion;
  this.dni = customer.dni;
};



//Login
Customer.findById = (Customer, result) => {
     sql.query(`SELECT * FROM usuario WHERE activo = 1 and idUsuario = '${Customer.name}' and password= '${Customer.pass}'`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result("err, null",null);
         return;
       }
  
       if (res.length) {
         console.log("found customer: ", res[0]);
         result(null, res[0]);
         return;
       }
  
       // not found Customer with the id
       result({ kind: "not_found" }, null);
      });
  };

//registro
  Customer.create = (newCustomer, result) => {
   console.log(newCustomer);
    sql.query(`INSERT INTO usuario (idUsuario,nombre,apellido,dni,direccion,email,canal,password,activo,urlfoto) 
    values('${newCustomer.userName}','${newCustomer.name}','${newCustomer.apellido}',${newCustomer.dni},'${newCustomer.direccion}','${newCustomer.email}','directo','${newCustomer.pass}',1,'${newCustomer.urlfoto}')` 
    , newCustomer, (err, res) => {
      if (err) {      
        result("",null);
        return;
      }     
      result(null, true);
    });
  };


  //update del registro

  Customer.updateById = (userName, newCustomer, result) => {
   console.log(newCustomer);
    sql.query(
      `UPDATE usuario SET email = '${newCustomer.email}', nombre = '${newCustomer.name}',direccion = '${newCustomer.direccion}', password = '${newCustomer.pass}',dni=${newCustomer.dni}, apellido='${newCustomer.apellido}' WHERE idUsuario = '${newCustomer.userName}'`,      
      (err, res) => {     
        if (err) {      
          result(null, "Error al actualizar el usuario.");
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
      
        result(null,true);
      }
    );
  };

  Customer.remove = (id, result) => {
    console.log(id)
    sql.query("update usuario set activo = 0 WHERE idUsuario = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, "error");
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted customer with id: ", id);
      result(null, res);
    });
  };
  
  
  module.exports = Customer;