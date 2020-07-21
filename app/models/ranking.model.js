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
 
Ranking.getAll =(userName, result) => {
    sql.query(`SELECT  R.idReceta,R.Usuario_idUsuario,R.titulo,C.nombre, count(L.Receta_idReceta) as totalmegusta,
    IF((select L.Usuario_idUsuario
        from likes L
        where L.Usuario_idUsuario = '${userName} ' and L.Receta_idReceta = R.idReceta) is not null ,'true','false') as megusta
    from receta R 
    inner join categoria C on C.idCategoria = R.Categoria_idCategoria
    left join likes L on L.Receta_idReceta = R.idReceta
    group by  R.idReceta,R.Usuario_idUsuario,R.titulo,C.nombre 
    having totalmegusta <> 0
    order by totalmegusta desc limit 10                
    `, (err, res) => {
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