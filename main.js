const apiUrl =
  "https://v6.exchangerate-api.com/v6/857c1bdc03924feaa6452dc2/latest/";

// поточне співвідношення курсу до грн
currentData();
async function currentData() {
  const response2 = await fetch(apiUrl + "UAH");
  const data2 = await response2.json();
  document.getElementById("kurs").innerHTML =
    "1 UAH = " +
    data2.conversion_rates.USD.toFixed(4) +
    " USD (" +
    data2.conversion_rates.EUR.toFixed(4) +
    " EUR)";
}

// основний розрахунок курсу
getData();
async function getData() {
  let currency1 = document.getElementById("currencyChoose1").value;
  let currency2 = document.getElementById("currencyChoose2").value;
  let sum = document.getElementById("currencySum").value;
  let url = apiUrl + currency1;

  // получаем объект ответа
  const response = await fetch(url);
  // из объекта ответа извлекаем текст ответа
  const data = await response.json();
  let rate;
  switch (currency2) {
    case "USD":
      rate = data.conversion_rates.USD;
      break;
    case "EUR":
      rate = data.conversion_rates.EUR;
      break;
    case "UAH":
      rate = data.conversion_rates.UAH;
      break;
  }

  let res = (rate * sum).toFixed(2);

  document.getElementById("data").innerHTML =
    sum + " " + currency1 + " = " + res + " " + currency2;
}

//текущая дата
function zero_first_format(value) {
  if (value < 10) {
    value = "0" + value;
  }
  return value;
}
function date_time() {
  let current_datetime = new Date();
  let day = zero_first_format(current_datetime.getDate());
  let month = zero_first_format(current_datetime.getMonth() + 1);
  let year = current_datetime.getFullYear();
  return day + "." + month + "." + year + " р.";
}
document.getElementById("date").innerHTML = date_time();
