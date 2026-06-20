// Referências do HTML
const btnCalcular = document.getElementById('calcular');
const divResultado = document.getElementById('resultado');

// Carrega carteira salva
const carteira =
  JSON.parse(localStorage.getItem('carteira')) || {};

// Resetar Carteira
  const btnResetar =
  document.getElementById('resetar');

if (btnResetar) {

  btnResetar.addEventListener('click', () => {

    if (!confirm('Deseja apagar toda a carteira?')) {
      return;
    }

    localStorage.removeItem('carteira');

    Object.keys(carteira).forEach(ticker => {
      delete carteira[ticker];
    });

    renderCarteira();

    divResultado.classList.add('hidden');
  });

}

// Evento do botão
btnCalcular.addEventListener('click', () => {

  const ticker = document
    .getElementById('ticker')
    .value
    .toUpperCase()
    .trim();

  const qtd = parseFloat(
    document.getElementById('quantidade').value
  );

  const precoPago = parseFloat(
    document.getElementById('preco-pago').value
  );

  const precoAtual = parseFloat(
    document.getElementById('preco-atual').value
  );

  const dividendoPorCota = parseFloat(
    document.getElementById('dividendo').value
  ) || 0;

  if (
    !ticker ||
    isNaN(qtd) ||
    isNaN(precoPago) ||
    isNaN(precoAtual)
  ) {
    alert('Preencha todos os campos obrigatórios.');
    return;
  }

  const totalInvestido = qtd * precoPago;
  const valorAtual = qtd * precoAtual;
  const lucro = valorAtual - totalInvestido;
  const variacao =
    ((precoAtual - precoPago) / precoPago) * 100;

  divResultado.classList.remove(
    'hidden',
    'positivo',
    'negativo'
  );

  divResultado.classList.add(
    lucro >= 0 ? 'positivo' : 'negativo'
  );

  divResultado.innerHTML = `
    <p><strong>${ticker}</strong></p>
    <p>Total Investido: R$ ${totalInvestido.toFixed(2)}</p>
    <p>Valor Atual: R$ ${valorAtual.toFixed(2)}</p>
    <p>Resultado: R$ ${lucro.toFixed(2)}</p>
    <p>Variação: ${variacao.toFixed(2)}%</p>
  `;

  adicionarCompra(
    ticker,
    qtd,
    precoPago,
    precoAtual,
    dividendoPorCota
  );

  renderCarteira();

  salvarCarteira();
});

// Adiciona compra
function adicionarCompra(
  ticker,
  qtd,
  precoPago,
  precoAtual,
  dividendo
) {

  if (!carteira[ticker]) {
    carteira[ticker] = {
      compras: [],
      precoAtual: 0,
      dividendo: 0
    };
  }

  carteira[ticker].compras.push({
    qtd,
    preco: precoPago
  });

  carteira[ticker].precoAtual = precoAtual;
  carteira[ticker].dividendo = dividendo;
}

// Calcula indicadores
function calcularAtivo(ticker) {

  const ativo = carteira[ticker];

  const totalQtd = ativo.compras.reduce(
    (acc, compra) => acc + compra.qtd,
    0
  );

  const totalInvestido = ativo.compras.reduce(
    (acc, compra) =>
      acc + compra.qtd * compra.preco,
    0
  );

  const precoMedio =
    totalInvestido / totalQtd;

  const valorAtual =
    totalQtd * ativo.precoAtual;

  const lucro =
    valorAtual - totalInvestido;

  const variacao =
    ((ativo.precoAtual - precoMedio) /
      precoMedio) *
    100;

  const rendaMensal =
    ativo.dividendo * totalQtd;

  const rendaAnual =
    rendaMensal * 12;

  const dividendYield =
    precoMedio > 0
      ? ((ativo.dividendo * 12) /
          precoMedio) *
        100
      : 0;

  return {
    totalQtd,
    totalInvestido,
    precoMedio,
    valorAtual,
    lucro,
    variacao,
    rendaMensal,
    rendaAnual,
    dividendYield
  };
}

// Renderiza tabela
function renderCarteira() {

  const tbody =
    document.getElementById(
      'tbody-carteira'
    );

  tbody.innerHTML = '';

  Object.keys(carteira).forEach(
    ticker => {

      const {
        totalQtd,
        precoMedio,
        lucro,
        variacao,
        rendaMensal,
        dividendYield
      } = calcularAtivo(ticker);

      const cor =
        lucro >= 0
          ? 'positivo'
          : 'negativo';

      tbody.innerHTML += `
        <tr>
          <td><strong>${ticker}</strong></td>
          <td>${totalQtd}</td>
          <td>R$ ${precoMedio.toFixed(2)}</td>
          <td>R$ ${carteira[
            ticker
          ].precoAtual.toFixed(2)}</td>

          <td class="${cor}">
            R$ ${lucro.toFixed(2)}
          </td>

          <td class="${cor}">
            ${variacao.toFixed(2)}%
          </td>

          <td>
            R$ ${rendaMensal.toFixed(2)}
          </td>

          <td>
            ${dividendYield.toFixed(2)}%
          </td>
        </tr>
      `;
    }
  );
}

// Salvar carteira
function salvarCarteira() {

  localStorage.setItem(
    'carteira',
    JSON.stringify(carteira)
  );
}

// Carregar carteira ao abrir
renderCarteira();

