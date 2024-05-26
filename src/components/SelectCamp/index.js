import "./index.css";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaDoorOpen,
  FaUserFriends,
  FaUserCheck,
} from 'react-icons/fa';
import { FaYoutube } from "react-icons/fa6";
import { FaMicrophoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { ThreeDots } from 'react-loader-spinner';
import Footer from '../Footer';
import Cookies from 'js-cookie';

const SelectCamp = () => {
  const [isLoading2, setIsLoading2] = useState(false);
  const [campList, setCampList] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading2(true);
      const email = Cookies.get("campuseremail");
      try {
        const response = await fetch(`https://js-member-backend.vercel.app/campusers/${email}`);
        if (response.ok) {
          const data = await response.json();
          setCampList(data.campsList);
        } else {
          console.log(`Failed to fetch: ${response.status}`);
        }
      } catch (Err) {
        console.log(`Error Occurred : ${Err}`);
      } finally {
        setIsLoading2(false);
      }
    };

    getVideos();
  }, []);

  console.log(campList);

  return (
    <>
      <div>
        <div className='main-header-container'>
          <h1 className='main-heading'>Select Camp</h1>
        </div>
        {isLoading2 ? (
          <div className="grid-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'black' }}>
            <ThreeDots color="gray" height={50} width={50} />
          </div>
        ) : (
          <div className='grid-container' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'black' }}>
            <div className='grid-row'>
              {campList.length > 0 ? (
                campList.map((ele) => (
                    <Link key={ele.id} to="/report">
                  <div  className="grid-card">
                    <h3>{ele.campId}</h3>
                    <h3>{ele.campName}</h3>
                  </div>
                  </Link>
                ))
              ) : (
                <div>No camps available</div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectCamp;


// import "./index.css"
// import React, { useEffect,useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   FaDoorOpen,
//   FaUserFriends,
//   FaUserCheck,
// } from 'react-icons/fa';
// import { FaYoutube } from "react-icons/fa6";
// import { FaMicrophoneAlt } from "react-icons/fa";
// import { IoLogoWhatsapp } from "react-icons/io";
// import { MdPhotoSizeSelectActual } from "react-icons/md";
// import { FaMapLocationDot } from "react-icons/fa6";
// import { ThreeDots } from 'react-loader-spinner';
// import Footer from '../Footer'
// import Cookies from 'js-cookie'

// const SelectCamp = () => {
//     const [isLoading2,setIsLoading2] = useState(false);
//     const [campList,setCampList] = useState([])

//     useEffect(() => {
//         const getVideos = async () => {
//           setIsLoading2(true)
//           const email = Cookies.get("campuseremail")
//           try{
//             const response = await fetch(`https://js-member-backend.vercel.app/campusers/${email}`);
//             if(response.ok)
//               {
//                 const data = await response.json()
//                 setCampList(data.campsList)
//                 setIsLoading2(false)
//               }
//           }
//           catch(Err){
//             console.log(`Error Occurred : ${Err}`);
//           }
//         };
    
//         // Call getVideos only once on mount
//         getVideos();
//       }, []); // Empty dependency array means it runs only once on mount

//     // useEffect(() => {
//     //     const getVideos = async () => {
//     //       setIsLoading2(true);
//     //       const email = Cookies.get("campuseremail");
//     //       try {
//     //         const response = await fetch(`https://js-member-backend.vercel.app/campusers/${email}`);
//     //         const data = await response.json();
//     //         const { campsList } = data;
//     //         setCampList(campsList);  // Directly set the fetched list
//     //         setIsLoading2(false);
//     //       } catch (Err) {
//     //         console.log(`Error Occurred : ${Err}`);
//     //         setIsLoading2(false); // Ensure loading state is reset on error
//     //       }
//     //     };
    
//     //     getVideos();
//     //   }, []);

//     console.log(campList);

//     return(
//     <>
//         <div>
//       <div className='main-header-container'>
//         <h1 className='main-heading'>Select Camp</h1>
//       </div>
//       {isLoading2===true && (
//             <div className="grid-container" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',minHeight:'100vh',backgroundColor:'black'}}>
//                 <ThreeDots color="gray" height={50} width={50}/>
//             </div>
//         )}
//     {isLoading2===false && (
//       <div className='grid-container'>
//         <div className='grid-row'>
//             {campList.map((ele) => (
//                 <div key={ele.id} className="grid-card">
//                     <h3>{ele.campId}</h3>
//                     <h3>{ele.campName}</h3>
//                 </div>
//             ))}
//       </div>
//       </div>
//         )}
//       </div>
//     </>
//     )
// }

// export default SelectCamp