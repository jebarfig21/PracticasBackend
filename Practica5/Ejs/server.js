// load the things we need
var express = require('express');
var app = express();
const Contenedor = require('./Contenedor.js')
let container = new Contenedor('productos.txt')
const PORT = 8080
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.post('/productos',async (req,res)=>{
  await container.save(req.body)
  res.redirect('pages/productos');
})

app.get('/productos',async (req,res)=>{
  products = await container.getAll()
  res.render('pages/productos',{products: products})
})

const server = app.listen(PORT, ()=>{
  console.log("Servidor HTTP escuchando en el puerto"+PORT)
})
