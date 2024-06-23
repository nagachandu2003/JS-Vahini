import "./index.css"
import { useState, useEffect, forwardRef } from "react"
import Footer from "../../Footer"
import Cookies from 'js-cookie'
import { Link } from "react-router-dom"

  const Stats = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState([]);
    const campCluster = Cookies.get("campId");
    const email = Cookies.get("campuseremail");
    const [attendancedata, setAttendanceData] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
          setIsLoading(true)
          try{
            const response = await fetch(`https://js-member-backend.vercel.app/getattendanceselfiedata/${campCluster}`);
            const data = await response.json()
            const filteredList = (data.result).filter((ele) => (ele.campCluster===campCluster && ele.email===email))
            setAttendanceData(filteredList)
            // console.log(filteredMembers)
            // setMembers(filteredMembers)
            // setUsers(filteredTeams)
            setIsLoading(false)
                // console.log(data);
          }
          catch(Err){
            console.log(`Error Occurred : ${Err}`);
          }
        };
    
        // Call getVideos only once on mount
        getVideos();
      }, []); 

      


    return (
        <>
        <div style={{backgroundColor:'black'}}>
        <div className='main-header-container'>
            <h1 className='main-d2d'>Stats</h1>
        </div>
        <div style={{marginBottom:'50px'}} className="scrollable-container">
            <div className="d2d-container">
            {isLoading===false && (
                <div style={{margin:'10px'}}>
                  <div className="stats-section-container">
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <h3 className="stats-section-heading2">Attendance</h3>
                    <Link to="/attendancestats">
                    {/* <button type="button">More</button> */}
                    </Link>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-evenly'}}>
                    <div className="avg-cards-daily-avg avg-cards2">
                        <h2 style={{color:'blue'}}>{(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).replace(/(\d+)\s(\w+)/, '$2 $1'))}</h2>
                        <p style={{fontSize:'12px'}}>Today's Date</p>
                        
                    </div>
                    <div className="avg-cards-weekly-avg avg-cards2">
                    
                        <h2 style={{color:'green'}}>{(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Morning")).length===0?'_':'M'}/{(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Evening")).length===0?'_':'E'}</h2>
                        <p style={{fontSize:'12px'}}>Present</p>
                        
                    </div>
                    <div className="avg-cards-monthly-avg avg-cards2">
                    
                        <h2 style={{color:'red'}}>{(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Morning")).length===0?'M':'_'}/{(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Evening")).length===0?'E':'_'}</h2>
                        <p style={{fontSize:'13px'}}>Absent</p>

                    </div>
                    </div>
                    </div>
                    <div className="stats-section-container">
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <h3 className="stats-section-heading2">Household (Selfie)</h3>
                    <Link to="/selfiestats">
                    {/* <button type="button">More</button> */}
                    </Link>
                    </div>

                    <div style={{display:'flex',justifyContent:'space-evenly'}}>
                    <div className="avg-cards2">
                        <h2 style={{color:'blue'}}>5.5</h2>
                        <p style={{fontSize:'12px'}}>Daily Avg.</p>
                    </div>
                    <div className="avg-cards2">
                        <h2 style={{color:'green'}}>2.15</h2>
                        <p style={{fontSize:'12px'}}>Weekly Avg.</p>
                    </div>
                    <div className="avg-cards2">
                        <h2 style={{color:'red'}}>1.5</h2>
                        <p style={{fontSize:'13px'}}>Monthly Avg.</p>
                    </div>
                    </div>
                    </div>
                    <div className="stats-section-container">
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <h3 className="stats-section-heading2">Sansthapak Sadasya</h3>
                    {/* <Link to="/attendancestats"> */}
                    {/* <button type="button">More</button> */}
                    {/* </Link> */}
                    </div>

                    <div style={{display:'flex',justifyContent:'space-evenly'}}>
                    <div className="avg-cards2">
                        <h2 style={{color:'blue'}}>{6.5}</h2>
                        <p style={{fontSize:'12px'}}>Daily Avg.</p>
                    </div>
                    <div className="avg-cards2">
                        <h2 style={{color:'green'}}>{2.2}</h2>
                        <p style={{fontSize:'12px'}}>Weekly Avg.</p>
                    </div>
                    <div className="avg-cards2">
                        <h2 style={{color:'red'}}>{1.6}</h2>
                        <p style={{fontSize:'13px'}}>Monthly Avg.</p>
                    </div>
                    </div>
                    </div>
                    <div className="stats-section-container">
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <h3 className="stats-section-heading2">Digital Influencer</h3>
                    {/* <Link to="/attendancestats"> */}
                    {/* <button type="button">More</button> */}
                    {/* </Link> */}
                    </div>    

                    <div style={{display:'flex',justifyContent:'space-evenly'}}>
                    <div className="avg-cards2">
                        <h2 style={{color:'blue'}}>{6.6}</h2>
                        <p style={{fontSize:'12px'}}>Daily Avg.</p>
                    </div>
                    <div className="avg-cards2">
                        <h2 style={{color:'green'}}>{2.3}</h2>
                        <p style={{fontSize:'12px'}}>Weekly Avg.</p>
                    </div>
                    <div className="avg-cards2">
                        <h2 style={{color:'red'}}>{1.7}</h2>
                        <p style={{fontSize:'13px'}}>Monthly Avg.</p>
                    </div>
                    </div>
                    </div>
                    <div className="stats-section-container">
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <h3 className="stats-section-heading2">Coaching</h3>
                    {/* <Link to="/attendancestats"> */}
                    {/* <button type="button">More</button> */}
                    {/* </Link> */}
                    </div>

                    <div style={{display:'flex',justifyContent:'space-evenly'}}>
                    <div className="avg-cards2">
                        <h2 style={{color:'blue'}}>{6.7}</h2>
                        <p style={{fontSize:'12px'}}>Daily Avg.</p>
                    </div>
                    <div className="avg-cards2">
                        <h2 style={{color:'green'}}>{2.4}</h2>
                        <p style={{fontSize:'12px'}}>Weekly Avg.</p>
                    </div>
                    <div className="avg-cards2">
                        <h2 style={{color:'red'}}>{1.8}</h2>
                        <p style={{fontSize:'13px'}}>Monthly Avg.</p>
                    </div>
                    </div>
                    </div>
                    <div className="stats-section-container">
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <h3 className="stats-section-heading2">SS Vitran</h3>
                    {/* <Link to="/attendancestats"> */}
                    {/* <button type="button">More</button> */}
                    {/* </Link> */}
                    </div>
                    <div style={{display:'flex',justifyContent:'space-evenly'}}>
                    <div className="avg-cards2">
                        <h2 style={{color:'blue'}}>{6.8}</h2>
                        <p style={{fontSize:'12px'}}>Daily Avg.</p>
                    </div>
                    <div className="avg-cards2">
                        <h2 style={{color:'green'}}>{2.5}</h2>
                        <p style={{fontSize:'12px'}}>Weekly Avg.</p>
                    </div>
                    <div className="avg-cards2">
                        <h2 style={{color:'red'}}>{1.9}</h2>
                        <p style={{fontSize:'13px'}}>Monthly Avg.</p>
                    </div>
                    </div>
                    </div>
                    
                    
                </div>
                )}
            </div>
        </div>  
        </div>
        <Footer/>
    </>
    )
}

export default Stats