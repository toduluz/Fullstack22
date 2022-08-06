const CountryShow = ({ country }) => (
    <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h4>languages:</h4>
        <ul>
            {Object.keys(country.languages).map(k => <li key={k}>{country.languages[k]}</li>)}
        </ul>
        <img src={country.flags.png} alt=""/>
    </div>
)

export default CountryShow