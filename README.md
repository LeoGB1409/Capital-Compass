pt-br

# 📈 Capital Compass — Calculadora de Renda Variável

Uma calculadora de renda variável para acompanhar ações e FIIs, calcular preço médio ponderado, variação e resultado de posições.

---

## 🖥️ Preview

![Capital Compass Preview](preview.png)

---

## ✨ Funcionalidades

- Cálculo de **preço médio ponderado** com múltiplas compras do mesmo ativo
- Exibição de **total investido**, **valor atual**, **lucro/prejuízo** e **variação percentual**
- Feedback visual dinâmico — **verde** para ganho, **vermelho** para perda
- Interface dark mode com estética financeira

---

## 🚀 Como usar

1. Digite o **ticker** do ativo (ex: PETR4, MXRF11)
2. Informe a **quantidade** de ações/cotas
3. Informe o **preço pago** por ação na compra
4. Informe o **preço atual** do ativo no mercado
5. Clique em **Calcular**

---

## 🧮 Fórmulas utilizadas

```
Total Investido  = Quantidade × Preço Pago
Valor Atual      = Quantidade × Preço Atual
Lucro / Prejuízo = Valor Atual - Total Investido
Variação (%)     = ((Preço Atual - Preço Pago) / Preço Pago) × 100
```

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica do formulário |
| CSS3 | Estilização dark mode com CSS Variables |
| JavaScript | Lógica de cálculo e manipulação do DOM |

Sem frameworks. Sem bibliotecas externas. Vanilla JS puro.

---

## 📁 Estrutura do projeto

```
capital-compass/
├── index.html      # Estrutura HTML
├── style.css       # Estilização dark mode
├── script.js       # Lógica de cálculo
└── README.md       # Documentação
```

---

## 📚 O que aprendi construindo esse projeto

- Manipulação do DOM com `getElementById` e `addEventListener`
- Conversão de strings para número com `parseFloat()`
- Uso de template literals para renderizar HTML dinamicamente
- Aplicação de classes CSS condicionais via `classList.add()`
- CSS Variables para sistema de cores consistente
- Estrutura de dados com arrays de objetos para múltiplas compras
- `Array.reduce()` para cálculo de preço médio ponderado

---

## 🗺️ Roadmap

- [x] Cálculo de preço médio por ativo
- [x] Feedback visual positivo/negativo
- [ ] Múltiplas compras com preço médio ponderado
- [ ] Suporte a FIIs com Dividend Yield
- [ ] Carteira com múltiplos ativos
- [ ] Gráfico de composição da carteira (Chart.js)
- [ ] Exportação em CSV
- [ ] Persistência com localStorage

---

## 👤 Autor

**Leonardo** — estudante de Engenharia de Software na FIAP, em transição para a área de tecnologia com foco em desenvolvimento web e cibersegurança.

[![GitHub]()
[![LinkedIn]()

---

> *"O mercado é um dispositivo de transferir dinheiro do impaciente para o paciente."* — Warren Buffett

en

# 📈 Capital Compass — Variable Income Calculator
 
A variable income calculator to track stocks and REITs, calculate weighted average price, variation, and position results.
 
---
 
## 🖥️ Preview
 
![Capital Compass Preview](preview.png)
 
---
 
## ✨ Features
 
- **Weighted average price** calculation with multiple purchases of the same asset
- Display of **total invested**, **current value**, **profit/loss**, and **percentage change**
- Dynamic visual feedback — **green** for gain, **red** for loss
- Dark mode interface with financial aesthetics
---
 
## 🚀 How to use
 
1. Enter the asset **ticker** (e.g. PETR4, MXRF11)
2. Enter the **quantity** of shares/units
3. Enter the **price paid** per share at purchase
4. Enter the **current market price** of the asset
5. Click **Calculate**
---
 
## 🧮 Formulas used
 
```
Total Invested   = Quantity × Price Paid
Current Value    = Quantity × Current Price
Profit / Loss    = Current Value - Total Invested
Change (%)       = ((Current Price - Price Paid) / Price Paid) × 100
```
 
---
 
## 🛠️ Tech stack
 
| Technology | Usage |
|---|---|
| HTML5 | Semantic form structure |
| CSS3 | Dark mode styling with CSS Variables |
| JavaScript | Calculation logic and DOM manipulation |
 
No frameworks. No external libraries. Pure vanilla JS.
 
---
 
## 📁 Project structure
 
```
capital-compass/
├── index.html      # HTML structure
├── style.css       # Dark mode styling
├── script.js       # Calculation logic
└── README.md       # Documentation
```
 
---
 
## 📚 What I learned building this project
 
- DOM manipulation with `getElementById` and `addEventListener`
- String to number conversion with `parseFloat()`
- Dynamic HTML rendering with template literals
- Conditional CSS class switching via `classList.add()`
- CSS Variables for a consistent color system
- Data structures using arrays of objects for multiple purchases
- `Array.reduce()` for weighted average price calculation
---
 
## 🗺️ Roadmap
 
- [x] Single asset average price calculation
- [x] Positive/negative visual feedback
- [ ] Multiple purchases with weighted average price
- [ ] Brazilian REIT (FII) support with Dividend Yield
- [ ] Portfolio with multiple assets
- [ ] Portfolio composition chart (Chart.js)
- [ ] CSV export
- [ ] Data persistence with localStorage
---
 
## 👤 Author
 
**Leonardo** — Software Engineering student at FIAP, transitioning into tech with a focus on web development and cybersecurity.

---
 
> *"The market is a device for transferring money from the impatient to the patient."* — Warren Buffett