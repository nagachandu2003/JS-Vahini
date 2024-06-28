import "./index.css"
import { useState, useEffect, forwardRef } from "react"
import Footer from "../../Footer"
import Cookies from 'js-cookie'
import { Link } from "react-router-dom"

  const Stats = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState([]);
    const campCluster = Cookies.get("campId");
    const email = Cookies.get("campuseremail");
    const [statsdetails, setStatsDetails] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
          setIsLoading(true)
          try{
            const options = {
                method :"POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({email,campCluster,date:(new Date()).toLocaleDateString('en-GB')})
            }
            const response = await fetch(`https://js-member-backend.vercel.app/gettodaystats`,options);
            const data = await response.json()
            setStatsDetails(data.detailedstats)
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
        <div style={{ backgroundColor: 'black', color: 'white' }} className="photos-upper-tabs-container">
                  <div
                    className={`photos-upper-tab ${activeTab === 0 ? 'active' : ''}`}
                    onClick={() => setActiveTab(0)}
                  >
                    Today
                  </div>
                  <div
                    className={`photos-upper-tab ${activeTab === 1 ? 'active' : ''}`}
                    onClick={() => setActiveTab(1)}
                  >
                    Overall
                  </div>
                </div>
        <div style={{marginBottom:'50px',marginTop:'30px'}} className="scrollable-container">
            <div className="d2d-container">
            {isLoading===false && (
                <>
                <div style={{margin:'10px'}} className={`photos-tab-content ${activeTab === 0 ? 'active' : ''}`}>
                  <div className="stats-section-container">
                    <div>
                    
                    <div style={{height:'100px'}} className="avg-cards2">
                    <h3 className="stats-section-heading2">Attendance</h3>
                        <h4>{statsdetails.attendancedetails}</h4>
                        {/* <h4>Morning : {(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Morning")).length===0?'Absent':'Present'}</h4>
                        <h4>Evening : {(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Evening")).length===0?'Absent':'Present'}</h4> */}
                    </div>


                    {/* <Link to="/attendancestats">
                    <button type="button">More</button>
                    </Link> */}
                    </div>
                    {/* <div style={{display:'flex',justifyContent:'space-evenly'}}>
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
                    </div> */}
                    </div>
                    <div className="stats-section-container">
                    <div>

                    <div style={{height:'100px'}} className="avg-cards2 gr-bg2">
                    <h3 className="stats-section-heading2">Attendance (Selfie)</h3>
                        <h4>Morning Selfie : {(statsdetails.morningattendanceselfiedetails)}</h4>
                        <h4>Evening Selfie : {(statsdetails.eveningattendanceselfiedetails)}</h4>
                    </div>
                    </div>
                    {/* <div style={{display:'flex',justifyContent:'space-evenly'}}>
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
                    </div> */}
                    </div>
                    <div className="stats-section-container">
                    <div>

                    <div style={{height:'100px'}} className="avg-cards2 gr-bg3">
                    <h3 style={{color:'black'}} className="stats-section-heading2">Household (Selfie)</h3>
                        <h4>Total Selfie : {statsdetails.householdselfiedetails}</h4>
                    </div>
                    </div>
                    {/* <div style={{display:'flex',justifyContent:'space-evenly'}}>
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
                    </div> */}
                    </div>
                    <div className="stats-section-container">
                    <div>

                    <div style={{height:'100px'}} className="avg-cards2 gr-bg4">
                    <h3 className="stats-section-heading2">Sansthapak Sadasya</h3>
                        <h4>Total SS Reported  : {statsdetails.ssdetails}</h4>
                        {/* <h4>No of Blocks : {(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Morning")).length===0?'Absent':'Present'}</h4>
                        <h4>No of Villages : {(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Evening")).length===0?'Absent':'Present'}</h4> */}
                    </div>
                    </div>

                    </div>
                    <div className="stats-section-container">
                    <div>

                    <div style={{height:'100px'}} className="avg-cards2 gr-bg1">
                    <h3 className="stats-section-heading2">Digital Influencer</h3>
                        <h4>Total Digital Influencers Reported : {statsdetails.didetails}</h4>
                        {/* <h4>Morning Selfie : {(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Morning")).length===0?'Absent':'Present'}</h4>
                        <h4>Evening Selfie : {(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Evening")).length===0?'Absent':'Present'}</h4> */}
                    </div>
                    </div>
                    </div>
                    <div className="stats-section-container">
                    <div className="stats-section-container">
                    <div>

                    <div style={{height:'100px'}} className="avg-cards2 gr-bg2">
                    <h3 className="stats-section-heading2">Coaching</h3>
                    <h4>Total Coaching Reported : {statsdetails.coachingdetails}</h4>
                    </div>
                    </div>
                    </div>
                    </div>
                    <div className="stats-section-container">
                    <div>

                    <div style={{height:'100px'}} className="avg-cards2 gr-bg3">
                    <h3 style={{color:'black'}} className="stats-section-heading2">SS Vitran</h3>
                    <h4>Total SS Vitran Reported : {statsdetails.ssvitrandetails}</h4>
                    </div>
                    </div>
                    </div>
                </div>
                <div style={{margin:'10px'}} className={`photos-tab-content ${activeTab === 1 ? 'active' : ''}`}>
                <div className="stats-section-container">
                  <div>
                  
                  <div className="avg-cards2">
                  <h3 className="stats-section-heading2">Attendance</h3>
                      <h4>Total Present : {0}</h4>
                      <h4>Daily Avg    : {0}</h4>
                      <h4>Weekly Avg    : {0}</h4>
                      <h4>Monthly Avg    : {0}</h4>
                      {/* <h4>Morning : {(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Morning")).length===0?'Absent':'Present'}</h4>
                      <h4>Evening : {(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Evening")).length===0?'Absent':'Present'}</h4> */}
                  </div>


                  {/* <Link to="/attendancestats">
                  <button type="button">More</button>
                  </Link> */}
                  </div>
                  {/* <div style={{display:'flex',justifyContent:'space-evenly'}}>
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
                  </div> */}
                  </div>
                  <div className="stats-section-container">
                  <div>

                  <div className="avg-cards2 gr-bg2">
                  <h3 className="stats-section-heading2">Attendance (Selfie)</h3>
                      <h4>Total Attendance Selfie : {0}</h4>
                      <h4>Daily Avg              : {0}</h4>
                      <h4>Weekly Avg             : {0}</h4>
                      <h4>Monthly Avg            : {0}</h4>
                      {/* <h4>Morning Selfie : {(statsdetails.morningattendanceselfiedetails)}</h4>
                      <h4>Evening Selfie : {(statsdetails.eveningattendanceselfiedetails)}</h4> */}
                  </div>
                  </div>
                  {/* <div style={{display:'flex',justifyContent:'space-evenly'}}>
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
                  </div> */}
                  </div>
                  <div className="stats-section-container">
                  <div>

                  <div className="avg-cards2 gr-bg3">
                  <h3 style={{color:'black'}} className="stats-section-heading2">Household (Selfie)</h3>
                      <h4>Total Selfie : {0}</h4>
                      <h4>Daily Avg              : {0}</h4>
                      <h4>Weekly Avg             : {0}</h4>
                      <h4>Monthly Avg            : {0}</h4>
                  </div>
                  </div>
                  {/* <div style={{display:'flex',justifyContent:'space-evenly'}}>
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
                  </div> */}
                  </div>
                  <div className="stats-section-container">
                  <div>

                  <div className="avg-cards2 gr-bg4">
                  <h3 className="stats-section-heading2">Sansthapak Sadasya</h3>
                      <h4>Total SS Reported  : {6}</h4>
                      <h4>Daily Avg              : {0}</h4>
                      <h4>Weekly Avg             : {0}</h4>
                      <h4>Monthly Avg            : {0}</h4>
                      {/* <h4>No of Blocks : {(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Morning")).length===0?'Absent':'Present'}</h4>
                      <h4>No of Villages : {(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Evening")).length===0?'Absent':'Present'}</h4> */}
                  </div>
                  </div>

                  </div>
                  <div className="stats-section-container">
                  <div>

                  <div className="avg-cards2 gr-bg1">
                  <h3 className="stats-section-heading2">Digital Influencer</h3>
                      <h4>Total Digital Influencers Reported : {0}</h4>
                      <h4>Daily Avg              : {0}</h4>
                      <h4>Weekly Avg             : {0}</h4>
                      <h4>Monthly Avg            : {0}</h4>
                      {/* <h4>Morning Selfie : {(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Morning")).length===0?'Absent':'Present'}</h4>
                      <h4>Evening Selfie : {(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Evening")).length===0?'Absent':'Present'}</h4> */}
                  </div>
                  </div>
                  </div>
                  <div className="stats-section-container">
                  <div className="stats-section-container">
                  <div>

                  <div className="avg-cards2 gr-bg2">
                  <h3 className="stats-section-heading2">Coaching</h3>
                  <h4>Total Coaching Reported : {0}</h4>
                  <h4>Daily Avg              : {0}</h4>
                  <h4>Weekly Avg             : {0}</h4>
                  <h4>Monthly Avg            : {0}</h4>
                  </div>
                  </div>
                  </div>
                  </div>
                  <div className="stats-section-container">
                  <div>

                  <div className="avg-cards2 gr-bg3">
                  <h3 style={{color:'black'}} className="stats-section-heading2">SS Vitran</h3>
                  <h4>Total SS Vitran Reported : {0}</h4>
                  <h4>Daily Avg              : {0}</h4>
                  <h4>Weekly Avg             : {0}</h4>
                  <h4>Monthly Avg            : {0}</h4>
                  </div>
                  </div>
                  </div>
              </div>
              </>
                )}
            </div>
        </div>  
        </div>
        <Footer/>
    </>
    )
}

export default Stats