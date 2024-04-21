const currencyOne = document.querySelector('.js-money-select-one');
const currencyTwo = document.querySelector('.js-money-select-two');
const currencyOneAmount = document.querySelector('.js-amount-one');
const currencyTwoAmount = document.querySelector('.js-amount-two');
const currencyConversionRate = document.querySelector('.js-display-conversion-rate');
const btnSwap = document.querySelector('.js-btn-swap');

function calculate() {
  const strCurrencyOne = currencyOne.value;
  const strCurrencyTwo = currencyTwo.value;
  console.log(currencyOneAmount.value);

  fetch(`https://api.exchangerate-api.com/v4/latest/${strCurrencyOne}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[`${strCurrencyTwo}`];
      currencyConversionRate.innerHTML = `1 ${strCurrencyOne} = ${rate} ${strCurrencyTwo}`;
      currencyTwoAmount.value = (rate * Number(currencyOneAmount.value)).toFixed(2);
    });  
}

currencyOne.addEventListener('change', (event) => {
  calculate();
})

currencyTwo.addEventListener('change', () => {
  calculate();
})

function swapButton() {
  const temp = currencyTwo.value;
  currencyTwo.value = currencyOne.value;
  currencyOne.value = temp;
  calculate();
}

currencyOneAmount.addEventListener('change', calculate);
currencyTwoAmount.addEventListener('change', calculate);
btnSwap.addEventListener('click', swapButton);
calculate();