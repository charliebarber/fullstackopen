import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
      event.preventDefault()

      try {
          const user = await loginService.login({
              username, password,
          })

          window.localStorage.setItem(
              'loggedBlogappUser', JSON.stringify(user)
          )
            
            setMessage('Login successful')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
      } catch (exception) {
          setMessage('Wrong credentials')
          setTimeout(() => {
              setMessage(null)
          }, 5000)
      }
  }

  const handleLogout = (e) => {
        e.preventDefault()
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
  }

  const handleAddBlog = (e) => {
      e.preventDefault()
      const blog = {
          title,
          author,
          url
      }
      blogService
        .addBlog(blog)
        .then((response) => {
            setBlogs(blogs.concat(response))
            setTitle('')
            setAuthor('')
            setURL('')
        })
        .catch(error => console.log(error))

  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <h3>{message}</h3>
        <form onSubmit={handleLogin}>
            <div>
            Username
                <input
                    type='text'
                    value={username}
                    name='Username'
                    onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
            Password
                <input
                    type='password'
                    value={password}
                    name='Password'
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type='submit'>Login</button>
        </form>
      </div>
    )
  }


  return (
    <div>
        <h2>blogs</h2>
        <h3>{message}</h3>
        <div>
            {user.username} logged in
            <button type='submit' onClick={handleLogout}>Logout</button>
        </div>
        <div>
            <h3>create new</h3>
            <form onSubmit={handleAddBlog}>
                title:
                <input
                    type='text'
                    value={title}
                    name='Title'
                    onChange={({target}) => setTitle(target.value)}
                />
                author:
                <input
                    type='text'
                    value={author}
                    name='Author'
                    onChange={({target}) => setAuthor(target.value)}
                />
                url:
                <input
                    type='text'
                    value={url}
                    name='URL'
                    onChange={({target}) => setURL(target.value)}
                />
                <button type='submit'>Add</button>
            </form>
        </div>
        <div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    </div>
  )
}


export default App