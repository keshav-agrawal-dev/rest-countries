const countryName = new URLSearchParams(window.location.search).get('name')
const countryNameTitle = document.querySelector('.country-title')
const countryFlagImage = document.querySelector('.country-flag-img')
const nativeName = document.querySelector('.country-details .native-name')
const population = document.querySelector('.country-details .population')
const region = document.querySelector('.country-details .region')
const subRegion = document.querySelector('.country-details .sub-region')
const capital = document.querySelector('.country-details .capital')
const topLevelDomain = document.querySelector('.country-details .tld')
const currencies = document.querySelector('.country-details .currencies')
const language = document.querySelector('.country-details .language')
const darkSwitch = document.querySelector('.header-container p')
const darkSwitchImage = document.querySelector('.header-container i')
const darkSwitchText = document.querySelector('.header-container span')
const borderCountries = document.querySelector('.border-countries')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([data]) => {

    countryNameTitle.innerText = data.name.common
    countryFlagImage.src = data.flags.svg
    countryFlagImage.alt = data.flags.alt
    population.innerText = data.population.toLocaleString('en-In')
    region.innerText = data.region
    topLevelDomain.innerText = data.tld.join(', ')

    if (data.name.nativeName) {
      nativeName.innerText = Object.values(data.name.nativeName)[0].common
    } else {
      nativeName.innerText = data.name.common
    }

    if (data.subregion) {
      subRegion.innerText = data.subregion
    }

    if (data.capital) {
      capital.innerText = data.capital?.[0]
    }

    if (data.currencies) {
      currencies.innerText = Object.values(data.currencies)
        .map((currency) => currency.name)
        .join(', ')
    }

    if (data.languages) {
      language.innerText = Object.values(data.languages).join(', ')
    }
    if (data.borders) {
    data.borders.forEach((border) => {
      fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res) => res.json())
        .then(([borderCountry]) => {
          const borderCountryTag = document.createElement('a')
          borderCountryTag.innerText = borderCountry.name.common
          borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
          borderCountries.append(borderCountryTag)
        })
    })
  }
  })
  .catch((err) => {
    console.log('Error In Program: ', err.message)
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
