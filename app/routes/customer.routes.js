
module.exports = app => {
    const users = require("../controllers/login.controller.js");
    const receta = require("../controllers/receta.controller.js");
    const search = require("../controllers/search.controller.js");
      
    //USERS
    app.post("/user/login", users.findOne);   
    app.post("/user/register", users.create);    
    app.put("/user/update/:userName", users.update);
    app.delete("/user/delete/:userName", users.delete); // te desactiva

    
    //RECETAS
    app.post("/receta/create", receta.create);   
    app.get("/receta/receta/:idReceta", receta.findOne);
    //Categoria
    app.get("/categoria", receta.findAll);
    

    //Search
    app.post("/search/principal",search.findOne)
    app.get("/search/myreceta/:userName",search.findUserName)
   
  };    

  