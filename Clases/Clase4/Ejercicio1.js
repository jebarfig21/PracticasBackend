function rndInt(max) {
  return Math.floor(Math.random() * (max) );
}

let objetos = []


for(i = 0; i<10000;i++){
      const num = rndInt(20)
      console.log(num)
      if (objetos[num] == undefined){objetos[num]=0}
      objetos[num] = objetos[num] + 1
  }

console.log(objetos)
