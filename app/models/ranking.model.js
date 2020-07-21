const sql = require("./db.js");

const Ranking = function (ranking) { 
    this.userName =  ranking.userName;
    this.idReceta =  ranking.idReceta;
  }

  Ranking.create = (ranking, result) => {
    console.log(ranking)
    sql.query(`insert into likes(Usuario_idUsuario,Receta_idReceta) values('${ranking.userName}',${ranking.idReceta})`,
     (err, res) => {
      if (err) {
        console.log(err)
        result("", null);
        return;
      }
      console.log(result)
      result(null, true);
    });  
  };

  Ranking.updateById = (idReceta, userName, result) => {    
    console.log(idReceta,userName) 
    sql.query(
       `delete from likes where Receta_idReceta = ${idReceta} and Usuario_idUsuario = '${userName}'`,      
       (err, res) => {     
         if (err) {      
           result(null, "Error al eliminar");
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
 
Ranking.getAll = result => {
    sql.query(`SELECT R.idReceta,R.Usuario_idUsuario,I.Ingrediente_nombre as nombre,R.titulo,C.nombre
                from receta R inner join Ingredientes I on I.Receta_idReceta = R.idReceta 
                inner join categoria C on C.idCategoria = R.Categoria_idCategoria`, (err, res) => {
      if (err) {
        console.log("error: ", "error al ranking");
        result(null, " ");
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };

module.exports = Ranking;