import Part from "./Part"

const Course = ({ course }) => (
    <div>
        <h2>{course.name}</h2>
        <table>
            {course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
            <b>
                <tr>
                    <td>total of {course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} exercises</td>
                </tr>
            </b>
        </table>
    </div>
)

export default Course