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
  let basesql = `SELECT distinct R.idReceta,R.urlFoto,R.Usuario_idUsuario,R.titulo,C.nombre, count(L.Receta_idReceta) as totalmegusta,
  IF((select F.Usuario_idUsuario
    from favorito F
    where F.Usuario_idUsuario = '${Search.userName}' and F.Receta_idReceta = R.idReceta) is not null ,true,false) as favorita,
  IF((select L.Usuario_idUsuario
      from likes L
      where L.Usuario_idUsuario =  '${Search.userName}' and L.Receta_idReceta = R.idReceta) is not null ,true,false) as megusta
  from receta R 
  inner join categoria C on C.idCategoria = R.Categoria_idCategoria
  left join likes L on L.Receta_idReceta = R.idReceta
  where R.idReceta in(select I.Receta_idReceta 
            from ingredientes I 
                      where I.ingrediente_nombre like  `; 

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
  
  basesql += `) and C.idCategoria = ${Search.categoria} group by  R.idReceta,R.Usuario_idUsuario,R.titulo,C.nombre`;
  console.log(basesql);
  sql.query(basesql, (err, res) => {
    if (err) { 
        console.log("error: ", err);
        result("err, null",null);
        return;
      }

      if (res.length) {       
        result(null, res);
        return;
      }  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
 };


 Search.findByuserName = (Search, result) => {  
  let basesql = `SELECT distinct R.idReceta,R.titulo,C.nombre,R.urlFoto
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
        result(null, res);
        return;
      }  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
 };
 module.exports = Search;