import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Country from './components/Country'
import Countries from './components/Countries'

import axios from 'axios'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  const setCountriesData = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(setCountriesData, [])

  const handleFilteredSearch = event => {
    setNewFilter(event.target.value.toLowerCase())
  }

  const filteredCountries = newFilter === ''
    ? countries
    : countries.filter(country => country.name.toLowerCase().startsWith(newFilter))

  const countriesList = () => filteredCountries.map(country => {
    if (filteredCountries.length === 1) { // single country to display
      return (
        <Country
          key={country.name}
          name={country.name}
          capital={country.capital}
          population={country.population}
          languages={country.languages
            .map(language => <li key={language.name}>{language.name} </li>)}
          flag={country.flag}
        />
      )
    } else if (filteredCountries.length <= 10) { // less than ten search results
      return (
        <Country
          key={country.name}
          name={country.name}
        />
      )
    } else return [] // too many results, empty array
  })

  return (
    <>
      <Filter value={newFilter} onChange={handleFilteredSearch}/>
      <Countries countries={countriesList()} />
    </>
  )
}

export default App
