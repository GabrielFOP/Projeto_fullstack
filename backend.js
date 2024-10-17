// console.log("Hello, world!")


const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const jws = require('jsonwebtoken')
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

const usuarioSchema = mongoose.Schema({
    login: {type:String, required: true, unique: true},
    password: {type:String, required:true}
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)

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

app.post('/signup', async (req, res) =>{
   try{
    const login = req.body.login
    const password = req.body.password
    const criptografada = await bcrypt.hash(password,10)
    const usuario = new Usuario({
        login: login,
        password: criptografada
    })
    const respMongo = await usuario.save()
    console.log(respMongo)
    res.status(201).end
    }
    catch(error){
        console.log(error)
        res.status(409).end

    }
})

app.post('/login', async (req,res) => {
    // login/senha que o usuario enviou
    const login = req.body.login
    const password = req.body.password
    // tentamos encontrar no mongo db
    const u = await Usuario.findOne({login: req.body.login})
    if(!u){
        // senão foi encontrado, encerra por aqui com código 401
        return res.status(401).json({mensagem:"login inválido"})
    }
    // se foi encontrado, comparamos a senha, após descriptográ-la
    const senhaValida = await bcrypt.compare(password, u.password)
    if(!senhaValida){
        return res.status(401).json({mensagem:"senha inválida"})
    }
    // aqui vamos gerar o token e devolver para o cliente
    const token = jws.sign(
        {login:login},
        // depois vamos mudar para uma chave secreta de verdade 
        "chave-secreta",
        {expiresIn: "1h"}
    )
    res.status(200).json({token: token})

})