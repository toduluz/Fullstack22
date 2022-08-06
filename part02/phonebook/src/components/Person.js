const Person = ({ person, delPerson }) => (
    <div>

        {person.name} {person.number} 
        <button onClick={() => {
            if(window.confirm(`Delete ${person.name} ?`)) {
                delPerson(person.id)
            }
            }}>
            delete
        </button>
    </div>
)

export default Person