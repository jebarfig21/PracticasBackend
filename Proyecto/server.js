const Producto = require('./Producto.js')
const Carrito = require('./Carrito.js')
let productos = new Producto('productos.txt')
let carritos = new Carrito('carritos.txt')
const express = require('express')
const { Router } = express

const PORT = 8080

const app = express()
const router = new Router()

//app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
router.use(express.json())

const server = app.listen(PORT, ()=>{
  console.log("Servidor HTTP escuchando en el puerto"+PORT)

})

/*
*Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
*/
router.get('/productos',async (req,res)=>{
  res.json(await productos.getAll())
})

/*
*Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
*/
router.get('/productos/:id',async (req,res)=>{
  if(req.params.id!=null){
   res.json(await productos.getById(req.params.id))
 }
})
/*
* Para incorporar productos al listado (disponible para administradores)
*/
router.post('/productos',async (req,res)=>{
  if(req.params.admin){
    await productos.save(req.body)
    res.json(req.body)
  }else{
    res.json({ error : 403, descripcion: "ruta /productos método post no autorizada" })
  }
})

/*
* Actualiza un producto por su id (disponible para administradores)
*/
router.put('/productos/:id',async (req,res)=>{
  if(req.params.admin){
    let object = await productos.updateElement(req.params.id,req.body)
    res.json(object)
  }else{
    res.json({ error : 403, descripcion: "ruta /productos/id método put no autorizada" })
  }
  })

/*
* Borra un producto por su id (disponible para administradores)
*/
router.delete('/productos/:id',async (req,res)=>{
  if(req.params.admin){
    let obj = await productos.getById(req.params.id)
    await productos.deleteById(req.params.id)
    res.json(obj)
  }else{
    res.json({ error : 403, descripcion: "ruta /productos/id método delete no autorizada" })
  }
})
/*
GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito-> getById
*/
router.get('/carrito/:id/productos',async (req,res)=>{
  let obj = await carritos.getById(req.params.id)
  res.json(obj)
})

/*
*POST: '/' - Crea un carrito y devuelve su id. -> save()
*/
router.post('/carrito',async (req,res)=>{
    await carritos.save(req.body)
    res.json(req.body)
})


/*
*DELETE: '/:id' - Vacía un carrito y lo elimina.-> deleteById()
*/

router.delete('/carrito/:id', async(req,res)=>{
  let obj = await carritos.deleteById(req.params.id)
  res.json(obj)
})

/*

POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto -> saveProduct()

*/
router.post('/carrito/:id/productos',async (req,res)=>{
  let obj = await carritos.saveProduct(req.params.id,req.body)
  res.json(obj)
})



/*
DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
*/

router.delete('/carrito/:id/productos/:id_prod',async (req,res)=>{
  let obj = await carritos.deleteProduct(req.params.id,req.params.id_prod)
  res.json(obj)
})

app.use('/api', router)
