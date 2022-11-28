import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useDispatch } from "react-redux";



const dest = "http://localhost:3001";

export function Login () {
    
    //console.log(process.env.REACT_APP_PORT);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = () => {
        Axios({
            method: 'POST',
            data: {
                username: email,
                password: password,
            },
            withCredentials: true,
            url: "http://localhost:3001/login"
        }).then((res) => {
            if(res.data.email){
                console.log(res.data.email)
                dispatch({
                    type: 'LOG_IN',
                    payload: res.data.email
                })
            } else {
                console.log(res.data.message)
            }
        })
    }

    const displayUser = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3001/profile"
        }).then(res => res.json())
        .then((res) => {
            setMessage(res.data.user.email);
            console.log(res);
            dispatch({
                type: 'LOG_IN',
                payload: res.data.user.email
            })
        });
    }

    return(
        <div>
            <h1>Welcome to the login page.</h1>
            <h1>{message}</h1>
            <div>
                <label htmlFor='email'>Email</label>
                <input 
                    type='text' id='email' name='email' required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                    type='password' id='password' name='password' required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleSubmit}>Log in</button>
        </div>
    )
}