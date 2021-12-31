const bcoinPrice = document.querySelector("#bcoin-precio");
const bcoinInput = document.querySelector("#bcoin-input");
const bcoinBalance = document.querySelector("#bcoin-balance");
const atlasPrice = document.querySelector("#atlas-precio");
const atlasInput = document.querySelector("#atlas-input");
const atlasBalance = document.querySelector("#atlas-balance");
const sumaBalance = document.querySelector('#suma-balance');
let num;



let bcoinData = fetch("https://api.coingecko.com/api/v3/simple/price?ids=bomber-coin&vs_currencies=usd")
  .then((response) => response.json())
  .then((data) => {
    return data['bomber-coin']['usd'];
  });

let atlasData = fetch("https://api.coingecko.com/api/v3/simple/price?ids=star-atlas&vs_currencies=usd")
  .then((response) => response.json())
  .then((data) => {
    return data['star-atlas']['usd'];
  });

async function printPrice(token, box) {
  box.innerHTML = 'cargando...';
  const a = await token;
  box.innerHTML = Number(a);
};


printPrice(bcoinData, bcoinPrice);
printPrice(atlasData, atlasPrice);

function updatePrice(price, input, balance, label) {
  num = price.innerHTML * input.value;
  balance.innerHTML = '$' + Math.round(((num) + Number.EPSILON) * 100) / 100;
  localStorage.setItem(`${label}-input`, input.value);
  localStorage.setItem(`${label}-balance`, balance.innerHTML);
  localStorage.setItem(`${label}Sum`, num);
  updateTotalBalance()
}


bcoinInput.addEventListener('keyup', () => {
  updatePrice(bcoinPrice, bcoinInput, bcoinBalance, 'bcoin');
});

atlasInput.addEventListener('keyup', () => {
  updatePrice(atlasPrice, atlasInput, atlasBalance, 'atlas');
});


// cargar e imprimir datos

function cargarDatos(label, input, price, balance) {
  if (localStorage.getItem(`${label}-input`)) {
    input.value = localStorage.getItem(`${label}-input`);
    num = price.innerHTML * input.value;
    balance.innerHTML = '$' + Math.round(((num) + Number.EPSILON) * 100) / 100;
  }
};


cargarDatos('bcoin', bcoinInput, bcoinPrice, bcoinBalance);
cargarDatos('atlas', atlasInput, atlasPrice, atlasBalance);


if (localStorage.getItem('atlas-input')) {
  if (atlasPrice.innerHTML == 'cargando...') {
    atlasBalance.innerHTML = 'calculando...'
    setTimeout(() => {
      cargarDatos('atlas', atlasInput, atlasPrice, atlasBalance);
    }, 2000)
  }
} else {
  atlasBalance.innerHTML = 'Ingresa tus tokens';
};


if (localStorage.getItem('bcoin-input')) {
  if (bcoinPrice.innerHTML == 'cargando...') {
    bcoinBalance.innerHTML = 'calculando...'
    setTimeout(() => {
      cargarDatos('bcoin', bcoinInput, bcoinPrice, bcoinBalance);
    }, 2000)
  }
} else {
  bcoinBalance.innerHTML = 'Ingresa tus tokens';
};


function cargarTotalBalance() {
  if (localStorage.getItem(`totalBalance`)) {
    let tempBalance = Number(localStorage.getItem(`totalBalance`));
    sumaBalance.innerHTML = '$' + tempBalance.toFixed(2);
  }
}

cargarTotalBalance();

// Suma total

function updateTotalBalance() {
  let slpSum = Number(localStorage.getItem('slpSum'));
  let bcoinSum = Number(localStorage.getItem('bcoinSum'));
  let atlasSum = Number(localStorage.getItem('atlasSum'));
  let totalBalance = slpSum + bcoinSum + atlasSum;
  localStorage.setItem('totalBalance', totalBalance);
  sumaBalance.innerHTML = '$' + totalBalance.toFixed(2);
}

// reset button

const btnReset = document.getElementById('btn-reset');

function resetAll() {
  slpInput.value = null;
  bcoinInput.value = null;
  atlasInput.value = null;
  slpBalance.innerHTML = 'Ingresa tus tokens';
  bcoinBalance.innerHTML = 'Ingresa tus tokens';
  atlasBalance.innerHTML = 'Ingresa tus tokens';
  sumaBalance.innerHTML = '$0';
  localStorage.clear();
}

btnReset.addEventListener('click', resetAll);

// refresh button

const btnRefresh = document.getElementById('btn-refresh');

btnRefresh.addEventListener('click', () => {
  location.reload('Refresh');
})


// creting objects with info

const slp = {
  content: `<div id="slp-titulo" class="coin-title">SLP</div>
  <div id="slp-section" class="coin-usd">Precio USD:</div>
  <div class="coin-price-container">$<div id="slp-precio" class="coin-precio"></div></div>
  <input id="slp-input" class="coin-input" type="number" onwheel="this.blur()">
  <div id="slp-balance" class="coin-balance">Ingresa tus tokens</div>`
};

const coinsContainer = document.getElementById('coins-container');

const cbSlp = document.getElementById('cb-slp');
if(cbSlp.checked = false){
  localStorage.setItem('slp-check', 'no');
};

cbSlp.addEventListener('change', () => {
  if (cbSlp.checked) {
    let coinSlp = document.createElement('div');
    coinSlp.setAttribute('id', 'slp-container');
    coinSlp.classList.add('coin-container', 'd-flex');
    coinSlp.innerHTML = slp.content;
    coinsContainer.appendChild(coinSlp);
    localStorage.setItem('slp-check', 'yes');
    location.reload();

  } else {
    localStorage.setItem('slp-input', null);
    localStorage.setItem('slpSum', '0');
    updateTotalBalance();
    coinSlp = document.getElementById('slp-container');
    coinSlp.remove();
    localStorage.setItem('slp-check', 'no');
    location.reload();

  }
});


if(localStorage.getItem('slp-check') == 'yes'){
  cbSlp.checked = true;
  let coinSlp = document.createElement('div');
  coinSlp.setAttribute('id', 'slp-container');
  coinSlp.classList.add('coin-container', 'd-flex');
  coinSlp.innerHTML = slp.content;
  coinsContainer.appendChild(coinSlp);
  localStorage.setItem('slp-check', 'yes');

  const slpPrice = document.querySelector("#slp-precio");
  const slpInput = document.querySelector("#slp-input");
  const slpBalance = document.querySelector("#slp-balance");

  let slpData = fetch("https://api.coingecko.com/api/v3/simple/price?ids=smooth-love-potion&vs_currencies=usd")
    .then((response) => response.json())
    .then((data) => {
      return data['smooth-love-potion']['usd'];
    });

  printPrice(slpData, slpPrice);

  slpInput.addEventListener('keyup', () => {
    updatePrice(slpPrice, slpInput, slpBalance, 'slp');
  });

  cargarDatos('slp', slpInput, slpPrice, slpBalance);

  cargarTotalBalance();

  if (localStorage.getItem('slp-input')) {
    if (slpPrice.innerHTML == 'cargando...') {
      slpBalance.innerHTML = 'calculando...'
      setTimeout(() => {
        cargarDatos('slp', slpInput, slpPrice, slpBalance);
      }, 2000)
    }
  } else {
    slpBalance.innerHTML = 'Ingresa tus tokens';
  };

};

