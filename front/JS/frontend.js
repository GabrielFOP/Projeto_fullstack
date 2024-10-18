const protocolo = 'http://'
const baseURL = 'localhost:3000'

function exibirFilmes(filmes){
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

async function obterFilmes() {
    const filmesEndPoint = '/filmes'
    const URLcompleta = `${protocolo}${baseURL}${filmesEndPoint}`
    const filmes = (await axios.get(URLcompleta)).data
    console.log(filmes)
    exibirFilmes(filmes)
}

async function cadastrarFilme() {
    const filmesEndPoint = '/filmes'
    //constroi a url completa
    const URLcompleta = `${protocolo}${baseURL}${filmesEndPoint}`
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
    
    }
    //  senão, exibe o alerta por até 2 segundos
    else {
        let alert = document.querySelector('.alert')
        alert.classList.add('show')
        alert.classList.remove('d-none')
        setTimeout(() => {
            alert.classList.remove('show')
            alert.classList.add('d-none')

        }, 2000)
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
            const URLcompleta = `${protocolo}${baseURL}${cadastroEndpoint}`
            await axios.post(URLcompleta, { login: usuarioCadastro, password: passwordCadastro })
            
            console.log('Usuário cadastrado:', response);
            if (response.status === 200) {
                usuarioCadastroInput.value = ""
                passwordCadastroInput.value = ""
                
                let alert = document.querySelector('.alert-modal-cadastro')
                alert.innerHTML = "Usuário cadastrado com sucesso!"
                alert.classList.add('show', 'alert-success')
                alert.classList.remove('d-none', 'alert-danger')

                setTimeout(() => {
                    alert.classList.remove('show')
                    alert.classList.add('d-none');

                    let modalCadastro = bootstrap.Modal.getInstance(document.querySelector('#modalCadastro'))
                    console.log('Modal instance:', modalCadastro)
                    if (modalCadastro) {
                        modalCadastro.hide()
                    } else {
                        console.error('Modal instance não encontrada.')
                    }
                }, 2000);
            }
        }
        catch (error) {
            let alert = document.querySelector('alert-modal-cadastro')
            alert.innerHTML = "Não foi possível cadastrar"
            alert.classList.add('show', 'alert-success')
            alert.classList.remove('d-none', 'alert-danger')
            setTimeout(() =>{
                alert.classList.remove('show')
                    alert.classList.add('d-none');

                    let modalCadastro = bootstrap.Modal.getInstance(document.querySelector('#modalCadastro'))
                    console.log('Modal instance:', modalCadastro)

            }, 2000)
    }
}
    else {
    let alert = document.querySelector('.alert-modal-cadastro')
    alert.innerHTML = "Preencha todos os campos"
    alert.classList.add('show', 'alert-danger')
    alert.classList.remove('d-none')
    setTimeout(() => {
        alert.classList.remove('show')
        alert.classList.add('d-none')
    }, 2000)
}
}
