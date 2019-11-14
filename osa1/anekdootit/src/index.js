import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Stats = ({votes, selected}) => {
    return(
        <div>
            has {votes[selected]} votes
        </div>
    )
}

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const MostVotedAnecdote = ({votes, anecdotes}) => {
    //from: https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array
    const indexOfMaxValue = votes.indexOf(Math.max(...votes));
    return (
      <div>
          <h1>Anecdote with most votes</h1>
          <p>{anecdotes[indexOfMaxValue]}</p>
      </div>
    )
}

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

  return (
    <div>
      {props.anecdotes[selected]}
      <Stats votes={allVotes} selected={selected}/>
      <div> 
        <Button handleClick={() => 
            voteAnecdote(allVotes, selected)} text="vote"/>
        <Button handleClick={() => 
            setSelectedValue(getRandomInt(0,anecdotes.length-1))} text="next anecdote"/>
       </div>
       <div>
         <MostVotedAnecdote votes={allVotes} anecdotes={anecdotes}/>
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
