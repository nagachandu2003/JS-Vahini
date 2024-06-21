import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import './index.css'; // Import the CSS file for styling
import { FaCamera, FaTimes } from "react-icons/fa";
import Footer from '../../Footer';
import { v4 as uuidv4 } from 'uuid';
import Popup from 'reactjs-popup';
import { IoClose } from "react-icons/io5";
import Cookies from 'js-cookie';
import { MdDelete } from 'react-icons/md';

const Selfie = () => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const [capturedImages, setCapturedImages] = useState([]);
  const webcamRef = useRef(null);
  const [location, setLocation] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const campCluster = Cookies.get("campId");
  const email = Cookies.get("campuseremail");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true)
      try{
        const response = await fetch(`https://js-member-backend.vercel.app/getselfiedata/${campCluster}`);
        const data = await response.json()
        const filteredList = (data.result).filter((ele) => (ele.campCluster===campCluster && ele.email===email))
        setCapturedImages(filteredList)
        console.log(data)
        // console.log(filteredMembers)
        // setMembers(filteredMembers)
        // setUsers(filteredTeams)
        // setIsLoading(false)
            // console.log(data);
      }
      catch(Err){
        console.log(`Error Occurred : ${Err}`);
      }
    };

    // Call getVideos only once on mount
    getVideos();
  }, []); // Empty dependency array means it runs only once on mount

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      try {
        // Getting Members
        const response1 = await fetch(`https://js-member-backend.vercel.app/campusers`);
        const data1 = await response1.json();
        const filteredList1 = data1.filter((ele) => (ele.regstatus === "approved" && ele.campCluster === campCluster && ele.person === "member"));
        const mappedList1 = filteredList1.map((ele) => ({
          ...ele,
          person: 'member',
          MobNo: ele.mobileno,
          status: 'present',
          email
        }));

        // Getting Admins
        const response2 = await fetch(`https://js-member-backend.vercel.app/getcampusers`);
        const data2 = await response2.json();
        const filteredList2 = data2.CampusersList.filter((ele) => ele.campCluster === campCluster);
        const mappedList2 = filteredList2.map((ele) => ({
          ...ele,
          person: 'admin',
          MobNo: ele.campInchargeNumber,
          name: ele.campInchargeName,
          status: 'present',
          email: ele.campInchargeGmail
        }));

        // Getting Sub Admins
        const response3 = await fetch(`https://js-member-backend.vercel.app/getsubadmindetails`);
        const data3 = await response3.json();
        const filteredList3 = data3.subadminList.filter((ele) => (ele.campCluster === campCluster && ele.person === "subadmin"));
        const mappedList3 = filteredList3.map((ele) => ({
          ...ele,
          person: 'subadmin',
          MobNo: ele.mobileNo,
          status: 'present',
          email
        }));

        const newList = [...mappedList1, ...mappedList2, ...mappedList3];
        const filteredList = newList.filter((ele) => (ele.campCluster === campCluster && ele.email === email));
        setCurrentUser(filteredList[0]);
      } catch (err) {
        console.log(`Error Occurred: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, [campCluster, email]);

  const postData = async (obj) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...obj, ...{ email: currentUser.email, mobileno: currentUser.MobNo, name: currentUser.name,campCluster:currentUser.campCluster } })
      };
      const response = await fetch(`https://js-member-backend.vercel.app/addselfiedata`, options);
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(`Error Occurred: ${err}`);
    }
  }

  const onDeleteSelfie = async (value) => {
    try{
      const options = {
          method : "DELETE",
          headers : {
              "Content-Type" : "application/json"
          },
          body : JSON.stringify({id:value})
      }
      const response = await fetch(`https://js-member-backend.vercel.app/deleteselfie`,options);
      const data = await response.json();
      console.log(data)
  }
  catch(Err){
      console.log(`Error Occurred : ${Err}`)
  }
  window.location.reload()
  }

  const captureImage = async () => {
    const imageData = {
      id: uuidv4(),
      src: capturedImage,
      location: await getLocation(),
      date: (new Date()).toLocaleDateString('en-GB'),
      time: (new Date()).toLocaleTimeString() // We'll update this with location data later
    };
    await postData(imageData);
    setCapturedImages(prevImages => [...prevImages, imageData]);
    setIsCameraOpen(false);
    setCapturedImage(null);
  };

  const getLocation = async () => {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const locationData = await fetchLocation(latitude, longitude);
            resolve(locationData);
          } catch (error) {
            reject('Location not available');
          }
        });
      });
    } else {
      return 'Location not available';
    }
  };

  const fetchLocation = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
      const data = await response.json();
      const { city, principalSubdivision, countryName } = data;
      return { city, region: principalSubdivision, country: countryName, latitude, longitude };
    } catch (error) {
      console.error('Error fetching location:', error);
      return 'Location not available';
    }
  };

  const getLatAndLon = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLon(longitude);
      });
    }
  }

  const handleRetake = () => {
    setCapturedImage(null);
  };

  return (
    <>
      {isLoading ? (
        <div style={{ backgroundColor: 'black', color: 'white' }} className="photos-container">
          <div className="photos-main-header-container">
            <h1 className="photos-main-heading">Household (Selfie)</h1>
          </div>
          <div style={{ backgroundColor: 'black', textAlign: 'center' }} className="photos-content-container">
            <p style={{ color: 'white' }}>Loading Selfie</p>
          </div>
          <Footer />
        </div>
      ) : (
        <>
          {!isCameraOpen && (
            <>
              <div style={{ backgroundColor: 'black', color: 'white' }} className="photos-container">
                <div className="photos-main-header-container">
                  <h1 className="photos-main-heading">Household (Selfie)</h1>
                </div>
                <div style={{ backgroundColor: 'black', color: 'white' }} className="photos-upper-tabs-container">
                  <div
                    className={`photos-upper-tab ${activeTab === 0 ? 'active' : ''}`}
                    onClick={() => setActiveTab(0)}
                  >
                    List
                  </div>
                  <div
                    className={`photos-upper-tab ${activeTab === 1 ? 'active' : ''}`}
                    onClick={() => setActiveTab(1)}
                  >
                    Maps
                  </div>
                </div>
                <div className="photos-content-container">
                  {/* Content for Photos tab */}
                  <div style={{ backgroundColor: 'black', color: 'white' }} className={`photos-tab-content ${activeTab === 0 ? 'active' : ''}`}>
                    <div className="photos-container">
                      {/* Webcam and Image List */}
                      <div className="capture-button-container">
                        <button
                          style={{ borderRadius: '5px', borderWidth: 0 }}
                          onClick={() => {
                            setIsCameraOpen(true);
                            getLatAndLon();
                          }}
                          className="floating-button"
                        >
                          <FaCamera size={30} />
                        </button>
                      </div>

                        {capturedImages.length === 0 && (
                          <div style={{minHeight:'100vh'}} className='image-list-container'>
                          <p>No Selfie Yet! Click on Camera button to add a Selfie</p>
                          </div>)
                          }
                        {capturedImages.length !== 0 && (
                          <>
                          <div style={{ backgroundColor: 'black', color: 'white', width: '100%' }} className="image-list-container">
                            {capturedImages.map((image, index) => (
                              <div className="image-item-cont" key={index}>
                                <img src={image.src} alt={`captured
                                -${index}`} className="image-item-size" />
                                {image.location && (
                                  <div className="location-info">
                                    <p>{image.date} & {image.time}</p>
                                    <p>
                                      <span>{image.location.latitude} & {image.location.longitude}</span>
                                    </p>
                                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                    <Popup
                                      trigger={<button className="edit-Btn" style={{ borderRadius: '3px' }} type="button">View</button>}
                                      modal
                                      nested
                                      contentStyle={{
                                        position: 'fixed',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: '9999',
                                      }}
                                      overlayStyle={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        zIndex: '9998',
                                      }}
                                    >
                                      {close => (
                                        <div style={{ height: '400px', backgroundColor: 'white' }} className="modal rcyt-custom-popup">
                                          <div style={{ textAlign: 'right' }} className="actions">
                                            <button
                                              className="button"
                                              style={{
                                                backgroundColor: 'transparent',
                                                borderWidth: '0px',
                                                position: 'relative',
                                                top: '2px',
                                              }}
                                              onClick={() => {
                                                console.log('modal closed');
                                                close();
                                              }}
                                            >
                                              <IoClose size={20} />
                                            </button>
                                          </div>
                                          <div style={{ backgroundColor: 'white', height: '300px', overflowY: 'auto' }} className="content rcyt-popup-cont">
                                            <img src={image.src} alt="Captured" style={{ maxHeight: '80%', maxWidth: '100%' }} />
                                            <table className="userTable">
                                              <thead>
                                                <tr>
                                                  <th className="parameterHeader">Parameters</th>
                                                  <th className="valueHeader">Values</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td className="parameter">Date & Time</td>
                                                  <td className="value">{image.date} & {image.time}</td>
                                                </tr>
                                                <tr>
                                                  <td className="parameter">Latitude</td>
                                                  <td className="value">{image.location.latitude}</td>
                                                </tr>
                                                <tr>
                                                  <td className="parameter">Longitude</td>
                                                  <td className="value">{image.location.longitude}</td>
                                                </tr>
                                                <tr>
                                                  <td className="parameter">City</td>
                                                  <td className="value">{image.location.city}</td>
                                                </tr>
                                                <tr>
                                                  <td className="parameter">State</td>
                                                  <td className="value">{image.location.region}</td>
                                                </tr>
                                                <tr>
                                                  <td className="parameter">Country</td>
                                                  <td className="value">{image.location.country}</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      )}
                                    </Popup>
                                    <Popup
                    trigger={<button style={{backgroundColor:'transparent',borderWidth:'0',color:'red'}} type="button"><MdDelete size={25}/></button>}
                    modal
                    nested
                    contentStyle={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}
                    overlayStyle={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '9998' }}
                    >
                    {close => (
                        <div className="modal rcyt-custom-popup">
                        <div className="content rcyt-popup-cont">
                            <h3>Are you sure you want to Delete Selfie?</h3>
                            <button className="delete-Btn" onClick={() => {
                              onDeleteSelfie(image.id)
                            close()
                            }} type="button">Delete</button>
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
                                )}
                              </div>
                            ))}
                            </div>
                          </>
                        )}
                    </div>
                  </div>
                  {/* Content for Maps tab */}
                  <div className={`photos-tab-content ${activeTab === 1 ? 'active' : ''}`}>
                    <div className="photos-container">
                      {/* Placeholder for Maps content */}
                      {/* Replace this with your Maps component */}
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </>
          )}
          <div style={{ height: '90vh',backgroundColor:'black' }}>
            {isCameraOpen && (
              <div style={{ height: '100vh', position: 'relative' }}>
                {capturedImage ? (
                  <div style={{ backgroundColor: 'black', color: 'white', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Lat : {lat} & Long : {lon}</p>
                    <h1>Captured Image</h1>
                    <img src={capturedImage} alt="Captured" style={{ maxHeight: '80%', maxWidth: '100%' }} />
                    <div style={{ height: '10%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                      <button className="retakeBtn" onClick={handleRetake} style={{ marginRight: '1rem' }}>
                        Retake
                      </button>
                      <button className="saveBtn" onClick={captureImage}>
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
                      <button
                        onClick={() => {
                          const imageSrc = webcamRef.current.getScreenshot();
                          setCapturedImage(imageSrc);
                        }}
                        style={{ backgroundColor: 'transparent', borderWidth: '0', marginRight: '1rem' }}
                      >
                        <FaCamera color="yellow" size={30} />
                      </button>
                      <button style={{ backgroundColor: 'transparent', borderWidth: '0' }} onClick={() => setIsCameraOpen(false)}>
                        <FaTimes color="#fff" size={30} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Selfie;
