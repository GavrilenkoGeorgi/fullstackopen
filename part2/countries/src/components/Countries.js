import React from 'react'

const Countries = ({ countries }) => (
  countries.length > 10 ? <>Too many matches, specify another filter</> : <>{countries}</>
)

export default Countries
