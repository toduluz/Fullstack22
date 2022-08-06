import CountryShowMultiple from "./CountryShowMultiple"
import CountryShowSingle from "./CountryShowSingle"

const Country = ({ countries, filterName }) => {

    const countriesToShow = (countriesList, filterName) => {

        const countries = countriesList.filter(country => country.name.common.toLowerCase().includes(filterName))

        if (countries.length > 10) {
          return (<p>Too many matches, specify another filter</p>)
        } else if (1 < countries.length && countries.length <= 10) {
          return (
            countries.map(country => <CountryShowMultiple key={country.cca2} country={country} />)
          )
        } else if (countries.length === 1) {
          return (
            <CountryShowSingle country={countries[0]}/>
          )
        } else {
        return (<p></p>)
      }
    }
    
    return (
        <div>
            {countriesToShow(countries, filterName)}
        </div>    
    )
}

export default Country