const express = require('express')
const path = require('path')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const PORT = 8000

const Contenedor = require('./Contenedor.js')
let container = new Contenedor('productos.txt')

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', async(req, res, next)=>{
    products = await container.getAll()
    console.log(products)
    res.render('pages/chat',{products: products})
})

app.post('/productos',async (req,res)=>{
  console.log("POST")
  await container.save(req.body)
  res.redirect('pages/chat');
})


io.on('connection', (socket)=>{
    console.log("a user connected via socket!")
    socket.on('disconnect', ()=>{
        console.log("a user disconnected!")
    })
    socket.on('chat message', (msg)=>{
        console.log("Message: "+msg)
        io.emit('chat message', msg)
    })
})
server.listen(PORT, ()=>{
    console.log("Server listening on port "+PORT+"!")
})
