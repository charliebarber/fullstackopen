import React from 'react';

const Notification = ({message}) => {
    const style = {
        color: 'green',
        fontSize: '24px',
        borderStyle: 'solid',
        borderRadius: '4px',
        textAlign: 'center',
        margin: '16px'
    }

    if (message === '') {
        return null
    }
    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default Notification;