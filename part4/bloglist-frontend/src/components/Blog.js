import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setUpdate }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [visibility, setVisibility] = useState(false)

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

    const displayDiv = {display: visibility ? '' : 'none'}

    const [likes, setLikes] = useState(blog.likes)

    const handleLike = (e) => {
        e.preventDefault()
        blogService.incrementLikes(blog, likes + 1)
            .then((response) => {
                console.log(response)
                setLikes(response.likes)
                setUpdate(Math.random)
            })
    }

    const handleDelete = (e) => {
        e.preventDefault()
        if (window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`)) {
            blogService.deleteBlog(blog)
            .then((response) => {
                setUpdate(Math.random)
            })
        }
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}
            <button onClick={toggleVisibility}>view</button>
            <div style={displayDiv}>
                <p>{blog.url}</p>
                <p>
                    Likes {likes}
                    <button onClick={handleLike}>Like</button>
                </p>
                <p>{(blog.user ? blog.user.username : null)}</p>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default Blog
