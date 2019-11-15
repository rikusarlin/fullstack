import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const Anecdote = ({header, votes, anecdote}) => (
  <div>
    <h1>{header}</h1>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </div>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  // collect votes of anecdotes in an array
  const [allVotes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const setSelectedValue = newValue => {
    setSelected(newValue)
  }

  const voteAnecdote = (votes, selected) => {
      // Cannot modify state directly => copy array first
      const copy = [...votes]
      copy[selected] +=1
      setVotes(copy)
  }

  //From: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let res = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log("random between ",min," and ",max,":",res)
    return res;
  }

  //from: https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array
  const indexOfMaxValue = allVotes.indexOf(Math.max(...allVotes));

  return (
    <div>
      <div>
          <Anecdote header="Anecdote of the day" votes={allVotes[selected]} anecdote={anecdotes[selected]}/>
      </div>
      <div> 
        <Button handleClick={() => 
            voteAnecdote(allVotes, selected)} text="vote"/>
        <Button handleClick={() => 
            setSelectedValue(getRandomInt(0,anecdotes.length-1))} text="next anecdote"/>
       </div>
       <div>
         <Anecdote header="Anecdote with most votes" votes={allVotes[indexOfMaxValue]} anecdote={anecdotes[indexOfMaxValue]}/>
       </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
