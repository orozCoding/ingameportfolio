const slpPrice = document.querySelector("#slp-precio");
const slpInput = document.querySelector("#slp-input");
const slpBalance = document.querySelector("#slp-balance");
let num;

let slp = fetch("https://api.coingecko.com/api/v3/simple/price?ids=smooth-love-potion&vs_currencies=usd")
  .then((response) => response.json())
  .then((data) => {
    return data['smooth-love-potion']['usd'];
  });

let bcoin = fetch("https://api.coingecko.com/api/v3/simple/price?ids=bomber-coin&vs_currencies=usd")
  .then((response) => response.json())
  .then((data) => {
    return data['bomber-coin']['usd'];
  });

async function printPrice(token, box) {
  box.innerHTML = 'cargando...';
  const a = await token;
  box.innerHTML = Number(a);
};

printPrice(slp, slpPrice);

slpInput.addEventListener('input', () => {
  num = slpPrice.innerHTML * slpInput.value;
  slpBalance.innerHTML = '$' + Math.round(((num) + Number.EPSILON) * 100) / 100;
  localStorage.setItem('slp-input', slpInput.value);
  localStorage.setItem('slp-balance', slpBalance.innerHTML);
})

function cargarDatos() {
  if (localStorage.getItem('slp-input')) {
    slpInput.value = localStorage.getItem('slp-input');
    num = slpPrice.innerHTML * slpInput.value;
    slpBalance.innerHTML = '$' + Math.round(((num) + Number.EPSILON) * 100) / 100;
  }
}

cargarDatos();

while (slpBalance.innerHTML == '$NaN') {
  slpBalance.innerHTML = 'cargando...';
  setInterval(cargarDatos, 500);
}
















