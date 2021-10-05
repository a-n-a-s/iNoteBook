import React from 'react'
import {Link} from 'react-router-dom'
const Alert = ({message}) => {
    return (
        <div>
            <div className="alert alert-primary" role="alert">
  A simple primary alert with <Link to="/"className="alert-link">an example link</Link>. Give it a click if you like.
</div>
        </div>
    )
}

export default Alert
