import "./index.css"
import { useState, useEffect } from "react"
import Footer from "../../Footer"
import Cookies from 'js-cookie'


const Stats = () => {
    const [startDate,setStartDate] = useState((new Date()));
    const [endDate,setEndDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        return date;
    });
    const [dailyavg, setDailyAvg] = useState(0);
    const [weeklyavg, setWeeklyAvg] = useState(0);
    const [monthlyavg, setMonthlyAvg] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const campCluster = Cookies.get("campId");
    const [attendancedata, setAttendanceData] = useState([]);

    useEffect(() => {
      const getVideos = async () => {
        setIsLoading(true)
        try{
          const response = await fetch(`https://js-member-backend.vercel.app/getattendanceadmin/${campCluster}`);
              const data = await response.json()
              console.log(data) 
              setAttendanceData(data.AttendanceList)
              // setUsers(data)
              setIsLoading(false)
        }
        catch(Err){
          console.log(`Error Occurred : ${Err}`);
        }
      };
  
      // Call getVideos only once on mount
      getVideos();
    }, []); // Empty dependency array means it runs only once on mount

    console.log(attendancedata)


    const onChangeStartDate = (event) => {
        setStartDate(event.target.value)
    }

    const onChangeEndDate = (event) => {
        setEndDate(event.target.value)
    }

    return (
        <>
        <div style={{backgroundColor:'black'}}>
        <div className='main-header-container'>
            <h1 className='main-d2d'>Attendance Stats</h1>
        </div>
        <div className="scrollable-container">
            {isLoading===false && (
            <div className="d2d-container">
                <div style={{width:'100%'}}>
                    <input className="datefilter" type="date" onChange={onChangeStartDate}/>
                    <input className="datefilter" type="date" onChange={onChangeEndDate}/>
                </div>
                <div className="stats-section-container">
                    <h2 className="stats-section-heading">Numbers</h2>
                    <div style={{display:'flex',justifyContent:'space-evenly'}}>
                    <div className="avg-cards">
                        <h3>{dailyavg}</h3>
                        <p>Daily Avg</p>
                    </div>
                    <div className="avg-cards">
                        <h3>{weeklyavg}</h3>
                        <p>Weekly Avg</p>
                    </div>
                    <div className="avg-cards">
                        <h3>{monthlyavg}</h3>
                        <p>Monthly Avg</p>
                    </div>
                    </div>
                </div>
                <div className="stats-section-container">
                    <h2 className="stats-section-heading">Table</h2>
                    <table>
                <thead>
                    <tr>
                    <th>S.NO.</th>
                    <th>Date</th>
                    <th>Present</th>
                    <th>Absent</th>
                    </tr>
                </thead>
                <tbody>
                    {attendancedata.map((ele,index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{ele.date}</td>
                            <td>{ele.present}</td>
                            <td>{ele.absent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
                </div>
            </div>
            )}
        </div>  
        </div>
        <Footer/>
    </>
    )
}

export default Stats