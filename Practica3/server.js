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
  res.send("Este es mi HOME")
})


app.get('/productos',async (req,res)=>{
  //console.log(await container.getAll())
  res.send(await container.getAll())
  })

app.get('/productoRandom',async (req,res)=>{
  //console.log(await container.getAll())
  res.send(await container.getRandomElement())
  })
