import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import "./index.css"
import Cookies from 'js-cookie'
import YTCMFooter from '../Footer';
import { ThreeDots } from 'react-loader-spinner';
import {Popup} from 'reactjs-popup'

const KYC = () => {
    const [name, setName] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIFSCCode] = useState('');
    // const [city, setCity] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [aadharPhoto, setAadharPhoto] = useState(null);
    const [aadharPhotoBase64, setAadhaarPhotoBase64] = useState('');
    const [isLoading, setIsLoading] = useState('false')
    const [userDetails,setUserDetails] = useState('')
    const campCluster = Cookies.get("campId")

    const navigate = useNavigate();

    const onChangeName = (event) => setName(event.target.value);
    const onChangeBankName = (event) => setBankName(event.target.value);
    const onChangeAccountNumber = (event) => setAccountNumber(event.target.value);
    const onChangeIFSCCode = (event) => setIFSCCode(event.target.value);
    // const onChangeCity = (event) => setCity(event.target.value);
    const onChangeAadharNumber = (event) => setAadharNumber(event.target.value);
    const getUrl = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
    
        try {
          const response = await fetch('https://js-member-backend.vercel.app/upload', {method:"POST",body:formData});
          const data = await response.json()
          return data.Location
        } catch (error) {
          alert("File Upload Failed")
          console.error('Error uploading file:', error.response ? error.response.data : error.message);
        }
      }
    const onChangeAadharPhoto = async (event) => {
         const file = event.target.files[0]
         const fileUrl = await getUrl(file)
         setAadharPhoto(fileUrl)
    }


    useEffect(() => {
        const getVideos = async () => {
          setIsLoading(true)
          const email = Cookies.get("campuseremail");
          try {
            const response = await fetch(`https://js-member-backend.vercel.app/campusers`);
            const response2 = await fetch(`https://js-member-backend.vercel.app/getcampusers`);
            const data = await response.json();
            const data2 =await response2.json();
            const newUser2 = (data2.CampusersList).filter((ele) => ele.email===email && ['approved','pending','rejected'].includes(ele.kycstatus))[0]
            const newUser = data.filter((ele) => ele.email===email && ["approved","pending","rejected"].includes(ele.kycstatus))[0]
            if(newUser!==undefined)
            setUserDetails(newUser)
            if(newUser2!==undefined)
            setUserDetails(newUser2)
            
            setIsLoading(false)
            // Update videosList state with the fetched data
            // setVideosList(data.videos); // Assuming the response structure has a 'videos' property
          } catch (error) {
            console.error("Error fetching videos:", error);
          }
        };
    
        // Call getVideos only once on mount
        getVideos();
      }, []);

      const onDeleteKYC = async (event) => {
        event.preventDefault()
        const options = {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({email:Cookies.get("campuseremail")})
        }
        const response  = await fetch(`https://js-member-backend.vercel.app/deletecampkyc`,options)
        try{
            const data = await response.json()
            console.log(data);
        }
        catch(Err){
            console.log(`Error Occurred : ${Err}`);
        }
        navigate("/profile",{replace:true})
    }

    // console.log(userDetails)


    const postKYC = async (obj) => {
        console.log(obj)
        const email = Cookies.get("campuseremail");
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ obj, email })
            }
            const response = await fetch(`https://js-member-backend.vercel.app/addcampKYC`, options);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            }
        }
        catch (Err) {
            console.log(`Error Occurred : ${Err}`);
        }
        finally{
            window.location.href="/profile"
        }
    }

    const onSubmitRegisterYTMC = (event) => {
        event.preventDefault();
        console.log(aadharPhoto)
        if(aadharPhoto){
        const formData = {
            name,
            bankName,
            accountNumber,
            ifscCode,
            // city,
            aadharNumber,
            aadharPhoto,
            campCluster
        };
        postKYC(formData)
        setName('');
        setBankName('');
        setAccountNumber('');
        setIFSCCode('');
        // setCity('');
        setAadharNumber('');
        setAadharPhoto('');
    }
    else{
        alert("Please wait File is Uploading")
    }
    };

    return (
        <>
            <div className="ytmcregister-main-container">
                <div style={{ textAlign: 'left', backgroundColor: '#ffff00', position: 'fixed', width: '100%', top: '0', zIndex: '100',marginBottom:'0' }} className="ytmcregister-top-container">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                            <FaArrowLeft className="back-icon" />
                        </Link>
                        <h2>KYC</h2>
                    </div>
                </div>
                {isLoading===true && (
                        <div className="ytmchome-content-container" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'black',minHeight:'100vh'}}>
                                <ThreeDots color="gray" height={50} width={50}/>
                        </div>
                )}
                {isLoading===false && (
                    <>
                    {(!userDetails.kyc ||Object.keys(userDetails)===0) && (                    
                        <div style={{ marginTop: '80px', overflowY: 'auto', paddingBottom: '100px' }} className="ytmcregister-form-container">
                    <form onSubmit={onSubmitRegisterYTMC}>
                        <div className="ytmcregister-cont-ele">
                            <label htmlFor="username">Name</label>
                            <br />
                            <input placeholder="Enter the Name" onChange={onChangeName} className="ytmcregister-user-input" type="text" id="username" required value={name} />
                        </div>
                        <div className="ytmcregister-cont-ele">
                            <label htmlFor="bankName">Bank Name</label>
                            <br />
                            <input placeholder="Enter Bank Name" onChange={onChangeBankName} className="ytmcregister-user-input" type="text" id="bankName" required value={bankName} />
                        </div>
                        <div className="ytmcregister-cont-ele">
                            <label htmlFor="accountNumber">Account Number</label>
                            <br />
                            <input placeholder="Enter Account Number" onChange={onChangeAccountNumber} className="ytmcregister-user-input" type="text" id="accountNumber" value={accountNumber} required />
                        </div>
                        <div className="ytmcregister-cont-ele">
                            <label htmlFor="ifscCode">IFSC Code</label>
                            <br />
                            <input placeholder="Enter IFSC Code" onChange={onChangeIFSCCode} className="ytmcregister-user-input" type="text" id="ifscCode" value={ifscCode} required />
                        </div>
                        {/* <div className="ytmcregister-cont-ele"> */}
                            {/* <label htmlFor="city">City</label> */}
                            {/* <br /> */}
                            {/* <input placeholder="Enter City" onChange={onChangeCity} className="ytmcregister-user-input" type="text" id="city" value={city} required /> */}
                        {/* </div>  */}
                        
                        <div className="ytmcregister-cont-ele">
                            <label htmlFor="aadharNumber">Aadhar Number</label>
                            <br />
                            <input placeholder="Enter Aadhar Number" onChange={onChangeAadharNumber} className="ytmcregister-user-input" type="text" id="aadharNumber" value={aadharNumber} required />
                        </div>
                        <div className="ytmcregister-cont-ele">
                            <label htmlFor="aadharPhoto">Aadhar Photo</label>
                            <br />
                            <input className="ytmcregister-user-input" onChange={onChangeAadharPhoto} type="file" id="aadharPhoto" accept=".jpg,.jpeg,.png" required />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <button className="fetchBtn" type="submit">Submit</button>
                        </div>
                    </form>
                    </div>
                    )}
                    {userDetails.kyc && Object.keys(userDetails)!==0 && (
                        <>
                        <div style={{marginTop:'30px', overflowY: 'auto', paddingBottom: '100px' }} className="kyccontainer">
                        <ul>
                        <li style={{width:'100%'}}>
                            <span>Aadhar Photo:</span>
                            <div>
                            <img style={{margin:'auto'}} src={(userDetails.kyc).aadharPhoto} alt="aadharphoto" height="200" width="200"/>
                            </div>
                        </li>
                        <li><span>Name:</span> {(userDetails.kyc).name}</li>
                        <li><span>Email:</span> {userDetails.email}</li>
                        <li><span>Bank:</span> {(userDetails.kyc).bankName}</li>
                        <li><span>Account No:</span> {(userDetails.kyc).accountNumber}</li>
                        <li><span>IFSC Code:</span> {(userDetails.kyc).ifscCode}</li>
                        {/* <li><span>City:</span> {(userDetails.kyc).city}</li> */}
                        <li><span>Aadhar No:</span> {(userDetails.kyc).aadharNumber}</li>
                        <li><span>Status:</span> {userDetails.kycstatus}</li>
                        </ul>
                        <div style={{textAlign:'center'}}>
                        <Popup
                    trigger={<button className='delete-Btn' type="button">Delete</button>}
                    modal
                    nested
                    contentStyle={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}
                    overlayStyle={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '9998' }}
                    >
                    {close => (
                        <div className="modal rcyt-custom-popup">
                        <div className="content rcyt-popup-cont">
                            <h3>Are you sure you want to Delete KYC?</h3>
                            <button onClick={onDeleteKYC}  className="delete-Btn" type="submit">Delete KYC</button>
                        </div>
                        <div className="actions">
                            <button className="button delete-Btn" onClick={() => {
                            console.log('modal closed');
                            close();
                            }}>Cancel</button>
                        </div>
                        </div>
                    )}
                    </Popup>
                    </div>
                    </div>
                        </>
                    )}
                    </>
                )}
                    {/* {aadharPhotoBase64!==null && (<img src={`data:image/jpeg;base64,${aadharPhotoBase64}`} height="200" width="200" alt="image"/>)} */}

            </div>
            <div style={{ position: 'fixed', bottom: '0', width: '100%', zIndex: '100' }}>
                <YTCMFooter />
            </div>
        </>
    )
}

export default KYC;