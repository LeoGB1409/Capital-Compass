// ============================================================
// REFERÊNCIAS DO HTML
// ============================================================
const btnCalcular  = document.getElementById('calcular');
const btnResetar   = document.getElementById('resetar');
const divResultado = document.getElementById('resultado');

// ============================================================
// ESTADO GLOBAL — carrega do localStorage ou começa vazio
// ============================================================
const carteira = JSON.parse(localStorage.getItem('carteira')) || {};

// ============================================================
// RESET DA CARTEIRA
// ============================================================
if (btnResetar) {
  btnResetar.addEventListener('click', () => {
    if (!confirm('Deseja apagar toda a carteira?')) return;

    localStorage.removeItem('carteira');
    Object.keys(carteira).forEach(ticker => delete carteira[ticker]);

    renderCarteira();
    divResultado.classList.add('hidden');
  });
}

// ============================================================
// CALCULAR — evento do botão principal
// ============================================================
btnCalcular.addEventListener('click', () => {

  const ticker    = document.getElementById('ticker').value.toUpperCase().trim();
  const qtd       = parseFloat(document.getElementById('quantidade').value);
  const precoPago = parseFloat(document.getElementById('preco-pago').value);
  const precoAtual= parseFloat(document.getElementById('preco-atual').value);
  const dividendo = parseFloat(document.getElementById('dividendo').value) || 0;

  // Validação
  if (!ticker || isNaN(qtd) || isNaN(precoPago) || isNaN(precoAtual)) {
    alert('Preencha todos os campos obrigatórios.');
    return;
  }

  // Cálculos do ativo individual
  const totalInvestido = qtd * precoPago;
  const valorAtual     = qtd * precoAtual;
  const lucro          = valorAtual - totalInvestido;
  const variacao       = ((precoAtual - precoPago) / precoPago) * 100;
  const rendaMensal    = dividendo * qtd;
  const dy             = dividendo > 0 ? (dividendo * 12 / precoAtual) * 100 : 0;

  // Exibe resultado individual
  divResultado.classList.remove('hidden', 'positivo', 'negativo');
  divResultado.classList.add(lucro >= 0 ? 'positivo' : 'negativo');
  divResultado.innerHTML = `
    <p><strong>${ticker}</strong></p>
    <p>Total Investido: R$ ${totalInvestido.toFixed(2)}</p>
    <p>Valor Atual: R$ ${valorAtual.toFixed(2)}</p>
    <p>Resultado: R$ ${lucro.toFixed(2)}</p>
    <p>Variação: ${variacao.toFixed(2)}%</p>
    ${dividendo > 0 ? `
    <p>Renda Mensal: R$ ${rendaMensal.toFixed(2)}</p>
    <p>DY Anual: ${dy.toFixed(2)}%</p>` : ''}
  `;

  // Adiciona à carteira, salva e renderiza
  adicionarCompra(ticker, qtd, precoPago, precoAtual, dividendo);
  salvarCarteira();
  renderCarteira();
});

// ============================================================
// ADICIONAR COMPRA
// Suporta múltiplas compras do mesmo ticker
// ============================================================
function adicionarCompra(ticker, qtd, precoPago, precoAtual, dividendo) {
  if (!carteira[ticker]) {
    carteira[ticker] = { compras: [], precoAtual: 0, dividendo: 0 };
  }
  carteira[ticker].compras.push({ qtd, preco: precoPago });
  carteira[ticker].precoAtual = precoAtual;
  carteira[ticker].dividendo  = dividendo;
}

// ============================================================
// CALCULAR INDICADORES DE UM ATIVO
// Retorna todos os valores calculados para um ticker
// ============================================================
function calcularAtivo(ticker) {
  const ativo = carteira[ticker];

  const totalQtd = ativo.compras.reduce(
    (acc, c) => acc + c.qtd, 0
  );

  const totalInvestido = ativo.compras.reduce(
    (acc, c) => acc + c.qtd * c.preco, 0
  );

  const precoMedio   = totalInvestido / totalQtd;
  const valorAtual   = totalQtd * ativo.precoAtual;
  const lucro        = valorAtual - totalInvestido;
  const variacao     = ((ativo.precoAtual - precoMedio) / precoMedio) * 100;
  const rendaMensal  = ativo.dividendo * totalQtd;
  const rendaAnual   = rendaMensal * 12;
  const dividendYield = precoMedio > 0
    ? (ativo.dividendo * 12 / precoMedio) * 100
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

// ============================================================
// RENDERIZAR TABELA DA CARTEIRA
// ============================================================
function renderCarteira() {
  const tbody = document.getElementById('tbody-carteira');
  tbody.innerHTML = '';

  Object.keys(carteira).forEach(ticker => {
    const {
      totalQtd,
      precoMedio,
      lucro,
      variacao,
      rendaMensal,
      dividendYield
    } = calcularAtivo(ticker);

    const cor = lucro >= 0 ? 'positivo' : 'negativo';

    tbody.innerHTML += `
      <tr>
        <td><strong>${ticker}</strong></td>
        <td>${totalQtd}</td>
        <td>R$ ${precoMedio.toFixed(2)}</td>
        <td>R$ ${carteira[ticker].precoAtual.toFixed(2)}</td>
        <td class="${cor}">R$ ${lucro.toFixed(2)}</td>
        <td class="${cor}">${variacao.toFixed(2)}%</td>
        <td>R$ ${rendaMensal.toFixed(2)}</td>
        <td>${dividendYield.toFixed(2)}%</td>
        <td>
          <button class="btn-remover" onclick="removerAtivo('${ticker}')">x</button>
        </td>
      </tr>
    `;
  });

  // Atualiza o dashboard após renderizar a tabela
  renderDashboard();
}

// ============================================================
// RENDERIZAR DASHBOARD CONSOLIDADO
// Calcula os totais de toda a carteira
// ============================================================
function renderDashboard() {
  const tickers  = Object.keys(carteira);
  const dashboard = document.getElementById('dashboard');

  // Esconde o dashboard se a carteira estiver vazia
  if (tickers.length === 0) {
    dashboard.classList.add('hidden');
    return;
  }

  // Acumula os totais
  let totalInvestido = 0;
  let totalAtual     = 0;
  let totalMensal    = 0;
  let somaDY         = 0;
  let ativosComDY    = 0;

  tickers.forEach(ticker => {
    const {
      totalInvestido: inv,
      valorAtual,
      rendaMensal,
      dividendYield
    } = calcularAtivo(ticker);

    totalInvestido += inv;
    totalAtual     += valorAtual;
    totalMensal    += rendaMensal;

    if (dividendYield > 0) {
      somaDY += dividendYield;
      ativosComDY++;
    }
  });

  const resultado = totalAtual - totalInvestido;
  const dyMedio   = ativosComDY > 0 ? somaDY / ativosComDY : 0;
  const cor       = resultado >= 0 ? 'positivo' : 'negativo';

  // Exibe o dashboard
  dashboard.classList.remove('hidden');

  document.getElementById('dash-patrimonio').textContent =
    `R$ ${totalAtual.toFixed(2)}`;

  document.getElementById('dash-investido').textContent =
    `R$ ${totalInvestido.toFixed(2)}`;

  const elResultado = document.getElementById('dash-resultado');
  elResultado.textContent = `R$ ${resultado.toFixed(2)}`;
  elResultado.className   = `dash-value ${cor}`;

  document.getElementById('dash-mensal').textContent =
    `R$ ${totalMensal.toFixed(2)}`;

  document.getElementById('dash-anual').textContent =
    `R$ ${(totalMensal * 12).toFixed(2)}`;

  document.getElementById('dash-dy').textContent =
    `${dyMedio.toFixed(2)}%`;
}

// ============================================================
// SALVAR CARTEIRA NO LOCALSTORAGE
// ============================================================
function salvarCarteira() {
  localStorage.setItem('carteira', JSON.stringify(carteira));
}

// ============================================================
// EXCLUSÃO DE UM ATIVO
// ============================================================
function removerAtivo(ticker) {
  if (!confirm(`Deseja remover ${ticker} da carteira?`)) return;
  delete carteira[ticker];
  salvarCarteira();
  renderCarteira();
}

// ============================================================
// BUSCAR COTAÇÃO VIA BRAPI 
// ============================================================
async function buscarCotacao(ticker) {
  try {
    const url = `https://brapi.dev/api/quote/${ticker}?token=${BRAPI_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results[0].regularMarketPrice;
  } catch (erro) {
      console.error('Erro ao buscar cotação:', erro);
      return null;
    }
  }

  async function atualizarCotacao () {
    const tickers = Object.keys(carteira);
    if (tickers.length === 0) return;

    const btnAtualizar = document.getElementById('atualizar');
    btnAtualizar.textContent = 'Atualizando...';
    btnAtualizar.disabled = true;

    for (const ticker of tickers) {
      const precoAtual = await buscarCotacao(ticker);
      if (precoAtual !== null) {
        carteira[ticker].precoAtual = precoAtual;
      }
    }

    salvarCarteira();
    renderCarteira();

    btnAtualizar.textContent = 'Atualizar Cotações';
    btnAtualizar.disabled = false;
  }


// ============================================================
// INICIALIZAÇÃO — carrega carteira ao abrir a página
// ============================================================
renderCarteira();

