import "./index.css"
import { useState, useEffect, forwardRef } from "react"
import Footer from "../../Footer"
import Cookies from 'js-cookie'

  const Stats = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState([]);
    const campCluster = Cookies.get("campId");
    const email = Cookies.get("useremail");

    useEffect(() => {
      const getAttendanceData = async () => {
        setIsLoading(true);
        try {
          const response1 = await fetch(`https://js-member-backend.vercel.app/campusers`);
          const response2 = await fetch(`https://js-member-backend.vercel.app/getattendanceadmin`);

          const data2 = await response2.json();
          const data1 = await response1.json();
          // console.log(data1)
          const filteredList1 = data1.filter((ele) => (ele.regstatus === "approved" && ele.campCluster === campCluster && ele.person==="member" && ele.email===email));
          console.log(filteredList1)
          let totpresent = 0, totabsent = 0;
          const {AttendanceList} = data1
          // AttendanceList.forEach((ele) => {
          //   if(ele.attendace)
          // })
          // setUserDetails(filteredList1)
          setIsLoading(false);
        } catch (err) {
          console.log(`Error Occurred : ${err}`);
          setIsLoading(false);
        }
      };
    
      getAttendanceData();
    }, [campCluster]);




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
                    <h2 className="stats-section-heading">Attendance</h2>
                    <div style={{display:'flex',justifyContent:'space-evenly'}}>
                    <div className="avg-cards">
                        <h1 style={{color:'blue'}}>{0}</h1>
                        <p style={{fontSize:'12px'}}>Joining Date</p>
                    </div>
                    <div className="avg-cards">
                        <h1 style={{color:'green'}}>{0}</h1>
                        <p style={{fontSize:'12px'}}>Total Present</p>
                    </div>
                    <div className="avg-cards">
                        <h1 style={{color:'red'}}>{0}</h1>
                        <p style={{fontSize:'13px'}}>Total Absent</p>
                    </div>
                    </div>
                    </div>
                    <div className="stats-section-container">
                    <h2 className="stats-section-heading">Household (Selfie)</h2>
                    <div style={{display:'flex',justifyContent:'space-evenly'}}>
                    <div className="avg-cards">
                        <h1 style={{color:'blue'}}>0</h1>
                        <p style={{fontSize:'12px'}}>Daily Avg.</p>
                    </div>
                    <div className="avg-cards">
                        <h1 style={{color:'green'}}>0</h1>
                        <p style={{fontSize:'12px'}}>Weekly Avg.</p>
                    </div>
                    <div className="avg-cards">
                        <h1 style={{color:'red'}}>0</h1>
                        <p style={{fontSize:'13px'}}>Monthly Avg.</p>
                    </div>
                    </div>
                    </div>
                    <div className="stats-section-container">
                    <h2 className="stats-section-heading">Sansthapak Sadasya</h2>
                    <div style={{display:'flex',justifyContent:'space-evenly'}}>
                    <div className="avg-cards">
                        <h1 style={{color:'blue'}}>{0}</h1>
                        <p style={{fontSize:'12px'}}>Daily Avg.</p>
                    </div>
                    <div className="avg-cards">
                        <h1 style={{color:'green'}}>{0}</h1>
                        <p style={{fontSize:'12px'}}>Weekly Avg.</p>
                    </div>
                    <div className="avg-cards">
                        <h1 style={{color:'red'}}>{0}</h1>
                        <p style={{fontSize:'13px'}}>Monthly Avg.</p>
                    </div>
                    </div>
                    </div>
                    <div className="stats-section-container">
                    <h2 className="stats-section-heading">Digital Influencer</h2>
                    <div style={{display:'flex',justifyContent:'space-evenly'}}>
                    <div className="avg-cards">
                        <h1 style={{color:'blue'}}>{0}</h1>
                        <p style={{fontSize:'12px'}}>Daily Avg.</p>
                    </div>
                    <div className="avg-cards">
                        <h1 style={{color:'green'}}>{0}</h1>
                        <p style={{fontSize:'12px'}}>Weekly Avg.</p>
                    </div>
                    <div className="avg-cards">
                        <h1 style={{color:'red'}}>{0}</h1>
                        <p style={{fontSize:'13px'}}>Monthly Avg.</p>
                    </div>
                    </div>
                    </div>
                    <div className="stats-section-container">
                    <h2 className="stats-section-heading">Coaching</h2>
                    <div style={{display:'flex',justifyContent:'space-evenly'}}>
                    <div className="avg-cards">
                        <h1 style={{color:'blue'}}>{0}</h1>
                        <p style={{fontSize:'12px'}}>Daily Avg.</p>
                    </div>
                    <div className="avg-cards">
                        <h1 style={{color:'green'}}>{0}</h1>
                        <p style={{fontSize:'12px'}}>Weekly Avg.</p>
                    </div>
                    <div className="avg-cards">
                        <h1 style={{color:'red'}}>{0}</h1>
                        <p style={{fontSize:'13px'}}>Monthly Avg.</p>
                    </div>
                    </div>
                    </div>
                    <div className="stats-section-container">
                    <h2 className="stats-section-heading">SS Vitran</h2>
                    <div style={{display:'flex',justifyContent:'space-evenly'}}>
                    <div className="avg-cards">
                        <h1 style={{color:'blue'}}>{0}</h1>
                        <p style={{fontSize:'12px'}}>Daily Avg.</p>
                    </div>
                    <div className="avg-cards">
                        <h1 style={{color:'green'}}>{0}</h1>
                        <p style={{fontSize:'12px'}}>Weekly Avg.</p>
                    </div>
                    <div className="avg-cards">
                        <h1 style={{color:'red'}}>{0}</h1>
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