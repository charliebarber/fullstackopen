import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setURL] = useState('')
    const [message, setMessage] = useState(null)
    const [update, setUpdate] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )  
    }, [update])

    // useEffect(() => {
    //     console.log('sort effect called')
    //     setBlogs( blogs.sort((a,b) => a.likes > b.likes ? -1 : 1) )
    // }, [])

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
                setMessage(`New blog: ${response.title} by ${response.author} has been added`)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
            .catch((error) => {
                console.log(error)
                setMessage('Unable to add blog')
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })

    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value)
    }
    
    const handleURLChange = (e) => {
        setURL(e.target.value)
    }


    if (user === null) {
        return (
            <div>
                <h3>{message}</h3>
                <Togglable buttonLabel={'Login'}>
                    <LoginForm
                        username={username}
                        password={password}
                        handleLogin={handleLogin}
                        handleUsernameChange={handleUsernameChange}
                        handlePasswordChange={handlePasswordChange}
                    />
                </Togglable>
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
            <Togglable buttonLabel={'New blog'} >
                <CreateBlog
                    handleAddBlog={handleAddBlog}
                    handleTitleChange={handleTitleChange}
                    handleAuthorChange={handleAuthorChange}
                    handleURLChange={handleURLChange}
                    title={title}
                    author={author}
                    url={url}
                />
            </Togglable>
            <div>
                {blogs
                    .sort((a,b) => a.likes > b.likes ? -1 : 1)
                    .map(blog =>
                    <Blog key={blog.id} blog={blog} setUpdate={setUpdate}/>
                )}
            </div>
        </div>
    )
}


export default App