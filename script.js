const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

function calculation() {
  const currencyOne = currencyEl_one.value;
  const currencyTwo = currencyEl_two.value;

  fetch(` https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currencyTwo];

      rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

function unitSwap() {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculation();
}

currencyEl_one.addEventListener("change", calculation);
amountEl_one.addEventListener("input", calculation);
currencyEl_two.addEventListener("change", calculation);
amountEl_two.addEventListener("input", calculation);

swap.addEventListener("click", unitSwap);

calculation();
