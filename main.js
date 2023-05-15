//Definindo constante do fomulário
const form = document.getElementById('form-atividade')

//Imagens que definem se foi passou sim ou não
const imgAprovado = `<img src='./images/aprovado.png' alt='Emoji Celebrando'>`
const imgReprovado = `<img src='./images/reprovado.png' alt='Emoji Triste'>`

//Span que avisa se foi reprovado ou aprovado
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'

const notaMinima = parseFloat(prompt('Digite a nota mínima:'))

//Definindo os arrays que armazenam as notas e os nomes das atividades
let atividades = []
let notas = []

//Variável que adiciona linhas
let linhas = ''

//Adicinando evento ao clicar no botão 'Adicionar +'
form.addEventListener('submit', function(e)
{
    //Evitando que o site atualize ao clicar no botão
    e.preventDefault()

    //Chamando a função que coloca o conteúdo na linha
    adicionaLinha()

    //Chamando a função que coloca a linha na tabela
    atualizaTabela()

    atualizaMediaFinal()
})

//Função que coloca o conteúdo na linha
function adicionaLinha()
{
    const inputNomeAtividade = document.getElementById('nome-atividade')
    const inputNotaAtividade = document.getElementById('nota-atividade')

    if(atividades.includes(inputNomeAtividade.value))
    {
        alert(`A atividade: ${inputNomeAtividade.value} já existe!`)
    }
    else
    {
        atividades.push(inputNomeAtividade.value)
        notas.push(parseFloat(inputNotaAtividade.value))

        let linha = '<tr>'
        linha += `<td>${inputNomeAtividade.value}</td>`
        linha += `<td>${inputNotaAtividade.value}</td>`
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`
        linha += '</tr>'

        linhas += linha

        inputNomeAtividade.value = ''
        inputNotaAtividade.value = ''
    }
}

//Função que coloca a linhas na tabela
function atualizaTabela()
{
    const corpoTabela = document.querySelector('tbody')
    corpoTabela.innerHTML = linhas
}

//Função que escreve a nota da média final
function atualizaMediaFinal()
{
    const mediaFinal = calculaMediaFinal()

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2)
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado
}

//Função que faz o calculo da média final
function calculaMediaFinal()
{
    let somaDasNotas = 0

    for(let i = 0; i < notas.length; i++)
    {
        somaDasNotas += notas[i]
    }

    return somaDasNotas / notas.length
}