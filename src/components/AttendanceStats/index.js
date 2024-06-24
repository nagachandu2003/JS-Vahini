import "./index.css"
import { useState, useEffect, forwardRef } from "react"
import Footer from "../Footer"
import Cookies from 'js-cookie'
import { Bar,Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale,PointElement, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);
const BarChart = ({ data }) => {
    const processedData = processData(data);
  
    const chartData = {
      labels: processedData.map(item => item.date),
      datasets: [
        {
          label: 'Present',
          data: processedData.map(item => item.present),
          backgroundColor: 'rgba(40, 167, 69, 0.7)',
          color:'white' // Green color
        },
        {
          label: 'Absent',
          data: processedData.map(item => item.absent),
          backgroundColor: 'rgba(220, 53, 69, 0.7)',
          color:'white' // Red color
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Attendance Chart',
        },
      },
    };
  
    return <Bar data={chartData} options={options} />;
  };

  const LineChart = ({ data }) => {
    const processedData = processData(data);
  
    const chartData = {
      labels: processedData.map(item => item.date),
      datasets: [
        {
          label: 'Present',
          data: processedData.map(item => item.present),
          borderColor: 'rgba(40, 167, 69, 0.7)', // Green color
          backgroundColor: 'rgba(40, 167, 69, 0.2)', // Light green background
          fill: true,
        },
        {
          label: 'Absent',
          data: processedData.map(item => item.absent),
          borderColor: 'rgba(220, 53, 69, 0.7)', // Red color
          backgroundColor: 'rgba(220, 53, 69, 0.2)', // Light red background
          fill: true,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Attendance Line Chart',
        },
      },
    };
  
    return <Line data={chartData} options={options} />;
  };
  
  
  const processData = (data) => {
    return data.map(item => ({
      date: item.attendanceDate,
      present: item.present,
      absent: item.absent,
    }));
  };

  const AttendanceStats = () => {
    const [endDate,setEndDate] = useState((new Date()).toISOString().split('T')[0]);
    const [startDate,setStartDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        return date.toISOString().split('T')[0];
    });
    const [dailyavg, setDailyAvg] = useState(0);
    const [weeklyavg, setWeeklyAvg] = useState(0);
    const [monthlyavg, setMonthlyAvg] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const campCluster = Cookies.get("campId");
    const [attendancedata, setAttendanceData] = useState([]);
    const [filtereddata, setFilteredData] = useState([]);
    const rowsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);

    const startIdx = currentPage * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;

    console.log(startDate)
    console.log(endDate)

    useEffect(() => {
        const getAttendanceData = async () => {
          setIsLoading(true);
          try {
            const response = await fetch(`https://js-member-backend.vercel.app/getattendanceadmin/${campCluster}`);
            const data = await response.json();
            const { AttendanceList } = data;
            
            // Sort the AttendanceList based on attendanceDate in descending order
            AttendanceList.sort((a, b) => {
              const dateA = new Date(a.attendanceDate.split('/').reverse().join('-'));
              const dateB = new Date(b.attendanceDate.split('/').reverse().join('-'));
              return dateB - dateA;
            });
      
            setAttendanceData(AttendanceList);
            filterAttendanceData(AttendanceList, startDate, endDate);
            setIsLoading(false);
          } catch (err) {
            console.log(`Error Occurred : ${err}`);
            setIsLoading(false);
          }
        };
      
        getAttendanceData();
      }, [campCluster, startDate, endDate]);
      
      const filterAttendanceData = (data, start, end) => {
        const sd = new Date(start);
        sd.setHours(0, 0, 0, 0);
        const ed = new Date(end);
        ed.setHours(23, 59, 59, 999); // Set time to end of day for accurate comparison

        const filteredData = data.filter((ele) => {
          const [day, month, year] = ele.attendanceDate.split('/');
          const dateObject = new Date(year, month - 1, day);
          dateObject.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
          
          
          return dateObject >= sd && dateObject <= ed;
        });
        const totalPresent = filteredData.reduce((sum, ele) => sum + ele.present, 0);
        const daysDiff = Math.ceil((ed - sd) / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
        const weeksDiff = daysDiff / 7;
        const monthsDiff = (ed.getFullYear() - sd.getFullYear()) * 12 + ed.getMonth() - sd.getMonth() + 1;

        const dailyAvg = totalPresent / daysDiff;
        const weeklyAvg = totalPresent / weeksDiff;
        const monthlyAvg = totalPresent / monthsDiff;

        setFilteredData(filteredData);
        setDailyAvg(Math.round(dailyAvg * 100) / 100);
        setWeeklyAvg(Math.round(weeklyAvg * 100) / 100);
        setMonthlyAvg(Math.round(monthlyAvg * 100) / 100);

      };
      
      const onChangeStartDate = (event) => {
        const newStartDate = event.target.value;
        setStartDate(newStartDate);
        filterAttendanceData(attendancedata, newStartDate, endDate);
      };
      
      const onChangeEndDate = (event) => {
        const newEndDate = event.target.value;
        setEndDate(newEndDate);
        filterAttendanceData(attendancedata, startDate, newEndDate);
      };

    // useEffect(() => {
    //     const getAttendanceData = async () => {
    //       setIsLoading(true);
    //       try {
    //         const response = await fetch(http://localhost:3001/getattendanceadmin/${campCluster});
    //         const data = await response.json();
    //         const { AttendanceList } = data;
            
    //         // Sort the AttendanceList based on attendanceDate
    //         AttendanceList.sort((a, b) => {
    //           const dateA = new Date(a.attendanceDate);
    //           const dateB = new Date(b.attendanceDate);
    //           return dateA - dateB;
    //         });
      
    //         // Filter the sorted list based on startDate and endDate
    //         const filteredData = AttendanceList.filter((ele) => {
    //           const parts = ele.attendanceDate.split('/');
    //           const day = parseInt(parts[0], 10);
    //           const month = parseInt(parts[1], 10) - 1; // Subtract 1 as months are zero-indexed
    //           const year = parseInt(parts[2], 10);
    //           const dateObject = new Date(year, month, day);
    //           const sd = new Date(startDate);
    //           const ed = new Date(endDate);
    //           if(ele.attendanceDate==="21/05/2024"){
    //           console.log(dateObject >= sd)
    //           console.log(ele)
    //           }
    //           return dateObject >= sd && dateObject <= ed;
    //         });
      
    //         setFilteredData(filteredData);
    //         setAttendanceData(AttendanceList);
    //         setIsLoading(false);
    //       } catch (err) {
    //         console.log(Error Occurred : ${err});
    //       }
    //     };
      
    //     // Call getAttendanceData only once on mount
    //     getAttendanceData();
    //   }, []); // Empty dependency array means it runs only once on mount
      
      console.log(filtereddata);
      
      const displayedItems = filtereddata.slice(startIdx, endIdx);
      
      const onPreviousPage = () => {
        if (currentPage > 0) {
          setCurrentPage(currentPage - 1);
        }
      };
      
      const onNextPage = () => {
        if (endIdx < filtereddata.length) {
          setCurrentPage(currentPage + 1);
        }
      };
      
    //   const onChangeStartDate = (event) => {
    //     setStartDate(event.target.value)

    //     const filteredData = attendancedata.filter((ele) => {
    //         const parts = ele.attendanceDate.split('/');
    //         const day = parseInt(parts[0], 10);
    //         const month = parseInt(parts[1], 10) - 1; // Subtract 1 as months are zero-indexed
    //         const year = parseInt(parts[2], 10);
    //         const dateObject = new Date(year, month, day);
    //         const sd = new Date(event.target.value);;
    //         const ed = new Date(endDate);
    //         return dateObject >= sd && dateObject <= ed;
    //     });
    //     setFilteredData(filteredData);
    //   };
      
    //   const onChangeEndDate = (event) => {
    //     setEndDate(event.target.value);
    //     const filteredData = attendancedata.filter((ele) => {
    //       const parts = ele.attendanceDate.split('/');
    //       const day = parseInt(parts[0], 10);
    //       const month = parseInt(parts[1], 10) - 1; // Subtract 1 as months are zero-indexed
    //       const year = parseInt(parts[2], 10);
    //       const dateObject = new Date(year, month, day);
    //       const sd = new Date(startDate);
    //       const ed = new Date(event.target.value);
    //       return dateObject >= sd && dateObject <= ed;
    //     });
    //     setFilteredData(filteredData);
    //   };
      

    return (
        <>
        <div style={{backgroundColor:'black'}}>
        <div className='main-header-container'>
            <h1 className='main-d2d'>Attendance Stats</h1>
        </div>
        <div className="scrollable-container">
            <div className="d2d-container">
            {isLoading===false && (
                <div>
                <div style={{width:'100%'}}>
                    <input value={startDate} className="datefilter" type="date" onChange={onChangeStartDate}/>
                    <input value={endDate} className="datefilter" type="date" onChange={onChangeEndDate}/>
                </div>
                <div className="stats-section-container">
                    <h3 className="stats-section-heading">Numbers</h3>
                    <div style={{display:'flex',justifyContent:'space-evenly'}}>
                    <div className="avg-cards">
                        <h2 style={{color:'blue'}}>{dailyavg}</h2>
                        <p style={{fontSize:'12px'}}>Daily Avg.</p>
                    </div>
                    <div className="avg-cards">
                        <h2 style={{color:'green'}}>{weeklyavg}</h2>
                        <p style={{fontSize:'12px'}}>Weekly Avg.</p>
                    </div>
                    <div className="avg-cards">
                        <h2 style={{color:'red'}}>{monthlyavg}</h2>
                        <p>Monthly Avg.</p>
                    </div>
                    </div>
                </div>
                <div className="stats-section-container">
                    <h3 className="stats-section-heading">Table</h3>
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
                    {displayedItems.length!==0 && (displayedItems.map((ele,index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{ele.attendanceDate}</td>
                            <td>{ele.present}</td>
                            <td>{ele.absent}</td>
                        </tr>
                    )))}
                </tbody>
            </table>
            <div style={{textAlign:'right'}}>
                <button className="prev-Btn" onClick={onPreviousPage} disabled={currentPage === 0}>
                    Previous
                </button>
                <button className="next-Btn" onClick={onNextPage} disabled={endIdx >= attendancedata.length}>
                    Next
                </button>
            </div>
                </div>
                {/* <div style={{marginBottom:'80px'}} className="stats-section-container">
                    <h3 className="stats-section-heading">Graph</h3>
                    <BarChart data={filtereddata} startDate={startDate} endDate={endDate}/>
                    <LineChart data={filtereddata} startDate={startDate} endDate={endDate}/>
                </div> */}

                </div>
                )}
            </div>
        </div>  
        </div>
        <Footer/>
    </>
    )
}

export default AttendanceStats