import {React, useState } from 'react';
import { useNavigate}  from 'react-router-dom';
import Cookies from 'js-cookie'
import {GoogleOAuthProvider,GoogleLogin} from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'

import './index.css';


const CampLogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');
  const [email,setEmail] = useState('');
  const [name,setName] = useState('');
//   const [userExist, setUserExist] = useState(false);
  // console.log(data);
  // const navigate = useNavigate()
  const navigate = useNavigate()

//   const onChangeUsername = event => {
//     setUsername(event.target.value);
//   };

//   const onChangePassword = event => {
//     setPassword(event.target.value);
//   };

  const check = async (arg) => {
    // console.log("I am Check Function")
    console.log(arg);
    const response = await fetch(`https://js-member-backend.vercel.app/campusers/${arg}`)
    if (response.ok){
    const data = await response.json()
    console.log(data)
    if(data.success===true)
    {
      return true
    }
    else if(data.success==="pending")
    {
      return "pending"
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
            if(res==="pending")
             navigate("/regpending", {replace:true})
            else if(res===false)
                navigate("/campregister",{ state: {email,Googlename:name}},{replace:true} )
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
