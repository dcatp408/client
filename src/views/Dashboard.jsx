import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

const Dashboard = () => {

    const [authors, setAuthors] =useState([])
    const [state, setState] =useState(false)
    const [authorState, setAuthorState] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors`)
        .then(res => setAuthors(res.data))
        .catch(err => console.log(err))
    }, [state])

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8000/api/authors/${id}`)
        .then(res => setState(!state))
        .catch(err => console.log(err))
    }

    return (
        <fieldset>
            <legend>Dashboard.jsx</legend>
            <h1>Favorite Authors</h1>
            <Link to={`/create`}>
                                    Add an Author
                                </Link>
            <h4> We have quotes by:</h4>
            <ul>
                {
                    authors.map((author, idx) => {
                        return (
                            <>
                            <li key={idx}>
                                <Link to={`/authors/${author._id}`}>
                                    {author.name}
                                </Link>
                            </li>
                            <button onClick={() => deleteHandler(author._id)}>Delete</button>
                            <Link to={`/authors/${author._id}/edit`} className="mx-2 link-primary">
                                    Update an Author
                                </Link>
                            
                            </>
                        )
                    })
                }
            </ul>
        </fieldset>
    )
}

export default Dashboard
