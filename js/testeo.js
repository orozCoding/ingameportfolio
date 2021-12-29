const resultados = document.querySelector(".resultados");
let slpPrice;

fetch('https://api.coingecko.com/api/v3/coins/smooth-love-potion')
.then(response => response.json())
.then(data => {
  console.log(data.market_data.current_price.usd);
  slpPrice = JSON.stringify(data.market_data.current_price.usd);
})
.catch(err => console.log(err));

resultados.innerHTML = slpPrice;




