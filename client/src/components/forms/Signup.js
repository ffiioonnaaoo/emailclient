import React, {Fragment, useState} from 'react';
import axios from 'axios';

export default function Signup () {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const  {username, email, password, password2 } = formData;
    const onChange = (e) => {
        setFormData({
            //uses the name to get the value from all the input fields
            ...formData, [e.target.name]: e.target.value
          
        })

    }
    const onSubmit = async (e) =>{
        e.preventDefault();

        if(password !== password2){
            console.log('passwords do not match')
            console.log('the data entered in the form is'+formData)
        } else {
            const newUser = {
                username,
                email,
                password,
                password2
            }
            // try {
            //     const config = {
            //         headers: {
            //             'Content-type': 'application/json'
            //         }
            //     }
            //     const body = JSON.stringify(newUser);
            //     const res = await axios.post('api/users', body, config);
            //     console.log(res.data);
    
    
            // } catch (error){
            //     console.log(error.response.data)
    
            // }

            let api_call = await fetch('/api/users')
            let res = await api_call.json();
            console.log(res)

        }
      
     
    }
    return(
        <Fragment>
        <h1>Signup</h1>
        <form onSubmit={(e)=> onSubmit(e)}>
        <input type="text" placeholder="username" name="username" value={username} onChange={(e)=> onChange(e)}></input>
        <input type="text" placeholder="email" name="email" value={email} onChange={(e)=> onChange(e)}></input>
        <input type="password" placeholder="password" name="password" value={password} onChange={(e)=> onChange(e)}></input>
        <input type="password" placeholder="password confirmation" name="password2" value={password2} onChange={(e)=> onChange(e)}></input>
        <button>Signup</button>
        
        </form>
        </Fragment>
    )
}