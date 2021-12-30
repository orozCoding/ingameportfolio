const slpPrice = document.querySelector("#slp-precio");
const slpInput = document.querySelector("#slp-input");
const slpBalance = document.querySelector("#slp-balance");
const bcoinPrice = document.querySelector("#bcoin-precio");
const bcoinInput = document.querySelector("#bcoin-input");
const bcoinBalance = document.querySelector("#bcoin-balance");
const atlasPrice = document.querySelector("#atlas-precio");
const atlasInput = document.querySelector("#atlas-input");
const atlasBalance = document.querySelector("#atlas-balance");
const sumaBalance = document.querySelector('#suma-balance');
let num;

let slpData = fetch("https://api.coingecko.com/api/v3/simple/price?ids=smooth-love-potion&vs_currencies=usd")
  .then((response) => response.json())
  .then((data) => {
    return data['smooth-love-potion']['usd'];
  });

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

printPrice(slpData, slpPrice);
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

slpInput.addEventListener('keyup', () => {
  updatePrice(slpPrice, slpInput, slpBalance, 'slp');
});

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
}

cargarDatos('slp', slpInput, slpPrice, slpBalance);
cargarDatos('bcoin', bcoinInput, bcoinPrice, bcoinBalance);
cargarDatos('atlas', atlasInput, atlasPrice, atlasBalance);




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


if (localStorage.getItem('atlas-input')) {
  if (atlasPrice.innerHTML == 'cargando...') {
    atlasBalance.innerHTML = 'calculando...'
    setTimeout(() => {
      cargarDatos('atlas', atlasInput, atlasPrice, atlasBalance);
    }, 2000)
  }
} else {
  slpBalance.innerHTML = 'Ingresa tus tokens';
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

function resetAll(){
  slpInput.value = null;
  bcoinInput.value = null;
  atlasInput.value = null;
  slpBalance.innerHTML = 'Ingresa tus tokens';
  bcoinBalance.innerHTML = 'Ingresa tus tokens';
  atlasBalance.innerHTML = 'Ingresa tus tokens';
}

btnReset.addEventListener('click', resetAll);