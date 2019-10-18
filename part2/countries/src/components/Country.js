import React from 'react'

const Country = ({ name, capital, population, languages, flag, onClick }) => {
  if (capital) { // single country
    return (
      <>
        <h2>{name}</h2>
        <ul>
          <li>
            capital: {capital}
          </li>
          <li>
            population: {population}
          </li>
        </ul>
        <h3>languages</h3>
        <ul>
          {languages}
        </ul>
        <img src={flag} width="150" alt="flag of the selected country" />
      </>
    )
  } else { // list of countries
    return <>{name} <button data-name={name} onClick={onClick}>show</button><br /></>
  }
}

export default Country
