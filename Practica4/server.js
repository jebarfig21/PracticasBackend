const Contenedor = require('./Contenedor.js')
let container = new Contenedor('productos.txt')

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


router.get('/', (req,res)=>{
  res.sendFile("./index.html")
})


router.get('/productos',async (req,res)=>{
  //console.log(await container.getAll())
  res.json(await container.getAll())
  })


router.get('/productos/:id',async (req,res)=>{
  //console.log(await container.getAll())
  console.log(req.params.id)
  res.json(await container.getById(req.params.id))
  })
/*
app.get('/productoRandom',async (req,res)=>{
  //console.log(await container.getAll())
  res.send(await container.getRandomElement())
  })
*/

router.post('/productos',async (req,res)=>{
  await container.save(req.body)
  res.json(req.body)
  })

router.put('/productos/:id',async (req,res)=>{
  let object = await container.updateElement(req.params.id,req.body)
  res.json(object)
  })

router.delete('/productos/:id',async (req,res)=>{
  let obj = await container.getById(req.params.id)

  await container.deleteById(req.params.id)
  res.json(obj)
})

app.use('/api', router)
