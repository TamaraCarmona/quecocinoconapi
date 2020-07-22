const sql = require("./db.js");

const Ingrediente = require("../class/ingrediente.js");
const Categoria = require("../class/categoria.js");
const sqlFunction = require("./sql.js");


const Receta = function (receta) {
  this.tipoReceta = receta.tipoReceta; //Postre,bebida
  this.titulo = receta.titulo;
  this.userName = receta.userName;
  this.categoria = receta.categoria;  //id categoria
  this.urlFoto = receta.urlFoto;
  this.pasos = receta.pasos;
  this.ingredientes = receta.ingredientes;
  this.fotos = receta.fotos;
}


//Crear receta
Receta.create = (newReceta, result) => {
  console.log("entra a la funcion")
  sqlFunction.NewRecipe(newReceta, (err, res) => {
    if (err) {
      result("", null);
      return;
    }
    result(null, true);
  });

};

//Busca la receta "" xq aca la todo el algoritmooo
Receta.findById = (receta, result) => {
  sql.query(`SELECT * from receta R inner join Paso P on R.idReceta = P.idReceta
    inner join Ingredientes I on I.Receta_idReceta = R.idReceta where R.idReceta = '${receta.idReceta}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result("err, null", null);
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

Receta.findById = (newreceta, result) => {  
  var sqlquery =[`select R.titulo,R.urlfoto as urlReceta, R.Usuario_idUsuario as userName, C.nombre as categoria  
      from receta R inner join categoria C on C.idCategoria = R.Categoria_idCategoria where idReceta = ${newreceta.idReceta}`,
      `SELECT Ingrediente_nombre as nombre, cantidad, umedida FROM ingredientes where Receta_idReceta = ${newreceta.idReceta}`,
      `select * from paso where id_Receta =${newreceta.idReceta}`
    ];

  let respuesta  = {  
    'listIngredient':{},
    'listPaso':{},
  }

    sql.query(sqlquery[0], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result("err, null", null);
        return;
      }
      if (res.length) { 
          respuesta.receta = res;            
            sql.query(sqlquery[1], (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(null, " ");
                return;
              }
              if (res.length) {
                respuesta.listIngredient =res;               
                  sql.query(sqlquery[2], (err, res) => {
                    
                    if (err) {
                      console.log("error: ", err);
                      result(null, " ");
                      return;
                    }
                    if (res.length) {
                      respuesta.listPaso =res;
                      console.log(respuesta);
                      result(null, respuesta);

                    }          
                  });
              }          
            });
      }                 
    });

};

Receta.updateById = (idReceta, userName, result) => { 
  console.log(idReceta,userName)
  var sqlquery = [`delete from favorito
                   where Receta_idReceta = ${idReceta} and Usuario_idUsuario = ' ${userName}'`,
                   `delete from likes
                   where Receta_idReceta = ${idReceta} and Usuario_idUsuario = ' ${userName}'`,
                   `delete from ingredientes
                   where Receta_idReceta = ${idReceta} `,
                   `delete from paso
                   where id_Receta = ${idReceta}`,
                   `delete from receta
                   where idReceta = ${idReceta} and Usuario_idUsuario = ' ${userName}'`];
    
        sql.query(sqlquery[0], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result("err, null", null);
          return;
        }
        console.log(res)
        if (res) {                       
              sql.query(sqlquery[1], (err, res) => {
                if (err) {
                  console.log("error: ", err);
                  result(null, " ");
                  return;
                }
                if (res) {                            
                    sql.query(sqlquery[2], (err, res) => {                      
                      if (err) {
                        console.log("error: ", err);
                        result(null, " ");
                        return;
                      }
                      if (res) {                            
                        sql.query(sqlquery[3], (err, res) => {                      
                          if (err) {
                            console.log("error: ", err);
                            result(null, " ");
                            return;
                          }
                          if (res) {
                            sql.query(sqlquery[4], (err, res) => {                      
                              if (err) {
                                console.log("error: ", err);
                                result(null, " ");
                                return;
                              }                              
                              if (res) {   
                                console.log("entro")                           
                                result(null, true);          
                              }          
                            });      
                          }          
                        });
                      }           
                    });
                }          
              });
        }                 
      });
 };





module.exports = Receta;


