const express = require('express')
const handlebars = require('express-handlebars')
const Contenedor = require('./Contenedor.js')
let container = new Contenedor('productos.txt')
const PORT = 8080

const app = express()

app.engine('handlebars', handlebars.engine())

app.set('views', './views')

app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/productos',async (req,res)=>{
  await container.save(req.body)
  res.redirect('/productos');
})

app.get('/productos',async (req,res)=>{
  products = await container.getAll()
  res.render('productos',products)
})

const server = app.listen(PORT, ()=>{
  console.log("Servidor HTTP escuchando en el puerto"+PORT)
})
