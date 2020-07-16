// constructor
function Ingrediente(idReceta,cantidad,nombre,umedida) {
    this.idReceta = idReceta;  
    this.cantidad = cantidad; //Postre,bebida
    this.nombre = nombre; 
    this.umedida = umedida; 
  }
  module.exports = Ingrediente;