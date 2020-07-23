const sql = require("./db.js");

module.exports.NewRecipe = function (receta,resultado)  {
    let idPaso;
    let idReceta;    
    //Receta                  
    sql.query(`INSERT INTO receta (tipo,titulo,Usuario_idUsuario,Categoria_idCategoria,urlfoto) 
        values('${receta.tipoReceta}','${receta.titulo}','${receta.userName}',${receta.categoria},'${receta.urlFoto}')`,
        function (err, result, fields) {
            if (err) {
               console.log(err);
               return
            } else {               
                idReceta = result.insertId;               
              
                //Pasos                 
                receta.pasos.map(paso => {                                                            
                    sql.query(`INSERT INTO paso (id_Receta,descripcion) 
                               values(${idReceta},'${paso.descripcion}')`,
                    function (err, result, fields) {
                        if (err) {
                           console.log("err",err) // handle error
                           return
                        } else {
                           idPaso = result.insertId;                                                                                                                                                              
                           paso.listFoto.map(foto => {
                            console.log("ln28 map de list foto")
                            sql.query(`INSERT INTO foto (urlFoto,orden,idPaso) 
                                values('${foto}',1,${idPaso})`,
                                function (err, result, fields) {
                                    if (err) {
                                       console.log("err",err) // handle error
                                       return
                                    }else{                                                                            
                                        return
                                    } 
                                })  
                            })
                            
                        }
                    });
                })         

                //Ingrediente                            
                receta.ingredientes.map(ingrediente => {                                                 
                    sql.query(`INSERT INTO ingredientes (Ingrediente_nombre,Receta_idReceta,cantidad,umedida) 
                    values('${ingrediente.ingrediente}',${idReceta},${ingrediente.cantidad},'${ingrediente.umedida}')`,
                    function (err, result, fields) {
                        if (err) {
                           console.log("err",err) // handle error
                           return
                        }else{
                            console.log("entro en ingredientess")
                          
                        } 
                    })
                })
            }         
            resultado(null, true);
        }
    );
  
}
