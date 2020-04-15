const URL = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const searchInput = document.getElementById('cities-search');
const citiesResults = document.getElementById('cities__results');
const emptyResult = document.getElementById('empty-results')

const showEmptyInfo = () => {
  citiesResults.classList.add('hide');
  emptyResult.classList.remove('hide');
}

const hideEmptyInfo = () => {
  emptyResult.classList.add('hide');
  citiesResults.classList.remove('hide');
}

const showResults = (cityWithState, population) => {
  citiesResults.innerHTML +=
    `<li class="cities__result">
      <span class="cities__city">${cityWithState}</span>
      <span class="cities__population">${population}</span>
    </li>`;
}

const filterCity = (data, inputValue) => {
  citiesResults.innerHTML = '';

  data.filter((el) => {
    const citiesResult = citiesResults.querySelectorAll('.cities__result');
    const cityWithState = `${el.city}, ${el.state}`;

    if (cityWithState.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 && citiesResult.length < 5) {
      const population = el.population;

      hideEmptyInfo();
      showResults(cityWithState, population);

    } else if (citiesResult.length === 0) {
      showEmptyInfo();
    }
  })
}

const searchCity = (data) => {
  searchInput.addEventListener('keyup', () => {
    const inputValue = searchInput.value;

    if (inputValue.length > 1) {
      filterCity(data, inputValue);
    } else {
      showEmptyInfo();
    }
  })
}

const getData = () => {
  fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      searchCity(data);
    });
}

getData();

