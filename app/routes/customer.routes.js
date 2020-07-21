
module.exports = app => {
    const users = require("../controllers/login.controller.js");
    const receta = require("../controllers/receta.controller.js");
    const search = require("../controllers/search.controller.js");
    const ranking = require("../controllers/ranking.controller.js");
    const favorite = require("../controllers/favorite.controller.js");

      //todas con ,midlelware esta es la que checkea el token 
    //USERS
    app.post("/user/login", users.findOne);   
    app.post("/user/register", users.create);    
    app.put("/user/update/:userName", users.update);
    app.delete("/user/delete/:userName", users.delete); // te desactiva

    
    //RECETAS
    app.post("/receta/create", receta.create);   
    app.get("/receta/receta/:idReceta", receta.findOne);
    app.put("/receta/delete/:idReceta",receta.update);//este elimina la receta

    //Categoria
    app.get("/categoria", receta.findAll);
   

    //Search
    app.post("/search/principal",search.findOne)
    app.get("/search/myreceta/:userName",search.findUserName)

    //Ranking
    app.post("/ranking/like", ranking.create);
    app.get("/ranking/top/:userName", ranking.findAll);    
    app.put("/ranking/like/delete/:idReceta",ranking.update);
    
     //favorite
    app.post("/favorite/create",favorite.create);
  //  app.put("/ranking/like/delete/:idReceta",favorite.update);
    app.get("/ranking/favorito/:userName", favorite.findAll);  

  };    

  