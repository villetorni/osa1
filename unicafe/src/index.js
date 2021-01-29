import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)




const StatisticLine = (props) => {
  return (

    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.value}
        {props.end}
      </td>
    </tr>


  )

}

const Statistics = (props) => {

  const calculateAverage = () => {
    let summa = 0
    props.feedback.forEach(element => {
      summa += element
    })

    let keskiarvo = summa / props.feedback.length
    return keskiarvo
  }


  const calculatePositive = () => {
    let positiiviset = 0
    props.feedback.forEach(element => {
      if (element > 0) {
        positiiviset += 1
      }
    })

    let pospros = positiiviset / props.feedback.length * 100
    return pospros
  }

  if (props.total === 0) {
    return (
      <div>
        <h1>statistic</h1>
        <p>No feedback given</p>
      </div>
    )

  }
  return (
    <div>
      <h1>statistic</h1>
      <table>

        <tbody>
          <StatisticLine text="good" value={props.good} />

          <StatisticLine text="neutral" value={props.neutral} />

          <StatisticLine text="bad" value={props.bad} />

          <StatisticLine text="all" value={props.total} />

          <StatisticLine text="average" value={calculateAverage()} />

          <StatisticLine text="positive" value={calculatePositive()} end="%" />
        </tbody>
      </table>
    </div>

  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, inTotal] = useState(0)
  const [feedback, setFeedback] = useState([])




  const handleGood = () => {
    setGood(good + 1)
    inTotal(total + 1)
    setFeedback(feedback.concat(1))
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    inTotal(total + 1)
    setFeedback(feedback.concat(0))
  }

  const handleBad = () => {
    setBad(bad + 1)
    inTotal(total + 1)
    setFeedback(feedback.concat(-1))
  }






  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} feedback={feedback} total={total} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)