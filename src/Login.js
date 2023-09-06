import React from 'react'
import './Login.css'
import { Button } from '@mui/material'
import {auth, provider} from './firebase'
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'
function Login() {
  const [{}, dispatch] = useStateValue(); 

    const signIn = () =>{
        auth
        .signInWithPopup(provider)
        .then((result)=> {
          dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
          });
        })
        .catch((error=>alert(error.message)));
    }
  return (
    <div className='login'>
      <div className='login_container'>
        <img
            src=''
            alt=""
        />
        <div className='login_text'>
            <h1>Sign in to WhatsApp</h1>
        </div>

        <Button onClick={signIn}>signIn with Google</Button>
        
      </div>
    </div>
  )
}

export default Login
