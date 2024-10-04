// console.log("Hello, world!")

const express = require("express");
const app = express()
app.use(express.json())

//get http://localhost:3000/oi 
app.get('/oi', (req, res)=>{
    res.send('oi')
})

let filmes = [
    {
        titulo:"Kill Bill vol1",
        sinopse:"A ex-assassina conhecida apenas como Noiva acorda de um coma de quatro anos decidida a se vingar de Bill, seu ex-amante e chefe, que tentou matá-la no dia do casamento. Ela está motivada a acertar as contas com cada uma das pessoas envolvidas com a perda da filha, da festa de casamento e dos quatro anos de sua vida. Na jornada, a Noiva é submetida a dores físicas agonizantes ao enfrentar a inescrupulosa gangue de Bill, o Esquadrão Assassino de Víboras Mortais."
    },
    {
        titulo:"Django",
        sinopse:"No sul dos Estados Unidos, o ex-escravo Django faz uma aliança inesperada com o caçador de recompensas Schultz para perseguir os criminosos mais procurados do país e resgatar sua esposa de um fazendeiro que força seus escravos a entrarem em competições mortais."
    }
]

app.get('/filmes', (req, res) =>{
    res.json(filmes)
})

app.post('/filmes',(req, res) => {
    //capturar as informações enviadas e trazer para o contexto 
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    // montar um json novo com as informações recebidas
    const filme_novo = {titulo:titulo, sinopse:sinopse}
    // acrescenta o novo filme à base
    filmes.push(filme_novo)
    // exibir a base atualizada 
    res.json(filmes)
})
app.listen(3000, () => console.log("server up & running"))
