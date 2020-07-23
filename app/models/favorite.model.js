const sql = require("./db.js");

const Favorite = function (favorite) { 
    this.userName =  favorite.userName;
    this.idReceta =  favorite.idReceta;
  }

  Favorite.create = (favorite, result) => {   
   console.log(favorite)
    sql.query(`insert into favorito(Usuario_idUsuario,Receta_idReceta) values('${favorite.userName}',${favorite.idReceta})`,
     (err, res) => {
      if (err) {
        console.log(err)
        result("", null);
        return;
      }
     
      result(null, true);
    });  
  };


  Favorite.updateById = (idReceta, userName, result) => {    
    console.log(idReceta,userName) 
    sql.query(
       `delete from favorito where Receta_idReceta = ${idReceta} and Usuario_idUsuario = '${userName}'`,      
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


   Favorite.getAll =(userName, result) => {     
     console.log(userName)
    sql.query(`SELECT distinct R.idReceta,R.Usuario_idUsuario,R.urlFoto,R.titulo,C.nombre, count(L.Receta_idReceta) as totalmegusta,
    IF((select F.Usuario_idUsuario
        from favorito F
        where F.Usuario_idUsuario = '${userName.userName}' and F.Receta_idReceta = R.idReceta) is not null ,true,false) as favorita,
    IF((select L.Usuario_idUsuario
        from likes L
        where L.Usuario_idUsuario =  '${userName.userName}' and L.Receta_idReceta = R.idReceta) is not null ,true,false) as megusta
    from receta R 
    inner join categoria C on C.idCategoria = R.Categoria_idCategoria
    inner join favorito F on F.Receta_idReceta = R.idReceta
    left join likes L on L.Receta_idReceta = R.idReceta
    group by  R.idReceta,R.Usuario_idUsuario,R.titulo,C.nombre 
                 
    `, (err, res) => {
      if (err) {
        console.log("error: ", "error favorito");
        result(null, " ");
        return;
      }
      
      result(null, res);
    });
  };

  module.exports = Favorite;