import React from 'react'

const PersonForm = ({onSubmit, name, number}) =>
  <form onSubmit={onSubmit}>
    <div>
      name: <input onChange={name.onChange} value={name.value} />
    </div>
    <div>
      number: <input onChange={number.onChange} value={number.value} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

export default PersonForm
