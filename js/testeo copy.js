const slpPrecio = document.querySelector("#slp-precio");
const slpBalance = document.querySelector("#slp-balance");
const slp = document.querySelector("#slp-monto");

let slp = fetch("https://api.coingecko.com/api/v3/coins/smooth-love-potion")
  .then((response) => response.json())
  .then((data) => {
    return data.market_data.current_price.usd;
  });

async function printPrice(coin, box) {
  box.innerHTML = 'cargando';
  const a = await coin;
  box.innerHTML = a;
};

printPrice(slp, slpBox);

async function getPrice(coin) {
  const a = await coin;
  console.log(a);
  return a;
};

let slpPrice = getPrice(slp);
console.log('price is ' + slpPrice)

slpInput.addEventListener('input', (event) => {

   saldoBox.innerHTML = slpBox.innerHTML * slpInput.value;
})









