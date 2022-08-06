import { useState } from "react"
import CountryShow from "./CountryShow"

const CountryShowMultiple = ({ country }) => {
    const [showResult, setShowResult] = useState(false)

    const handleSetShowResult = () => setShowResult(!showResult)

    const showCountry = (showResult, country) => {
        if (showResult) {
            return <CountryShow country={country} />
        } 
    }

    return (
        <div>
            {country.name.common}
            <button type="button" className="collapsible" onClick={handleSetShowResult}>Show</button>
            {showCountry(showResult, country)}
        </div>
    )
}

export default CountryShowMultiple