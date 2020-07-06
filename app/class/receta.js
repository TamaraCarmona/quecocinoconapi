// constructor
  function Receta(idReceta,tipoReceta,titulo,userName,categoria,urlFoto) {
    this.idReceta = idReceta;  
    this.tipoReceta = tipoReceta; //Postre,bebida
    this.titulo = titulo; 
    this.userName = userName;
    this.categoria = categoria;  //id categoria
    this.urlFoto = urlFoto;   
  }

  module.exports = Receta;