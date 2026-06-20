// Pega referência dos elementos do HTML
const btnCalcular = document.getElementById('calcular');
const divResultado = document.getElementById('resultado');

// Adiciona evento de clique ao botão
btnCalcular.addEventListener('click', () => {

// Lê os valores dos inputs e converte para nùmeros
const ticker = document.getElementById('ticker').value.toUpperCase();
const qtd = parseFloat(document.getElementById('quantidade').value);
const precoPago = parseFloat(document.getElementById('preco-pago').value);
const precoAtual = parseFloat(document.getElementById('preco-atual').value);

// Validação básica
if (!qtd || !precoPago || !precoAtual) {
    alert('Por favor, preencha todos os campos.');
    return;
}

// Calculos
const TotalInvestido =  qtd * precoPago;
const ValorAtual = qtd * precoAtual;
const lucro = ValorAtual - TotalInvestido;
const variacao = ((precoAtual - precoPago) / precoPago) * 100;

// Exibe o resultado no HTML
divResultado.classList.remove('hidden');
divResultado.innerHTML = `
    <p>Ticker: <strong>${ticker}</strong></p>
    <p>Total Investido: R$ ${TotalInvestido.toFixed(2)}</p>
    <p>Valor Atual: R$ ${ValorAtual.toFixed(2)}</p>
    <p>Resultado: R$ ${lucro.toFixed(2)}</p>
    <p>Variação: ${variacao.toFixed(2)}%</p>
`;
 
divResultado.classList.remove('positivo', 'negativo');
divResultado.classList.add(lucro > 0 ? 'positivo' : 'negativo');
});

//Array que acumula as compras
let compras = [];

// Função para adicionar compras
function adicionarCompra(qtd, preco) {
    compras.push({ qtd, preco });
    recalcular();
}

function recalcular() {
    const totalQtd = compras.reduce((acc, c) => acc + c.qtd, 0);
    const totalInv = compras.reduce((acc, c) => acc + c.qtd * c.preco, 0);
    const precoMedio = totalInv / totalQtd;

    // Atualiza o resultado
    divResultado.innerHTML = `
    <p>Total Quantidade: ${totalQtd}</p>
    <p>Preço Médio: R$ ${precoMedio.toFixed(2)}</p>
    `;

}