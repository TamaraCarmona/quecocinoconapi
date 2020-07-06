const sql = require("./db.js");

module.exports.NewRecipe = function(receta){     
       let idReceta;  
       let idPaso;
        //Receta
        console.log(receta);        
        
        sql.query(`INSERT INTO receta (tipo,titulo,Usuario_idUsuario,Categoria_idCategoria,urlfoto) 
        values('${receta.tipoReceta}','${receta.titulo}','${receta.userName}',${receta.categoria},'data:image/png;base64,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')`,function(err, result, fields){                
            if (err) {
                // handle error
            }else{
                idReceta = result.insertId;
                console.log(idReceta);
            }
        });

        //Pasos         
        receta.pasos.map(paso=>{
            sql.query(`INSERT INTO paso (idReceta,descripcion) 
            values(${idReceta},'${paso.descripcion}')`,function(err, result, fields){
                if (err) {
                    // handle error
                }else{
                    idPaso = result.insertId;
                    console.log(idPaso);
                }
            });
        })
              
        //Foto             
        receta.fotos.map(foto => {
            sql.query(`INSERT INTO foto (urlFoto,orden,idPaso) 
            values('${foto.urlFoto}',${foto.orden},${idPaso})`)  
        })

        //Ingrediente
        receta.ingredientes.map(ingrediente=>{
            sql.query(`INSERT INTO ingrediente (Ingrediente_nombre,Receta_idReceta,cantidad,umedida) 
            values('${ingrediente.Ingrediente_nombre}',${ingrediente.idReceta},${ingrediente.cantidad},'${ingrediente.umedida}')`)     
        }) 

        
}
