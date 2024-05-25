import {React, useState } from 'react';
import { useNavigate}  from 'react-router-dom';
import Cookies from 'js-cookie'
import {GoogleOAuthProvider,GoogleLogin} from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'

import './index.css';

let availableCamps = []

const CampLogin = () => {
  const [email,setEmail] = useState('');
  const [name,setName] = useState('');
  const navigate = useNavigate()

  const check = async (arg) => {
    console.log(arg);
    const response = await fetch(`http://localhost:3001/campusers/${arg}`)
    if (response.ok){
    const data = await response.json()
    if(data.success===true)
    {
      availableCamps = data.campsList
      return true
    }
    else
    return false
    }
  }

//   const onSubmitSuccess = () => {
//     console.log("Login Success");
//     Cookies.set("jwt_token2","helloworld2",{expires:2});
//     // console.log(redir);
//     navigate("/campregister",{replace:true})
//   };

//   const onSubmitUser = event => {
//     event.preventDefault();
//     if (username === 'jsmem' && password === 'jsm@2024') {
//       onSubmitSuccess();
//     } else {
//       setUsername('');
//       setPassword('');
//       setErrorMsg('Invalid Credentials');
//     }
//   };

  return (
    <div className="login-form-container">
      <div>
        <img src="https://res.cloudinary.com/dylh46szw/image/upload/v1711793425/favicon2_pef2lb.jpg" className='login-logo' alt="img"/>
      </div>
      <form className="login-form" >
        <h1 style={{marginBottom:'10px'}}>Camp Login</h1>
         {/* <h1 className="main-heading">Camp Login</h1> */}
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <GoogleLogin 
            onSuccess={async (credentialResponse) => {
              // console.log(credentialResponse)
              const token = jwtDecode(credentialResponse.credential)
              const {email,name} = token
              setEmail(email);
              setName(name);
              Cookies.set("useremail",email)
              const res = await check(email)
            //   const { profileObj } = credentialResponse;
            // const userId = profileObj.googleId;
            // const userName = profileObj.name;
            // const userEmail = profileObj.email;
            // // Add your custom logic here (e.g., store user details, navigate to another page)
            // console.log("User ID:", userId);
            // console.log("User Name:", userName);
            // console.log("User Email:", userEmail);
            if(res===false)
              return (<h1>Access Denied</h1>)
            else 
              navigate("/report", {replace:true})
            }}
            onError={() => {
                console.log("Login Failed")
            }}
            />
            </GoogleOAuthProvider>
      </form>
    </div>
  );
};

export default CampLogin;
