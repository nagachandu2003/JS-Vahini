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
    const [endDate,setEndDate] = useState((new Date()).toISOString().split('T')[0]);
    const [startDate,setStartDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        return date.toISOString().split('T')[0];
    });
    const [overalluserDetails, setOverAllUserDetails] = useState([]);

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


      useEffect(() => {
        const getVideos = async () => {
          setIsLoading(true)
          try{
            const options = {
                method :"POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({email,campCluster,startDate,endDate})
            }
            const response = await fetch(`https://js-member-backend.vercel.app/getoverallstats`,options);
            const data = await response.json()
            console.log(data)
            setOverAllUserDetails(data.detailedstats)
            setIsLoading(false)
                // console.log(data);
          }
          catch(Err){
            console.log(`Error Occurred : ${Err}`);
          }
        };
    
        // Call getVideos only once on mount
        getVideos();
      }, [startDate,endDate]); 

      


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
                    
                    <div style={{height:'100px',color:'black',display:'flex',justifyContent:'space-between'}} className="avg-cards2">
                        <div>
                    <h3 style={{color:'black'}} className="stats-section-heading2">Attendance</h3>
                        <h4>{statsdetails.attendancedetails}</h4>
                        </div>
                        <h1 className="number-size">{statsdetails.attendancedetails==="Absent"?0:1}</h1>
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

                    <div style={{height:'100px',display:'flex',justifyContent:'space-between'}} className="avg-cards2 gr-bg2">
                    <div>
                    <h3 className="stats-section-heading2">Attendance (Selfie)</h3>
                        <h4>Morning : {(statsdetails.morningattendanceselfiedetails)}</h4>
                        <h4>Evening : {(statsdetails.eveningattendanceselfiedetails)}</h4>
                    </div>
                        <h1 className="number-size">{(statsdetails.morningattendanceselfiedetails)==="Absent"?0:1}{(statsdetails.eveningattendanceselfiedetails)==="Absent"?0:1}</h1>
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

                    <div style={{height:'100px',display:'flex',justifyContent:'space-between'}} className="avg-cards2 gr-bg3">
                        <div>
                    <h3 style={{color:'black'}} className="stats-section-heading2">Household (Selfie)</h3>
                        <h4>Total Selfie :</h4>
                        </div>
                        <h1 className="number-size">25</h1>
                        {/* <h1 className="number-size">{statsdetails.householdselfiedetails}</h1> */}
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

                    <div style={{height:'100px',display:'flex',justifyContent:'space-between'}} className="avg-cards2 gr-bg4">
                        <div>
                    <h3 className="stats-section-heading2">Sansthapak Sadasya</h3>
                        <h4>Total SS Reported  : </h4>
                        </div>
                        <h1 className="number-size">37</h1>
                        {/* <h1 className="number-size">{statsdetails.ssdetails}</h1> */}
                        {/* <h4>No of Blocks : {(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Morning")).length===0?'Absent':'Present'}</h4>
                        <h4>No of Villages : {(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Evening")).length===0?'Absent':'Present'}</h4> */}
                    </div>
                    </div>

                    </div>
                    <div className="stats-section-container">
                    <div>

                    <div style={{height:'100px',display:'flex',justifyContent:'space-between'}} className="avg-cards2 gr-bg1">
                        <div>
                    <h3 className="stats-section-heading2">Digital Influencer</h3>
                        <h4>Total DI Reported : </h4>
                        </div>
                        <h1 className="number-size">58</h1>
                        {/* <h1 className="number-size">{statsdetails.didetails}</h1> */}
                        {/* <h4>Morning Selfie : {(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Morning")).length===0?'Absent':'Present'}</h4>
                        <h4>Evening Selfie : {(attendancedata.filter((ele) => ele.date===(new Date()).toLocaleDateString('en-GB') && ele.period==="Evening")).length===0?'Absent':'Present'}</h4> */}
                    </div>
                    </div>
                    </div>
                    <div className="stats-section-container">
                    <div className="stats-section-container">
                    <div>

                    <div style={{height:'100px',display:'flex',justifyContent:'space-between'}} className="avg-cards2 gr-bg2">
                        <div>
                    <h3 className="stats-section-heading2">Coaching</h3>
                    <h4>Total Coaching Reported : </h4>
                    </div>
                    <h1 className="number-size">89</h1>
                    {/* <h1 className="number-size">{statsdetails.coachingdetails}</h1> */}
                    </div>
                    </div>
                    </div>
                    </div>
                    <div className="stats-section-container">
                    <div>

                    <div style={{height:'100px',display:'flex',justifyContent:'space-between'}} className="avg-cards2 gr-bg3">
                        <div>
                    <h3 style={{color:'black'}} className="stats-section-heading2">SS Vitran</h3>
                    <h4>Total SS Vitran Reported : </h4>
                    </div>
                    <h1 className="number-size">86</h1>
                    {/* <h1 className="number-size">{statsdetails.ssvitrandetails}</h1> */}
                    </div>
                    </div>
                    </div>
                </div>
                <div style={{margin:'10px'}} className={`photos-tab-content ${activeTab === 1 ? 'active' : ''}`}>
                <div className="stats-section-container">
                  <div>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <div style={{color:'white',width:'50%',textAlign:'center'}}>
                            <h3>Date</h3>
                            <h4>{(new Date(startDate)).toLocaleDateString('en-GB')}</h4>
                            <h4>{(new Date(endDate)).toLocaleDateString('en-GB')}</h4>
                        </div>
                        <div style={{width:'50%',textAlign:'center'}}>
                            <h3 style={{color:'white'}}>Date Filter</h3>
                    <div className="date-input-container">
                    <i className="fas fa-calendar-alt icon"></i>
                    <input style={{border:'none',outline:'none'}} type="date" onChange={(e) => setStartDate(e.target.value)} value={startDate}/>
                    </div>
                    <div className="date-input-container">
                        <i className="fas fa-clock icon"></i>
                        <input style={{border:'none',outline:'none'}} type="date" onChange={(e) => setEndDate(e.target.value)} value={endDate}/>
                    </div>
                    </div>
                    </div>
                  <div style={{display:'flex',justifyContent:'space-between',marginTop:'15px'}} className="avg-cards2">
                <div>
                  <h3 className="stats-section-heading2">Attendance</h3>
                  <h4>Total</h4>
                  </div>
                  <h1 className="number-size">{overalluserDetails.attendancedetails}</h1>
                  {/* <h3>{(new Date().toLocaleString('default',{month:'long'}))}</h3> */}
                      {/* <h4>Total Present : {0}</h4> */}
                      {/* <h4>Daily Avg    : {0}</h4>
                      <h4>Weekly Avg    : {0}</h4>
                      <h4>Monthly Avg    : {0}</h4> */}
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
                  <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
                    <div>
                        <h1 className="number-size">{overalluserDetails.morningattendanceselfiedetails}</h1>
                        <p>Morning</p>
                    </div>
                    <div>
                        <h1 className="number-size">{overalluserDetails.eveningattendanceselfiedetails}</h1>
                        <p>Evening</p>
                    </div>
                  </div>
                      {/* <h4>Total Attendance Selfie : {0}</h4> */}
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
                  <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                    <div>
                        <h1 className="number-size">{overalluserDetails.householdselfiedetails}</h1>
                        <p>Total</p>
                        <p>Selfie</p>
                    </div>
                    <div>
                        <h1 className="number-size">20</h1>
                        <p>Daily</p>
                        <p>Avg</p>
                    </div>
                    <div>
                        <h1 className="number-size">66</h1>
                        <p>Weekly</p>
                        <p>Avg</p>
                    </div>
                    <div>
                        <h1 className="number-size">28</h1>
                        <p>Monthly</p>
                        <p>Avg</p>
                    </div>
                  </div>
                      {/* <h4>Total Selfie : {0}</h4>
                      <h4>Daily Avg              : {0}</h4>
                      <h4>Weekly Avg             : {0}</h4>
                      <h4>Monthly Avg            : {0}</h4> */}
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
                  <h3 style={{color:'white'}} className="stats-section-heading2">Sansthapak Sadasya</h3>
                  <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                    <div>
                        <h1 className="number-size">{overalluserDetails.ssdetails}</h1>
                        <p>Total</p>
                        <p>SS</p>
                    </div>
                    <div>
                        <h1 className="number-size">44</h1>
                        <p>Daily</p>
                        <p>Avg</p>
                    </div>
                    <div>
                        <h1 className="number-size">66</h1>
                        <p>Weekly</p>
                        <p>Avg</p>
                    </div>
                    <div>
                        <h1 className="number-size">28</h1>
                        <p>Monthly</p>
                        <p>Avg</p>
                    </div>
                  </div>
                  </div>

                  </div>
                  </div>
                  <div className="stats-section-container">
                  <div>

                  <div className="avg-cards2 gr-bg1">
                  <h3 style={{color:'white'}} className="stats-section-heading2">Digital Influencer</h3>
                  <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                    <div>
                        <h1 className="number-size">{overalluserDetails.didetails}</h1>
                        <p>Total</p>
                        <p>DI</p>
                    </div>
                    <div>
                        <h1 className="number-size">44</h1>
                        <p>Daily</p>
                        <p>Avg</p>
                    </div>
                    <div>
                        <h1 className="number-size">66</h1>
                        <p>Weekly</p>
                        <p>Avg</p>
                    </div>
                    <div>
                        <h1 className="number-size">28</h1>
                        <p>Monthly</p>
                        <p>Avg</p>
                    </div>
                  </div>
                  </div>
                  </div>
                  </div>

                  <div className="stats-section-container">
                  <div>

                  <div className="avg-cards2 gr-bg2">
                  <h3 style={{color:'white'}} className="stats-section-heading2">Coaching</h3>
                  <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                    <div>
                        <h1 className="number-size">{overalluserDetails.coachingdetails}</h1>
                        <p>Total</p>
                        <p>Coaching</p>
                    </div>
                    <div>
                        <h1 className="number-size">44</h1>
                        <p>Daily</p>
                        <p>Avg</p>
                    </div>
                    <div>
                        <h1 className="number-size">66</h1>
                        <p>Weekly</p>
                        <p>Avg</p>
                    </div>
                    <div>
                        <h1 className="number-size">28</h1>
                        <p>Monthly</p>
                        <p>Avg</p>
                    </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  <div className="stats-section-container">

                  <div className="avg-cards2 gr-bg3">
                  <h3 style={{color:'black'}} className="stats-section-heading2">SS Vitran</h3>
                  <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                    <div>
                        <h1 className="number-size">{overalluserDetails.ssvitrandetails}</h1>
                        <p>Total</p>
                        <p>SS Vitran</p>
                    </div>
                    <div>
                        <h1 className="number-size">44</h1>
                        <p>Daily</p>
                        <p>Avg</p>
                    </div>
                    <div>
                        <h1 className="number-size">66</h1>
                        <p>Weekly</p>
                        <p>Avg</p>
                    </div>
                    <div>
                        <h1 className="number-size">28</h1>
                        <p>Monthly</p>
                        <p>Avg</p>
                    </div>
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