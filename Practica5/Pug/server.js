const express = require('express');
const port = 8080
const app = express()
const Contenedor = require('./Contenedor.js')
let container = new Contenedor('productos.txt')

app.use('/static', express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Se indica el directorio donde se almacenarán las plantillas
app.set('views', './views');

// Se indica el motor del plantillas a utilizar
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index.pug'); // Se muestra la plantilla hello.pug
});

app.get('/productos',async(req, res) => {
  products = await container.getAll()
  res.render('productos.pug',{products: products});

});
app.post('/productos',async (req,res)=>{
  await container.save(req.body)
  res.redirect('/productos');
})

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));
