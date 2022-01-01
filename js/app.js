// functions
let num;

async function printPrice(token, box) {
  box.innerHTML = 'loading...';
  const a = await token;
  box.innerHTML = Number(a);
};

function updateTotalBalance() {
  let slpSum = Number(localStorage.getItem('slpSum'));
  let bcoinSum = Number(localStorage.getItem('bcoinSum'));
  let atlasSum = Number(localStorage.getItem('atlasSum'));
  let totalBalance = slpSum + bcoinSum + atlasSum;
  localStorage.setItem('totalBalance', totalBalance);
  sumaBalance.innerHTML = '$' + totalBalance.toFixed(2);
}

const sumaBalance = document.querySelector('#suma-balance');

function updatePrice(price, input, balance, label) {
  num = price.innerHTML * input.value;
  balance.innerHTML = '$' + Math.round(((num) + Number.EPSILON) * 100) / 100;
  localStorage.setItem(`${label}-input`, input.value);
  localStorage.setItem(`${label}-balance`, balance.innerHTML);
  localStorage.setItem(`${label}Sum`, num);
  updateTotalBalance()
};

function cargarDatos(label, input, price, balance) {
  if (localStorage.getItem(`${label}-input`)) {
    input.value = localStorage.getItem(`${label}-input`);
    num = price.innerHTML * input.value;
    balance.innerHTML = '$' + Math.round(((num) + Number.EPSILON) * 100) / 100;
  }
};

function cargarTotalBalance() {
  if (localStorage.getItem(`totalBalance`)) {
    let tempBalance = Number(localStorage.getItem(`totalBalance`));
    sumaBalance.innerHTML = '$' + tempBalance.toFixed(2);
  }
}

cargarTotalBalance();

// reset btn

const btnReset = document.getElementById('btn-reset');

function resetAll() {
  localStorage.clear();
  location.reload();
}

btnReset.addEventListener('click', resetAll);

// refresh button

const btnRefresh = document.getElementById('btn-refresh');

btnRefresh.addEventListener('click', () => {
  location.reload('Refresh');
})

// set welcome UI

const welcome = {
  content: `<div id="welcome-title" class="bold">Welcome to your portfolio of unclaimed tokens.</div>
  <div id="welcome-msg" class="d-flex">
    <p>On this site you will be able to keep track of the amount 
      of unclaimed tokens you have blocked in the games 
      and their value in USD.
    </p>
    <p>Please go ahead and start selecting the tokens 
      you own and you'll be able to see the current price 
      and the input box so you can manualy enter 
      the ammount of tokens you're holding.
    </p>
  </div>`
}

const coinsContainer = document.getElementById('coins-container');

if(!localStorage.getItem('old-user')){
  let welcomeSection = document.createElement('div');
  welcomeSection.setAttribute('id', 'welcome');
  welcomeSection.classList.add('d-flex');
  welcomeSection.innerHTML = welcome.content;
  coinsContainer.appendChild(welcomeSection);
} else if (localStorage.getItem('old-user')){
  if(document.getElementById('welcome')) {
    welcomeSection.remove();
  }
};

const checkerBox = document.querySelectorAll('.checker-box');

checkerBox.forEach( element => {
  element.addEventListener('change', () => {
    localStorage.setItem('old-user', 'yes')
  });
});



// coin objects

const slp = {
  content: `<div id="slp-titulo" class="coin-title">SLP</div>
  <div id="slp-section" class="coin-usd">Price in USD:</div>
  <div class="coin-price-container">$<div id="slp-precio" class="coin-precio"></div></div>
  <input id="slp-input" class="coin-input" type="number" onwheel="this.blur()">
  <div id="slp-balance" class="coin-balance">Enter your tokens</div>`
};

const bcoin = {
  content: `<div id="bcoin-titulo" class="coin-title">BCOIN</div>
  <div id="bcoin-section" class="coin-usd">Price in USD:</div>
  <div class="coin-price-container">$<div id="bcoin-precio" class="coin-precio"></div></div>
  <input id="bcoin-input" class="coin-input" type="number" onwheel="this.blur()">
  <div id="bcoin-balance" class="coin-balance">Enter your tokens</div>`
};

const atlas = {
  content: `<div id="atlas-titulo" class="coin-title">ATLAS</div>
  <div id="atlas-section" class="coin-usd">Price in USD:</div>
  <div class="coin-price-container">$<div id="atlas-precio" class="coin-precio"></div></div>
  <input id="atlas-input" class="coin-input" type="number" onwheel="this.blur()">
  <div id="atlas-balance" class="coin-balance">Enter your tokens</div>`
};

// coins containers and pre-setting

const cbSlp = document.getElementById('cb-slp');
if (cbSlp.checked = false) {
  localStorage.setItem('slp-check', 'no');
};

const cbBcoin = document.getElementById('cb-bcoin');
if (cbBcoin.checked = false) {
  localStorage.setItem('bcoin-check', 'no');
};

const cbAtlas = document.getElementById('cb-atlas');
if (cbAtlas.checked = false) {
  localStorage.setItem('atlas-check', 'no');
};

// slp setting

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


if (localStorage.getItem('slp-check') == 'yes') {
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
    if (slpPrice.innerHTML == 'loading...') {
      slpBalance.innerHTML = 'calculating...'
      setTimeout(() => {
        cargarDatos('slp', slpInput, slpPrice, slpBalance);
      }, 2000)
    }
  } else {
    slpBalance.innerHTML = 'Enter your tokens';
  };

};

// bcoin setting

cbBcoin.addEventListener('change', () => {
  if (cbBcoin.checked) {
    let coinBcoin = document.createElement('div');
    coinBcoin.setAttribute('id', 'bcoin-container');
    coinBcoin.classList.add('coin-container', 'd-flex');
    coinBcoin.innerHTML = bcoin.content;
    coinsContainer.appendChild(coinBcoin);
    localStorage.setItem('bcoin-check', 'yes');
    location.reload();

  } else {
    localStorage.setItem('bcoin-input', null);
    localStorage.setItem('bcoinSum', '0');
    updateTotalBalance();
    coinBcoin = document.getElementById('bcoin-container');
    coinBcoin.remove();
    localStorage.setItem('bcoin-check', 'no');
    location.reload();
  }
});

if (localStorage.getItem('bcoin-check') == 'yes') {
  cbBcoin.checked = true;
  let coinBcoin = document.createElement('div');
  coinBcoin.setAttribute('id', 'bcoin-container');
  coinBcoin.classList.add('coin-container', 'd-flex');
  coinBcoin.innerHTML = bcoin.content;
  coinsContainer.appendChild(coinBcoin);
  localStorage.setItem('bcoin-check', 'yes');

  const bcoinPrice = document.querySelector("#bcoin-precio");
  const bcoinInput = document.querySelector("#bcoin-input");
  const bcoinBalance = document.querySelector("#bcoin-balance");

  let bcoinData = fetch("https://api.coingecko.com/api/v3/simple/price?ids=bomber-coin&vs_currencies=usd")
    .then((response) => response.json())
    .then((data) => {
      return data['bomber-coin']['usd'];
    });

  printPrice(bcoinData, bcoinPrice);

  bcoinInput.addEventListener('keyup', () => {
    updatePrice(bcoinPrice, bcoinInput, bcoinBalance, 'bcoin');
  });
  cargarDatos('bcoin', bcoinInput, bcoinPrice, bcoinBalance);

  cargarTotalBalance();

  if (localStorage.getItem('bcoin-input')) {
    if (bcoinPrice.innerHTML == 'loading...') {
      bcoinBalance.innerHTML = 'calculating...'
      setTimeout(() => {
        cargarDatos('bcoin', bcoinInput, bcoinPrice, bcoinBalance);
      }, 2000)
    }
  } else {
    bcoinBalance.innerHTML = 'Enter your tokens';
  };

};

// atlas setting

cbAtlas.addEventListener('change', () => {
  if (cbAtlas.checked) {
    let coinAtlas = document.createElement('div');
    coinAtlas.setAttribute('id', 'atlas-container');
    coinAtlas.classList.add('coin-container', 'd-flex');
    coinAtlas.innerHTML = atlas.content;
    coinsContainer.appendChild(coinAtlas);
    localStorage.setItem('atlas-check', 'yes');
    location.reload();

  } else {
    localStorage.setItem('atlas-input', null);
    localStorage.setItem('atlasSum', '0');
    updateTotalBalance();
    coinAtlas = document.getElementById('atlas-container');
    coinAtlas.remove();
    localStorage.setItem('atlas-check', 'no');
    location.reload();
  }
});

if (localStorage.getItem('atlas-check') == 'yes') {
  cbAtlas.checked = true;
  let coinAtlas = document.createElement('div');
  coinAtlas.setAttribute('id', 'atlas-container');
  coinAtlas.classList.add('coin-container', 'd-flex');
  coinAtlas.innerHTML = atlas.content;
  coinsContainer.appendChild(coinAtlas);
  localStorage.setItem('atlas-check', 'yes');

  const atlasPrice = document.querySelector("#atlas-precio");
  const atlasInput = document.querySelector("#atlas-input");
  const atlasBalance = document.querySelector("#atlas-balance");

  let atlasData = fetch("https://api.coingecko.com/api/v3/simple/price?ids=star-atlas&vs_currencies=usd")
  .then((response) => response.json())
  .then((data) => {
    return data['star-atlas']['usd'];
  });

  printPrice(atlasData, atlasPrice);

  atlasInput.addEventListener('keyup', () => {
    updatePrice(atlasPrice, atlasInput, atlasBalance, 'atlas');
  });

  cargarDatos('atlas', atlasInput, atlasPrice, atlasBalance);

  cargarTotalBalance();

  if (localStorage.getItem('atlas-input')) {
    if (atlasPrice.innerHTML == 'loading...') {
      atlasBalance.innerHTML = 'calculating...'
      setTimeout(() => {
        cargarDatos('atlas', atlasInput, atlasPrice, atlasBalance);
      }, 2000)
    }
  } else {
    atlasBalance.innerHTML = 'Enter your tokens';
  };

};
