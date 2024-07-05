import "./index.css"
import { useState, useEffect, forwardRef } from "react"
import Footer from "../Footer"
import Cookies from 'js-cookie'
import { Link } from "react-router-dom"

  const D2DInchargeStats = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState([]);
    const campCluster = Cookies.get("campId");
    const email = Cookies.get("campuseremail");
    const [d2dstatsdetails, setStatsDetails] = useState([]);
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
            const response = await fetch(`http://localhost:3001/gettodayd2dstats`,options);
            const data = await response.json()
            setStatsDetails(data.details)
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
    
      console.log(d2dstatsdetails)


    return (
        <>
        <div style={{backgroundColor:'black'}}>
        <div className='main-header-container'>
            <h1 className='main-d2d'>D2D Stats</h1>
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
        <div style={{marginBottom:'50px',marginTop:'50px'}} className="scrollable-container">
            <div className="d2d-container">
            {isLoading===false && (
                <>
                <div style={{margin:'10px'}} className={`photos-tab-content ${activeTab === 0 ? 'active' : ''}`}>
                    {d2dstatsdetails.length!==0 && (
                        d2dstatsdetails.map((ele,index) => (
                            <div key={index} style={{color:'white'}}>
                                <div className="d2dstats-card gr-bg1">
                                    <h3>Team Lead : {ele.teamlead}</h3>
                                    <h3>Date : {(new Date(ele.d2ddate)).toLocaleDateString('en-GB')}</h3>
                                    <h3>District : {ele.district}</h3>
                                    <h3>Block : {ele.block}</h3>
                                </div>
                                <div className="d2dstats-card gr-bg3">
                                    <div>
                                    <h2>Village Analysis</h2>
                                    <div className="d2dstats-card gr-bg4">
                                    <h3>Village 1</h3>
                                        <h3>Panchayat1 : {ele.villageanalysis.panchayat1}</h3>
                                        <h3>Village1 Name : {ele.villageanalysis.nameofvillage1} </h3>
                                        </div>
                                        <div className="d2dstatsflexcard d2dstats-card gr-bg2">
                                            <h3>Total Households Covered</h3>
                                            <h1>{ele.villageanalysis.totalhouseholdscovered1}</h1>
                                        </div>
                                        <div className="d2dstatsflexcard d2dstats-card gr-bg2">
                                            <h3>Total Sansthapak Sadasya Made</h3>
                                            <h1>{ele.villageanalysis.totalssmade1}</h1>
                                        </div>
                                        <div className="d2dstatsflexcard d2dstats-card gr-bg2">
                                            <h3>Social Media Influencers Onboarded</h3>
                                            <h1>{ele.villageanalysis.socialmediainfluencersonboarded1}</h1>
                                        </div>
                                        <div className="d2dstatsflexcard d2dstats-card gr-bg2">
                                            <h3>Whatsapp Joined</h3>
                                            <h1>{ele.villageanalysis.whatsappjoined1}</h1>
                                        </div>
                                        <div className="d2dstatsflexcard d2dstats-card gr-bg2">
                                            <h3>Is Village Completed?</h3>
                                            <h3>{ele.villageanalysis.villagecompleted1}</h3>
                                        </div>
                                    </div>
                                    <div className="d2dstats-card gr-bg4">
                                        <h3>Village 2</h3>
                                        <h3>Panchayat1 : {ele.villageanalysis.panchayat2}</h3>
                                        <h3>Village1 Name : {ele.villageanalysis.nameofvillage2} </h3>
                                        </div>
                                        <div>
                                        <div className="d2dstatsflexcard d2dstats-card gr-bg2">
                                            <h3>Total Households Covered</h3>
                                            <h1>{ele.villageanalysis.totalhouseholdscovered2}</h1>
                                        </div>
                                        <div className="d2dstatsflexcard d2dstats-card gr-bg2">
                                            <h3>Total Sansthapak Sadasya Made</h3>
                                            <h1>{ele.villageanalysis.totalssmade2}</h1>
                                        </div>
                                        <div className="d2dstatsflexcard d2dstats-card gr-bg2">
                                            <h3>Social Media Influencers Onboarded</h3>
                                            <h1>{ele.villageanalysis.socialmediainfluencersonboarded2}</h1>
                                        </div>
                                        <div className="d2dstatsflexcard d2dstats-card gr-bg2">
                                            <h3>Whatsapp Joined</h3>
                                            <h1>{ele.villageanalysis.whatsappjoined2}</h1>
                                        </div>
                                        <div className="d2dstatsflexcard d2dstats-card gr-bg2">
                                            <h3>Is Village Completed?</h3>
                                            <h3>{ele.villageanalysis.villagecompleted2}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div style={{margin:'10px'}} className={`photos-tab-content ${activeTab === 1 ? 'active' : ''}`}>
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

export default D2DInchargeStats