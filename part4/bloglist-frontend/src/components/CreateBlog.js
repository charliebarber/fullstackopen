import React from 'react'

const CreateBlog = ({handleAddBlog, handleAuthorChange, handleTitleChange, handleURLChange, title, author, url}) => {
    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={handleAddBlog}>
                title:
                <input
                    type='text'
                    value={title}
                    name='Title'
                    onChange={handleTitleChange}
                />
                author:
                <input
                    type='text'
                    value={author}
                    name='Author'
                    onChange={handleAuthorChange}
                />
                url:
                <input
                    type='text'
                    value={url}
                    name='URL'
                    onChange={handleURLChange}
                />
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default CreateBlog