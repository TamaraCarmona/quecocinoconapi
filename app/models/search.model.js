const sql = require("./db.js");

const Search = function (search) { 
    this.ingredientes = search.ingredientes; //Postre,bebida    
    this.userName = search.userName;
    this.categoria =search.categoria;  //id categoria
    this.fullMatch = search.fullMatch;
  }

Search.findById = (Search, result) => { 
  console.log(Search.fullMatch)
  let conector;
  let basesql = `SELECT R.idReceta,R.Usuario_idUsuario,I.Ingrediente_nombre,R.titulo,C.nombre
                  from receta R inner join Ingredientes I on I.Receta_idReceta = R.idReceta 
                  inner join categoria C on C.idCategoria = R.Categoria_idCategoria
                  where I.ingrediente_nombre like `; 
  if(Search.fullMatch == true){
    conector = 'and';
  }else{
    conector = 'or';
  }
  
  for(let i = 0; i<Search.ingredientes.length;i++){
    if(i === Search.ingredientes.length-1){
      basesql+= `'%${Search.ingredientes[i].ingrediente}%' `; 
    }else{
      basesql+= `'%${Search.ingredientes[i].ingrediente}%' ${conector}`; 
    }  
  }
 
  sql.query(basesql, (err, res) => {
    if (err) { 
        console.log("error: ", err);
        result("err, null",null);
        return;
      }

      if (res.length) {
        console.log("found: ", res);
        result(null, res);
        return;
      }  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
 };


 Search.findByuserName = (Search, result) => {   // devuelve una lista de recetas por usuario
  let basesql = `SELECT R.idReceta,R.Usuario_idUsuario,I.Ingrediente_nombre,R.titulo,C.nombre
                  from receta R inner join Ingredientes I on I.Receta_idReceta = R.idReceta 
                  inner join categoria C on C.idCategoria = R.Categoria_idCategoria
                  where r.Usuario_idUsuario = '${Search.userName}'`; 
     
  sql.query(basesql, (err, res) => {
    if (err) { 
        console.log("error: ", err);
        result("err, null",null);
        return;
      }

      if (res.length) {
        console.log("found: ", res);
        result(null, res);
        return;
      }  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
 };
 module.exports = Search;