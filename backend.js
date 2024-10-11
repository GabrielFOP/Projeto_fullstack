// console.log("Hello, world!")


const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
app.use(cors())

//get http://localhost:3000/oi 
app.get('/oi', (req, res)=>{
    res.send('oi')
})

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String} 
}))

async function conectarAoMongoDB() { 
    await
    mongoose.connect(`mongodb+srv://GabrielF:gabrielf@clusterfullstackprj.ajbyf.mongodb.net/?retryWrites=true&w=majority&appName=ClusterfullstackPRJ`)
}

app.listen(3000, () => {
    try{
        conectarAoMongoDB()
        console.log("up and running")
    }
    catch(e){
        console.log('Erro', e)
    }
})


app.get('/filmes', async(req, res) =>{
    const filmes = await Filme.find()
    res.json(filmes)
})

app.post('/filmes',async(req, res) => {
    //capturar as informações enviadas e trazer para o contexto 
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    
    //monta um objeto agrupando os dados. Ele representa um novo filme
    //a seguir, construímos um objeto Filme a partir do modelo do mongoose
    const filme = new Filme({titulo: titulo, sinopse: sinopse})
    
    // save salva o novo filme na base gerenciada pelo MongoDB

    await filme.save()
    const filmes = await Filme.find()
    res.json(filmes)
    
    
})