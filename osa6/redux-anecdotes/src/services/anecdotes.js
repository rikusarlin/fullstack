import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const update = async (anecdote) => {
  console.log('anecdoteService.update: ',anecdote)
  const response = await axios.put(url+'/'+anecdote.id, anecdote)
  return response.data
}

const create = async (anecdote) => {
  console.log('anecdoteService.create: ',anecdote)
  const response = await axios.post(url, anecdote)
  console.log('anecdoteService.create response: ',response.data)
  return response.data
}

const deleteAnecdote = async (id) => {
  console.log('anecdoteService.delete: ',id)
  const response = await axios.delete(url+'/'+id)
  return response.data
}

export default { getAll, update, create, deleteAnecdote }