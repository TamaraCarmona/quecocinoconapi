const sql = require("./db.js");

const Ingrediente = require("../class/ingrediente.js");
const Categoria = require("../class/categoria.js");
const sqlFunction = require("./sql.js");


const Receta = function (receta) {
  this.idReceta = receta.idReceta;  
  this.tipoReceta = receta.tipoReceta; //Postre,bebida
  this.titulo = receta.titulo; 
  this.userName = receta.userName;
  this.categoria =receta.categoria;  //id categoria
  this.urlFoto = receta.foto;
  this.descripcion = receta.descripcion;
}


//Crear receta
Receta.create = (newReceta, result) => {      
  sqlFunction.NewRecipe(newReceta), (err, res) => {
      if (err) {      
        result("",null);
        return;
      }      
      result(null,true);
    };
      
  };
  
    //Busca la receta "" xq aca la todo el algoritmooo
    Receta.findById = (receta, result) => {
    sql.query(`SELECT * from receta R inner join Paso P on R.idReceta = P.idReceta
    inner join Ingredientes I on I.Receta_idReceta = R.idReceta where R.idReceta = '${receta.idReceta}'`, (err, res) => {
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

 // categoria 
 Receta.getAll = result => {
  sql.query("SELECT idCategoria,nombre FROM categoria", (err, res) => {
    if (err) {
      console.log("error: ", "error al obtener las categorias lol");
      result(null, " ");
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};
module.exports = Receta;