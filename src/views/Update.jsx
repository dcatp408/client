import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams, Link } from "react-router-dom"

const Update = () => {

    const { id } = useParams()
    const [validState, setValidState] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${id}`)
        .then(res => setFormState(res.data))
        .catch(err => console.log(err))
    }, [])
    const history = useHistory()

    const [formState, setFormState] = useState({
        name: ""
    })

    const changeHandler =(e) => {
        const {name, value} = e.target;
        setFormState({
            ...formState,
            [name] : value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/authors/${id}`, formState)
        .then(res => {
            history.push(`/`)
            console.log(res.data)
        })
        .catch(err => {
            console.log(err.response.data)
            const { errors } = err.response.data
            let errorObj = {}
            for (let [key, value] of Object.entries(errors)) {
                errorObj[key] = value.message
            }
            setValidState(errorObj)
        })
    }

    return (
        <fieldset>
            <legend>Update.jsx</legend>
            <form onSubmit={submitHandler}>
                <h1>Favorite Authors</h1>
                <Link to={`/`}>
                                    Home
                                </Link>
                <h4>Add New Author:</h4>
                <p>
                    Name:
                    <input type="text" name="name" id="" onChange={changeHandler} value={formState.name} />
                    {(validState.name) ? <p style={{ color: "red" }}>{validState.name}</p> : null}
                </p>
                <div className="d-flex">
                <button type="submit">Update</button>
                <Link to="/"><p>Cancel</p></Link>
                </div>
                </form>
                
        </fieldset>
    )
}

export default Update
