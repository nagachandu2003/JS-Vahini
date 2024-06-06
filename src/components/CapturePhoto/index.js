import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { FaCamera, FaTimes, FaCheck } from 'react-icons/fa';
import { useNavigate,useLocation } from 'react-router-dom';
import "./index.css"
// import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'
// import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

// const {
//     CLOUDFLARE_ACCESS_ID,
//     CLOUDFLARE_ACCESS_KEY,
//     CLOUDFLARE_ACCOUNT_ID,
//     CLOUDFLARE_R2_BUCKET_NAME
// } = process.env

// const S3 = new S3Client({
//     region : "auto",
//     endpoint:`https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudFlarestorage.com`,
//     credentials:{
//         accessKeyId:CLOUDFLARE_ACCESS_ID,
//         secretAccessKey:CLOUDFLARE_ACCESS_KEY
//     }
// })

const CapturePhoto = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [fileInfo, setFileInfo] = useState({ type: '', size: 0 });
  const [uploadedImgUrl, setUploadedImgUrl] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const UserData = location.state;
  // console.log(UserData)
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    const fileType = imageSrc.split(';')[0].split(':')[1];
    const fileSize = Math.round((imageSrc.length - imageSrc.indexOf(',') - 1) * 3 / 4);

    setFileInfo({ type: fileType, size: fileSize });
  }, [webcamRef]);

  const handleRetake = () => {
    setCapturedImage(null);
    setFileInfo({ type: '', size: 0 });
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const postData = async (value) => {
    let options = {
      method : "POST",
      headers : {
        "Content-Type":"application/json"
      },
      body : JSON.stringify(value)
    }
    const response = await fetch("https://js-member-backend.vercel.app/campusers",options)
    const data = await response.json()
    console.log(data)
  }

  const handleConfirm = async () => {
    const file = dataURLtoFile(capturedImage, 'capturedImage.jpg');
      const formData = new FormData();
      formData.append('image', file);
      setFileInfo(file)
      const url = URL.createObjectURL(file)
      setUploadedImgUrl(url)
      const finalData = {
        ...UserData,
        imageData:capturedImage
      }
      // console.log(finalData)
      await postData(finalData)
      navigate("/regpending")
      
      
//     try {
//       await axios.post('http://localhost:5000/upload', { data: capturedImage });
//       alert('Photo confirmed and saved!');
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       alert('Failed to save the image');
//     }
  }

  return (
    <div style={{ height: '90vh' }}>
      {!isCameraOpen ? (
        <div style={{minHeight:'100vh',fontFamily:"Roboto",display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <div className="ytmcregister-form-container" style={{textAlign:'center'}}>
          <h1 style={{margin:'10px'}}>Take Picture</h1>
          <p style={{margin:'10px'}}>Please click on the below button to upload a photo</p>
          <button style={{margin:'auto',padding:'10px',borderRadius:'5px',borderWidth:'0',backgroundColor:'#2379f7', color:'white'}} onClick={() => setIsCameraOpen(true)}>Open Camera</button>
          </div>
        </div>
      ) : (
        <div style={{ height: '100vh', position: 'relative' }}>
          {capturedImage ? (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h1>Captured Image</h1>
              <img src={capturedImage} alt="Captured" style={{ maxHeight: '80%', maxWidth: '100%' }} />
              <div style={{ height: '10%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <button className='retakeBtn' onClick={handleRetake} style={{ marginRight: '1rem' }}>
                  Retake
                </button>
                <button className='saveBtn' onClick={handleConfirm}>
                  Save & Submit
                </button>
              </div>
            </div>
          ) : (
            <div style={{ height: '100%' }}>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{ height: '90%', width: '100%', objectFit: 'cover' }}
              />
              <div style={{ height: '10%', backgroundColor: 'black', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <button onClick={capture} style={{backgroundColor: 'transparent',borderWidth:'0',marginRight: '1rem' }}>
                  <FaCamera color='yellow' size={30} />
                </button>
                <button style={{backgroundColor: 'transparent',borderWidth:'0'}} onClick={() => setIsCameraOpen(false)}>
                  <FaTimes color="#fff" size={30} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CapturePhoto;