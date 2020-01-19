import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async token => {

  const config = {
    headers: { 'Authorization': 'bearer '+token },
  } 

  const response = await axios.get(baseUrl, config)
  return response.data
}

export default { getAll }