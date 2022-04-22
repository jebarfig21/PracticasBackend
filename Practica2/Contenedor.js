/**
* @author Jesus Barajas
* @version 1.0
* @date 13/4/2022
* Clase Contendor, implementa funcionalidaddes para poder manejar objetos dentro de un archivo
*/

class Contenedor{
  /**
  *@param {File} file Archivo donde se almacenan objetos
  */
  constructor(file){
    this.fs = require('fs')
    this.file = file
    this.objects
  }
  /**
    *  Metodo que almacena objetos en un arreglo JSON el cual se almacena en this.file
    *  @param {object} objeto El objeto que se quiere añadir al archivo
    * @return {int} id asignado del objeto guardado
  */
  async save(objeto){
    //let file
    try{
      let lectura = await this.fs.promises.readFile(this.file,'utf-8')
      this.objects = JSON.parse(lectura);
      let id = this.objects.slice(-1)[0] == undefined ? 1 : this.objects.slice(-1)[0].id + 1
      objeto.id = id
      this.objects.push(objeto)
      console.log(objeto)
      await this.fs.promises.writeFile(this.file, JSON.stringify(this.objects,null,10))
      console.log("Save check")
      return id

    }catch(err){
        await this.fs.promises.writeFile(this.file, "[]");
        this.save(objeto)
    }
  }
/**
* Metodo que devuelve un objeto basado en el id que tiene asignado
* @param {int} id El id del objeto que se quiere consultar
* @return {object} El objeto que tiene asociado id, si no es existe el objeto regresa null
*/
async getById(id){
  try{
    let file = await this.fs.promises.readFile(this.file);
    let objects = JSON.parse(file)
    if(id>0){
      for(let i = 0; i<objects.length;i++){
        if(objects[i].id == id){
          console.log(JSON.stringify(objects[i],null,5))
          return objects[i]
        }
      }
    }else{
      console.log(`Usuario ${id} no encontrado`)
      return null
    }
    console.log(`Usuario ${id} no encontrado`)
    return null
  }catch(err){
    console.log(`Usuario ${id} no encontrado`)
    return null
  }
}
/**
* Método para obtener todos los objetos almacenados en el archivo
* @return {Objeto[]} Regresa un arreglo de objetos con todos los objetos del archivo, en caso de no hbaer elemento regresa un areglo vacio
*/
async getAll(){
  try{
    let file = await this.fs.promises.readFile(this.file);
    let objects = JSON.parse(file)
    let object = objects.length > 0 ? objects : []
    console.log(object)
    return object
  }catch(err){
    console.log("No es posible obtener los objetos")
    return null
  }
}

/**
* Metodo que elimina un objeto basado en el id que tiene asignado
* @param {int} id El id del objeto que se quiere eliminar
*/

async deleteById(id){
  try{
    let file = await this.fs.promises.readFile(this.file);
    let objects = JSON.parse(file)
    let filtered = objects.filter(function(object){
        return object.id != id;
    })

    await this.fs.promises.writeFile(this.file, JSON.stringify(filtered,null,10))
    console.log("Objeto eliminado")

  }catch(err){
    console.log("No fue posible eliminar el objeto")
    return null
  }
}

/*
* Método que elimina todo el contenido del archivo
*/
async deleteAll(){
  try{
    await this.fs.promises.writeFile(this.file,"[]")
    console.log("Todos Los objeto eliminados")
  }catch(err){
    console.log("No es posible eliminar los datos en este momento, intente de nuevo")
  }
}
}//class

/********************
* Seción de pruebas *
*********************/

let contdr = new Contenedor('productos.txt')

//Arreglos con datos apara definir Titles aleatorios
const prenda=["Sudadera","Playera","Camisa","Blusa","Chamarra","Bufanda"]
const color=["Rojo","Azul","Verde","Rosa","Cafe","Blanca","Negra","Amarilla"]

//Esquema de objetos almacenado en documento

/**************************
* let obj = {             *
*  title : "Obj3",        *
*  price : 1e5,           *
*  thumbnail : "img2.pmg" *
* }                       *
***************************/

//Pruebas save(obj)

//Función auxiliar, genera un número random entre 0 y Max
function rndInt(max) {
  return Math.floor(Math.random() * (max) );
}

/*
//Pruebas con un for, las mantengo comentadas ya que no funcionaron
for(let i = 0;i<20;i++){

    contdr.save({
    title : prenda[rndInt(prenda.length)]+" "+color[rndInt(color.length)] ,
    price : rndInt(2000),
    thumbnail : "url"+parseInt(i)+".png"
  })
  setTimeout(()=>{null}, 5000)

}
*/

//Almacena un objeto por ejecución

contdr.save({
title : prenda[rndInt(prenda.length)]+" "+color[rndInt(color.length)] ,
price : rndInt(2000),
thumbnail : "url"+rndInt(2000)+".png"
})



/******************
* Pruebas getById *
*******************/

contdr.getById(5)
contdr.getById(95354)
contdr.getById(-81)


/* Se debe de funcionar
for(let i = 0;i<20;i++){
  contdr.getById(i)
}
*/

/*****************
* Pruebas getAll *
******************/

contdr.getAll()

/*****************
* Pruebas delete *
******************/


//contdr.deleteById(2)
//contdr.deleteById(2)


/********************
* Pruebas deleteAll *
*********************/

//console.log("Aqui se puede borrar todo, por favor descomenta la siguiente linea")
//  contdr.deleteAll()
