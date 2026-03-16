const countriesContainer = document.querySelector('.countries-container')
const selectMenu = document.querySelector('main .select-menu')
const inputBox = document.querySelector('.search-filter-container input')
const darkSwitch = document.querySelector('.header-container p')
const darkSwitchImage = document.querySelector('.header-container i')
const darkSwitchText = document.querySelector('.header-container span')

let allCountriesData

function renderCountries(data) {
  countriesContainer.innerHTML = ''
  data.forEach((country) => {
    // console.log(country.capital)
    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card')
    countryCard.href = `./country.html?name=${country.name.common}`
    countryCard.innerHTML = `
            <img src='${country.flags.svg}' alt="${country.flags.alt}">
                <h3>${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString(
                  'en-In'
                )}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${
                  country.capital && country.capital.length > 0 ? country.capital[0] : '---'
                }</p>`

    countriesContainer.append(countryCard)
  })
}

fetch(
  'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital'
)
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data)
    allCountriesData = data
  })
  .catch((err) => {
    console.log('Error In Program: ', err.message)
  })

selectMenu.addEventListener('change', () => {
  fetch(`https://restcountries.com/v3.1/region/${selectMenu.value}`)
    .then((res) => res.json())
    .then((data) => renderCountries(data))
    .catch((err) => {
      console.log('Error In Program: ', err)
    })
})

inputBox.addEventListener('input', (e) => {
  const filteredData = allCountriesData.filter((country) =>
    country.name.common
      .toLowerCase()
      .includes(e.target.value.toLowerCase().trim())
  )

  renderCountries(filteredData)
})

darkSwitch.addEventListener('click', () => {
  document.body.classList.toggle('dark')

  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark')
    darkSwitchText.innerText = 'Light Mode'
    darkSwitchImage.classList.remove('fa-moon')
    darkSwitchImage.classList.add('fa-sun')
  } else {
    localStorage.setItem('theme', 'light')
    darkSwitchText.innerText = 'Dark Mode'
    darkSwitchImage.classList.add('fa-moon')
    darkSwitchImage.classList.remove('fa-sun')
  }
})

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark')
  darkSwitchText.innerText = 'Light Mode'
  darkSwitchImage.classList.remove('fa-moon')
  darkSwitchImage.classList.add('fa-sun')
} else {
  document.body.classList.remove('dark')
  darkSwitchText.innerText = 'Dark Mode'
  darkSwitchImage.classList.add('fa-moon')
  darkSwitchImage.classList.remove('fa-sun')
}
