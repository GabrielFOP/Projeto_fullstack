const protocolo = 'http://'
const baseURL = 'localhost:3000'

function exibirFilmes(filmes) {
    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    corpoTabela.innerHTML = ""
    for (let filme of filmes) {
        let linha = corpoTabela.insertRow(0)
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
}
function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor)
    alert.innerHTML = innerHTML
    //... é o spread operator
    //quando aplicado a um array, ele "desmembra" o array
    //depois disso, passamos os elementos do array como argumentos para add e remove
    alert.classList.add(...classesToAdd)
    alert.classList.remove(...classesToRemove)
    setTimeout(() => {
        alert.classList.remove('show')
        alert.classList.add('d-none')
    }, timeout)
}

function ocultarModal(seletor, timeout) {
    setTimeout(() => {
        let modal = bootstrap.Modal.getInstance(document.querySelector(seletor))
        modal.hide()
    }, timeout)
}

async function obterFilmes() {
    const filmesEndPoint = '/filmes'
    const URLcompleta = `${protocolo}${baseURL}${filmesEndPoint}`
    const filmes = (await axios.get(URLcompleta)).data
    console.log(filmes)
    exibirFilmes(filmes)
}

async function cadastrarFilme() {
    const filmesEndpoint = '/filmes'
    //constroi a url completa
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    // pega os inputs que contém os valores que o usuário digitou
    let tituloInput = document.querySelector('#tituloInput')
    let sinopseInput = document.querySelector('#sinopseInput')
    // pega os valores digitados pelo usuário
    let titulo = tituloInput.value
    let sinopse = sinopseInput.value
    // limpa os campos que o usuário digitou 
    // somente adiciona se o usuário tiver digitado os dois valores

    if (titulo && sinopse) {

        tituloInput.value = ""
        sinopseInput.value = ""

        // envia os dados ao sevidor (back end)

        const filmes = (await axios.post(URLcompleta, { titulo, sinopse })).data

        exibirFilmes(filmes)

        exibirAlerta('.alert-filme', 'Filme cadastrado com sucesso', ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)

    }
    //  senão, exibe o alerta por até 2 segundos
    else {
        exibirAlerta('.alert-filme', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
    }
}

async function cadastrarUsuario() {
    let usuarioCadastroInput = document.querySelector('#usuarioCadastroInput')
    let passwordCadastroInput = document.querySelector('#passwordCadastroInput')
    let usuarioCadastro = usuarioCadastroInput.value
    let passwordCadastro = passwordCadastroInput.value
    if (usuarioCadastro && passwordCadastro) {
        try {
            const cadastroEndpoint = '/signup'
            const URLCompleta = `${protocolo}${baseURL}${cadastroEndpoint}`
            await axios.post(URLCompleta, { login: usuarioCadastro, password: passwordCadastro })
            usuarioCadastroInput.value = ""
            passwordCadastroInput.value = ""
            exibirAlerta('.alert-modal-cadastro', "Usuário cadastrado com sucesso!", ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
            ocultarModal('#modalCadastro', 2000)
        }
        catch (error) {
            exibirAlerta('.alert-modal-cadastro', "Erro ao cadastrar usuário", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
            ocultarModal('#modalCadastro', 2000)
        }
    }
    else {
        exibirAlerta('.alert-modal-cadastro', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
    }
}

const fazerLogin = async () => {
    let usuarioLoginInput = document.querySelector('#usuarioLoginInput')
    let passwordLoginInput = document.querySelector('#passwordLoginInput')
    let usuarioLogin = usuarioLoginInput.value
    let passwordLogin = passwordLoginInput.value
    if (usuarioLogin && passwordLogin) {
        try {
            const loginEndpoint = '/login'
            const URLCompleta = `${protocolo}${baseURL}${loginEndpoint}`
            const response = await axios.post(URLCompleta, { login: usuarioLogin, password: passwordLogin })
            console.log(response.data)
            usuarioLoginInput.value = ""
            passwordLoginInput.value = ""
            exibirAlerta('.alert-modal-login', "Login efetuado com sucesso!",['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
            ocultarModal('#modalLogin', 2000)
            const loginLink = document.querySelector('#loginLink')
            loginLink.innerHTML = "Logout"
            const cadastrarFilmeButton = document.querySelector('#cadastrarFilmeButton')
            cadastrarFilmeButton.disabled = false

        }
        catch(error){
            exibirAlerta('.alert-modal-login', "Erro ao fazer login", ['show','alert-danger'], ['d-none', 'alert-success'], 2000)
        }
    }
    else {
        exibirAlerta('.alert-modal-login', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
    }

}
