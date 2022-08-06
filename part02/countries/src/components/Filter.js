const Filter = ({ filterName, handleFilterNameChange }) => {

    return (
        <div>
            find countries<input
                value = {filterName}
                onChange={handleFilterNameChange}
                />
        </div>
    )
}

export default Filter