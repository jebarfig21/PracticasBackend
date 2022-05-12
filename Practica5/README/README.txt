Todos los programas se ejecutan con node server.js, todo lo abren el puerto 8080 y tienen el mismo flujo :

get "/" -> Vista de Formulario para ingresar productos
post "/productos" Ingresa los productos enviados en el Formulario
get "/productos" Muestra todos los productos almacenados
