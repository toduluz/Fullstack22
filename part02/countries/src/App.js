import {useEffect, useState} from 'react'
import axios from 'axios'
import Country from './components/Country'
import Filter from './components/Filter'

const App = () => {
  const [filterName, setFilterName] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterNameChange =(event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  return (
    <div>
      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange} />
      <Country countries={countries} filterName={filterName}/>
    </div>
  )
}

export default App;
