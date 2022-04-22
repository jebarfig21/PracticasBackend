const express = require('express')
const Contenedor = require('./Contenedor.js')
const PORT = 8080
const app = express()
//const container = Contenedor('productos.txt')
let container = new Contenedor('productos.txt')

const server = app.listen(PORT, ()=>{
  console.log("Servidor HTTP escuchando en el puerto"+PORT)

})


app.get('/', (req,res)=>{
  res.send("hola")
})


app.get('/productos', (req,res)=>{
  console.log(Promise.resolve(container.getAll()))
  res.send("hola")
  })
