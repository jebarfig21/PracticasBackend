/**
* @author Jesus Barajas
* @version 1.0
* @date 7/4/2022
* Clase Usuario, define y manipula información de un objeto Usuario
*
*/

class Usuario{

  /**
    *constructor
    * @param {string} nombre   | Nombre del usuario
    * @param {string} apellido   | Apellido del usuario
    * @param {Object[]} libros | Arreglo de Objetos, se componen de {nombre:string,autor:string}
    * @param {string[]} mascotas | arreglo de string con le nombre de las mascotas de la Persona
  */

  constructor(nombre, apellido,libros = [],mascotas = []){
    this.nombre = nombre
    this.apellido = apellido
    this.libros = libros
    this.mascotas = mascotas
  }


  /**
    *@return {string} Representación en cadena string del nombre completo del usuario
  */

  getFullName(){
    return `${this.nombre} ${this.apellido}`
  }

  /**
    *@param {string} name Nombre de la mascota
    * Método que agrega el nombre de una mascota al arreglo mascotas[]
  */
  addMascota(name){
    this.mascotas.push(name)
  }

  /**
    * @return {int} número de mascotas de la Persona en el arreglo mascota[]
  */
  countMascotas(){
    return this.mascotas.length
  }

  /**
    *@param {string} nombre nombre del libro que se va a agregar
    *@param {autor} autor nombre del libro que se va a agregar
    Método que agrega libros al arreglo de libros de la Persona
  */
  addBook(nombre, autor){
    this.libros.push({
      nombre:nombre,
      autor:autor
    })
  }

  /**
    *  @return {string[]} regresa un arreglo de string con nombres de los libros que tiene registrados Persona en el arreglo libros
  */
  getBookNames(){
    let nombresLibros = []
    this.libros.forEach(libro => nombresLibros.push(libro.nombre))
    return nombresLibros
  }

}//Fin de la clase Persona


//Creación de obejto arbitrario
let p1 = new Usuario("Jesus","Barajas",[{nombre:"Cien años de Soledad",autor:"Gabriel Garcia Marquez"}],["perro","gato","perico"])

p1.addMascota("tucan")
p1.addBook("Harry Potter","JK Rowling")

console.log(
  p1.getFullName() + "\n" +
  p1.countMascotas()+ "\n" +
  p1.getBookNames()
)
