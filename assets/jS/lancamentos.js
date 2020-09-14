// função controle de dados de lançamento



var lancamentos = function() {


    // função caregamento de dados via HTTP

    // url tipos dados respostas


    let carregaDados = function() { //variavel privativa buscar informaçoes

        http('http://localhost:5500/assets/data/lancamentos.json', 'GET', [], resposta) //requisição de dados por json em  local externo

    }
    var resposta = function(dados) { // paremtro de resposta para requisisao


        let dadosJson = JSON.parse(dados) //declaração de dados

        let lista = () => {

            tbody(dadosJson); // chamandos os dados para a tabela
        }

        let tbody = (dados) => {
            let html = '';
            let totalReceitas = [];
            let totalDespesas = [];

            // leitura do vetor vindo pela web service
            dados.forEach(item => {

                // concatenando itens pra atribuir a tebela no html
                html += '<tr>\
                            <td>' + item.id + '</td>\
                            <td>' + item.descricao + '</td>\
                            <td>' + item.valor + '</td>\
                        </tr>';
                // definir uma  varirial para converter o valor de string para um valor de calculo para numeros  decimais
                let valor = parseFloat(item.valor);

                // definir se o valor esta e credito ou debito
                if (item.tipo == 'c') {
                    totalReceitas.push(valor);
                } else if (item.tipo == 'd') {
                    totalDespesas.push(valor);
                }

            }); //fim do forEach

            // criando função pra efetuar a soma dos valores

            let soma = (valor, total) => valor + total;

            // reduce para somar os valores de todos os vetores 
            let valorTotalReceita = totalReceitas.reduce(soma);
            let valorTotalDespesas = totalDespesas.reduce(soma);

            // camando o total e atribuir os spans com Ids abaixo 

            document.getElementById('totalReceitas').innerHTML = valorTotalReceita
            document.getElementById('totalDespesas').innerHTML = valorTotalDespesas


            // faz uma subtração com os totais para determinar o saldo

            let saldo = valorTotalReceita - valorTotalDespesas;

            // determinar para os elementos em html seus dados

            document.getElementById('saldo').innerHTML = saldo;
            document.getElementById('tbodyTabelaLançamentos').innerHTML = html;

        }

        lista();

        // carregaDados
    }
    carregaDados();
}


// var variavel global
// let variavel privativa


// http: url tipos dados respostas






//     var tabelaLancamentos = function(dados) {

//         dados.forEach(lancamentos => {

//                 var novaLinha = document.createElement('tr'); //crindo a linha

//                 var colunaData = document.createElement('td'); // crinando cloluna  data 
//                 var colunaDescricao = document.createElement('td'); // crinando cloluna  descriçao 
//                 var colunaD = document.createElement('td'); // crinando cloluna  d
//                 var colunaC = document.createElement('td'); // crinando cloluna  c

//                 colunaData.textContent = dados.data
//                 colunaDescricao.textContent = dados.descricao
//                 colunaD.textContent = dados.d
//                 colunaC.textContent = dados.c

//                 novaLinha.appendChild(colunaData);
//                 novaLinha.appendChild(colunaDescricao);
//                 novaLinha.appendChild(colunaD);
//                 novaLinha.appendChild(colunaC);

//                 document.getElementById('lancamentos').appendChild(novaLinha)
//             })
//             //console.log(dados)
// };


// concatenaçã de string
// regra de concatenaçã sempre declara ela vazia primeiro e depois de concatena ela com vc quiser
// ex 
//     let html= '';

//     depois

//     html = html + "<div>";
//     html-> "<div>"
//     se html recebe mais 1
//     html = html + "<div>";
//     html-> "<div><div>"