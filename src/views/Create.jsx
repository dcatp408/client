import axios from "axios"
import React, { useState } from 'react'
import{ useHistory, Link } from 'react-router-dom'

const Create = () => {

    const history = useHistory()
    
    const[formState, setFormState] =
    useState({
        name: ""
    })

    const [validState, setValidState] = useState({})

    const changeHandler =(e) => {
        const { name, value} = e.target;
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/authors", formState)
            .then(res => {
                setFormState({
                    name: ""
                })
                history.push("/")
            })
            .catch( err => {
                // console.log(err.response.data)
                const { errors } = err.response.data
                let errorObj = {}
                for (let [key, value] of Object.entries(errors)) {
                    errorObj[key] = value.message
                }
                setValidState(errorObj)
            })
    }


    return (
        <div>
            <fieldset>
                <legend>Create.jsx</legend>
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
                <button type="submit">Create</button>
                <Link to="/"><p>Cancel</p></Link>
                </div>
                </form>
                

            </fieldset>
        </div>
    )
    
}

export default Create
