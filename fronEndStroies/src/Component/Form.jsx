import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Form = () => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('');
    const navigate = useNavigate()

    const submit = (e) => {
        e.preventDefault();
        console.log(name);
        document.cookie = `name=${name}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        document.cookie = `email=${email}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;

        axios.post("http://localhost:3000/createUser",{name,email})
            .then(res => {
                console.log(res.data);
                navigate("/");
            })
            .catch(err => console.error(err));
    }

    const handelLogOut = () => {
        
        document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    
        navigate('/');
    }
    return (
        <div>
            <form onSubmit={submit}>
                <input type="text" placeholder='Enter your name' required className='input' value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder='Enter your email' required className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type='submit' className='submit'> Submit </button>
            </form>
            <button className='cont' onClick={handelLogOut}> LogOut </button>
        </div>
    )
}

export default Form
