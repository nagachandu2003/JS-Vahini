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
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');
  const [subAdminDetails, setSubAdminDetails] = useState([])
  const navigate = useNavigate()

  const check1 = async (arg) => {
    //Checking member or not
    const response = await fetch(`https://js-member-backend.vercel.app/campusers/${arg}`)
    if (response.ok){
    const data = await response.json()
    
    if(data.success===true )
    {
      setUser1('member')
      return true
    }
    else
    return false
    }
  }

  const check2 = async (arg) => {
    const response = await fetch(`https://js-member-backend.vercel.app/admincampusers/${arg}`)
    if(response.ok){
      const data = await response.json()
      // console.log(data.campsList[0])
      if(data.success===true)
        {
          setUser2('admin')
          Cookies.set("campId",(data.campsList)[0].campCluster);
          return true
        }
        else
        return false
    }
  }
  const check3 = async (arg) => {
    const response = await fetch(`https://js-member-backend.vercel.app/subadmincampusers/${arg}`)
    if(response.ok){
      const data = await response.json()
      console.log(data)
      const {subadminList} = data
      if(data.success===true)
        {
          navigate("/adminreport", {
            state: { subAdminDetails: subadminList[0] },
            replace: true
          });
          Cookies.set("isSubAdmin",true);
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
        <h1 style={{marginBottom:'10px'}}>JS Vahini Login</h1>
         {/* <h1 className="main-heading">Camp Login</h1> */}
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <GoogleLogin 
            onSuccess={async (credentialResponse) => {
              // console.log(credentialResponse)
              const token = jwtDecode(credentialResponse.credential)
              const {email,name} = token
              setEmail(email);
              setName(name);
              const res1 = await check1(email)
              const res2 = await check2(email)
              const res3 = await check3(email)
            //   const { profileObj } = credentialResponse;
            // const userId = profileObj.googleId;
            // const userName = profileObj.name;
            // const userEmail = profileObj.email;
            // // Add your custom logic here (e.g., store user details, navigate to another page)
            // console.log("User ID:", userId);
            // console.log("User Name:", userName);
            // console.log("User Email:", userEmail);
            if(res3!==true){
            if(res1===true && res2===true)
              {
                localStorage.setItem("campuseremail",JSON.stringify(email))
                Cookies.set("campuseremail",email);
                Cookies.set("isAdmin",true);
                Cookies.set("isSubAdmin",false);
                navigate("/choosepath",{replace:true})
              }
            else if(res1===true && res2===false){
              localStorage.setItem("campuseremail",JSON.stringify(email))
              Cookies.set("campuseremail",email);
              Cookies.set("isAdmin",false);
              Cookies.set("isSubAdmin",false);
              navigate("/report",{replace:true})
            }
            else if(res1===false && res2===false){
              navigate("/campregister", { state: {email,Googlename:name}},{replace:true})
              Cookies.set("isSubAdmin",false);
            }
            else if(res2===true && res1===false){
              localStorage.setItem("campuseremail",JSON.stringify(email))
              Cookies.set("campuseremail",email);
              Cookies.set("isAdmin",true)
              Cookies.set("isSubAdmin",false);
              navigate("/adminreport",{replace:true})
            }
          }
            // if(res===false)
            //   return navigate("/regpending",{replace:true})
            // else {
            //   Cookies.set("campuseremail",email)
            //   navigate("/selectcamp", {replace:true})
            // }

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
