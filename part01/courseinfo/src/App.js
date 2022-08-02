const Header = (props) => <h1>{props.course}</h1>

const Part = (props) => <p>{props.part} {props.exercises}</p>

const Content = (props) => {
  return (
    <div>
      {props.parts.map((el, i) => <Part key={`part-${i}`} part={el.name} exercises={el.exercises}/>)}
    </div>
  )
}

const Total = (props) => <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App