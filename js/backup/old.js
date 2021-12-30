/*
fetch('https://api.coingecko.com/api/v3/coins/smooth-love-potion')
.then(response => response.json())
.then(data => {
  console.log(data.market_data.current_price.usd);
  slpPrice = JSON.stringify(data.market_data.current_price.usd);
})
.catch(err => console.log(err));

resultados.innerHTML = slpPrice;

*/

/*
const cargarPrecio = async (moneda) => {

  try {
    const respuesta = await fetch(moneda)

    console.log(respuesta);

    const datos = await respuesta.json();
    console.log(datos);
    slpPrice = datos.market_data.current_price.usd.toString();
    console.log(slpPrice);
    resultados.innerHTML = slpPrice;

  } catch (error) {
    console.log(error);
  }

}
*/

/*
async function cargarPrecio(moneda, print) {

  try {
      await fetch(moneda)
    .then(response => response.json())
    .then(data => {
      console.log(data.market_data.current_price.usd.toString());
      resultados.innerHTML = data.market_data.current_price.usd.toString();
    return data.market_data.current_price.usd.toString();
    })
  } catch (error) {
    console.log(error);
  }

}


slpPrice = cargarPrecio(slp);

console.log(`El precio de esto es ${slpPrice}`)

*/

/*
const address = fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => response.json())
  .then((user) => {
    return user.address;
  });

const printAddress = async () => {
  const a = await address;
  console.log(a);
};

printAddress();
*/