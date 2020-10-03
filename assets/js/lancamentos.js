/**
 * 
 * Função de controle dos dados de lançamentos
 * 
 */
var lancamentos = function () {

    /**
     * Função de carregamento dos dados via HTTP
     * 
     * URL, Tipo, Dados, Resposta
     * 
     */
    let carregaDados = function () {
        
        http('http://localhost:5500/data/lancamentos.json', 'GET', [], resposta);

    }

    /**
     * Função de resposta da solicitação à Web Service 
     */
    var resposta = function ( dados ) {

        var dadosLancamentos = JSON.parse(dados);

        let lista = () => {

            tbody(dadosLancamentos);

        }

        let tbody = (dados) => {

            /**
             * Passo 1: Declaração das variáveis
             */
            let html = '';
            let totalReceitas = [];
            let totalDespesas = [];

            /**
             * Passo 2: Leitura do vetor vindo pela Web Service
             */
            dados.forEach(item => {

                
                /**
                 * Passo 3: Concatenação de HTML formando as linhas da tabela
                 */
                html += '<tr'+(item.tipo == 'C' ? ' class="bgCredito"' : ' class="bgDebito"')+'>\
                            <td>'+item.id+'</td>\
                            <td>'+item.descricao+'</td>\
                         </tr>';
                         
                /**
                 * Passo 4: Define uma variável para converter o valor e utilizar o mesmo nos cálculos
                 */
                let valor = parseFloat(item.valor);
                         

                /**
                 * Passo 5: Valida se o valor que está vindo é de débito ou crédito
                 */
                if (item.tipo == 'C') {
                    totalReceitas.push(valor);
                } else if ( item.tipo == 'D' ) {
                    totalDespesas.push(valor);
                }
                
            });

            /**
             * Passo 6: Criar uma função para realização da somatório dos valores
             */

            let soma = (valor, total) => valor + total;
                
            /**
             * Passo 7: Chama o reduce para somar os valors do vetores
             */
            let valorTotalReceita = totalReceitas.reduce(soma);
            let valorTotalDespesa = totalDespesas.reduce(soma);

            /**
             * Passo 8: Chama os totais e atribui para os spans com os IDs abaixo
             */
            document.getElementById('totalReceitas').innerHTML = floatToMoney(valorTotalReceita);
            document.getElementById('totalDespesas').innerHTML = floatToMoney(valorTotalDespesa);

            /**
             * Passo 9: Faz uma subtração com os totais para determinar o saldo
             */
            let saldo = valorTotalReceita + valorTotalDespesa;

            /**
             * Passo final: Determina para os elementos em HTML seus respectivos dados
             */

            let bgClasse = '';

            if(saldo > 0) {
                bgClasse = 'textCredito';
            } else {
                bgClasse = 'textDebito';
            }

            let spanSaldo = document.getElementById('saldo');

            spanSaldo.classList.add(bgClasse);
            spanSaldo.innerHTML = floatToMoney(saldo);
            document.getElementById('tbodyTabelaLancamentos').innerHTML = html;

            fluxoCaixa(valorTotalReceita);

        }

        let fluxoCaixa = (totalReceitas) => {
            /**
             * Passo 1: Declaração das variáveis
             */
            let html = '';
            let saldoFluxo = 0.00;

            /**
             * Passo 2: Leitura do vetor vindo pela Web Service
             */
            dadosLancamentos.forEach(item => {

                let valor = parseFloat(item.valor);
                let repres = ((valor / totalReceitas) * 100);
                
                saldoFluxo += valor;

                /**
                 * Passo 3: Concatenação de HTML formando as linhas da tabela
                 */
                html += '<tr>\
                            <td>'+item.data+'</td>\
                            <td>'+item.descricao+'</td>\
                            <td class="'+(item.tipo == 'C' ? 'bgCredito' : 'bgDebito')+'">'+floatToMoney(valor)+' '+item.tipo+'</td>\
                            <td class="'+(saldoFluxo > 0 ? 'bgCredito' : 'bgDebito')+'">'+floatToMoney(saldoFluxo)+'</td>\
                            <td>'+floatToPerc(item.perfil)+'</td>\
                            <td class="'+(Math.abs(repres) > parseFloat(item.perfil) ? 'bgDebito' : 'bgCredito')+'">'+floatToPerc(repres)+'</td>\
                         </tr>';

            });

            
            document.getElementById('tbodyTabelaFluxoCaixa').innerHTML = html;
        }

        lista();

    }

    carregaDados();
}

function floatToMoney (value) {
    return parseFloat(value).toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

function floatToPerc(value) {
    return parseFloat(value).toLocaleString('pt-br', {minimumFractionDigits: 1, maximumFractionDigits: 1});
}