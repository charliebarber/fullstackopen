import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (blog) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, blog, config)
    return response.data 
}

const incrementLikes = async (blog, likes) => {
    const config = {
        headers: { Authorization: token }
    }

    const url = `${baseUrl}/${blog.id}`

    const data = {
        likes: likes
    }

    const response = await axios.put(url, data, config)
    return response.data
}

const deleteBlog = async (blog) => {
    const config = {
        headers: { Authorization: token }
    }

    const url = `${baseUrl}/${blog.id}`

    const response = await axios.delete(url, config)
    return response.data
}

export default { getAll, addBlog, setToken, incrementLikes, deleteBlog }