const slpPrice = document.querySelector("#slp-precio");
const slpInput = document.querySelector("#slp-input");
const slpBalance = document.querySelector("#slp-balance");
const bcoinPrice = document.querySelector("#bcoin-precio");
const bcoinInput = document.querySelector("#bcoin-input");
const bcoinBalance = document.querySelector("#bcoin-balance");
const atlasPrice = document.querySelector("#atlas-precio");
const atlasInput = document.querySelector("#atlas-input");
const atlasBalance = document.querySelector("#atlas-balance");
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
}

slpInput.addEventListener('input', () => {
  updatePrice(slpPrice, slpInput, slpBalance, 'slp');
});

bcoinInput.addEventListener('input', () => {
  updatePrice(bcoinPrice, bcoinInput, bcoinBalance, 'bcoin');
});

atlasInput.addEventListener('input', () => {
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


if (slpPrice.innerHTML == 'cargando...' || bcoinPrice.innerHTML == 'cargando...' || atlasPrice.innerHTML == 'cargando...') {
  slpBalance.innerHTML = 'calculando...'
  bcoinBalance.innerHTML = 'calculando...'
  atlasBalance.innerHTML = 'calculando...'
  setTimeout(() => {
    cargarDatos('slp', slpInput, slpPrice, slpBalance);
    cargarDatos('bcoin', bcoinInput, bcoinPrice, bcoinBalance);
    cargarDatos('atlas', atlasInput, atlasPrice, atlasBalance);
  }, 1000)
}

// Suma total

const sumaBalances = document.querySelectorAll('.balance');
const sumaTotal = document.querySelector('#suma-balance');
let sumar = 0;
let sumada = 0;

function sumAll(){
  
}

sumaTotal.innerHTML = sumada;

