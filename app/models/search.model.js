const sql = require("./db.js");

const Search = function (search) {
    this.idReceta = search.idReceta;  
    this.tipoReceta = search.tipoReceta; //Postre,bebida
    this.titulo = search.titulo; 
    this.userName = search.userName;
    this.categoria =search.categoria;  //id categoria
    this.urlFoto = search.foto;
    this.descripcion = search.descripcion;
  }

Search.findById = (Search, result) => { // falta ver como se le hace la lista de ingredientesss
    sql.query(`SELECT R.idReceta,R.Usuario_idUsuario,I.Ingrediente_nombre,R.titulo,C.nombre
    from receta R inner join Ingredientes I on I.Receta_idReceta = R.idReceta 
    inner join categoria C on C.idCategoria = R.Categoria_idCategoria
    where I.ingrediente_nombre like '%${Search.ingrediente}%'`, (err, res) => {
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

 module.exports = Search;