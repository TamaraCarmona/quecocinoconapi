const sql = require("./db.js");

module.exports.NewRecipe = function (receta,resultado)  {
    let idPaso;
    let idReceta;
    console.log("entre antes")
    //Receta                  
    sql.query(`INSERT INTO receta (tipo,titulo,Usuario_idUsuario,Categoria_idCategoria,urlfoto) 
        values('${receta.tipoReceta}','${receta.titulo}','${receta.userName}',${receta.categoria},'${receta.urlFoto}')`,
        function (err, result, fields) {
            if (err) {
               console.log(err);
               return
            } else {               
                idReceta = result.insertId;               
                console.log("entre a pasos")
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
                           console.log(idPaso,"estoy por entrar a la receta")
                           receta.fotos.map(foto => {
                            console.log("antes de insert en fotos")
                            sql.query(`INSERT INTO foto (urlFoto,orden,idPaso) 
                                values('${foto.urlFoto}',${foto.orden},${idPaso})`,
                                function (err, result, fields) {
                                    if (err) {
                                       console.log("err",err) // handle error
                                       return
                                    }else{
                                        console.log("entro en foto")
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
            console.log("sali")
            resultado(null, true);
        }
    );
  
}
