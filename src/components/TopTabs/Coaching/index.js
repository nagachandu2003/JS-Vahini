import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { RiArrowRightSLine } from "react-icons/ri";
import Footer from '../../Footer';
import { IoLanguage } from 'react-icons/io5';
import Cookies from 'js-cookie'
import DistrictItem from '../../DistrictItem';
import {v4 as uuidv4} from 'uuid'
import { Popup } from 'reactjs-popup';

import './index.css'; // Import CSS file

const blocks = {

  "ARARIA" : ['Araria', 'Bhargama', 'Forbesganj', 'Jokihat', 'Kursakanta', 'Narpatganj', 'Palasi', 'Raniganj', 'Sikti'],
  "ARWAL" : ['Arwal', 'Kaler', 'Karpi', 'Kurtha', 'Sonbhadra Banshi Suryapur'],
  "AURANGABAD":['Barun', 'Daudnagar', 'Deo', 'Goh', 'Haspura', 'Kutumba', 'Madanpur', 'Navinagar', 'Obra', 'Rafiganj'],
  "BANKA" : ['Amarpur', 'Banka', 'Barahat', 'Belhar', 'Bounsi', 'Chandan', 'Dhoraiya', 'Fullidumar', 'Katoriya', 'Rajoun', 'Sambhuganj'],
  "BEGUSARAI": ['Bachhwara', 'Bakhari', 'Balia', 'Barauni', 'Begusarai', 'Bhagwanpur', 'Birpur', 'Cheriabariyarpur', 'Chhorahi', 'Dandari', 'Garhpura', 'Khodawandpur', 'Mansurchak', 'Matihani', 'Naokothi', 'Sahebpur Kamal', 'Samho Akha Kurha', 'Teghra'],
  "BHAGALPUR" : ['Bihpur', 'Gopalpur', 'Goradih', 'Ismailpur', 'Jagdishpur', 'Kahalgaon', 'Kharik', 'Narayanpur', 'Nathnagar', 'Naugachhia', 'Pirpainti', 'Rangrachowk', 'Sabour', 'Sanhaula', 'Shahkund', 'Sultanganj'],
  "BHOJPUR" : ['Agiaon', 'Arrah', 'Barhara', 'Bihiya', 'Charpokhari', 'Garhani', 'Jagdispur', 'Koilwar', 'Piro', 'Sahar', 'Sandesh', 'Shahpur', 'Tarari', 'Udwantnagar'],
  "BUXAR" : ['Brahampur', 'Buxar', 'Chakki', 'Chausa', 'Chougain', 'Dumraon', 'Itarhi', 'Kesath', 'Nawanagar', 'Rajpur', 'Simri'],
  "DARBHANGA" : ['Ali Nagar', 'Bahadurpur', 'Baheri', 'Benipur', 'Biraul', 'Darbhanga Sadar', 'Gaura Bauram', 'Ghanshyampur', 'Hanuman Nagar', 'Hayaghat', 'Jale', 'Keoti', 'Kiratpur', 'Kusheshwar Asthan', 'Kusheshwar Asthan East', 'Manigachhi', 'Singhwara', 'Tardih'],
  "EAST CHAMPARAN" : ['Adapur', 'Areraj', 'Banjaria', 'Bankatwa', 'Chakia', 'Chiraia', 'Dhaka', 'Ghorasahan', 'Harsidhi', 'Kalyanpur', 'Kesaria', 'Kotwa', 'Madhuban', 'Mehsi', 'Motihari', 'Narkatia', 'Paharpur', 'Pakri Dayal', 'Patahi', 'Phenhara', 'Piprakothi', 'Ramgarhwa', 'Raxaul', 'Sangrampur', 'Sugauli', 'Tetaria', 'Turkaulia'],
  "GAYA" : ['Amas', 'Atri', 'Banke Bazar', 'Barachatti', 'Belaganj', 'Bodh Gaya', 'Dobhi', 'Dumaria', 'Fatehpur', 'Gaya Town', 'Guraru', 'Gurua', 'Imamganj', 'Khizirsarai', 'Konch', 'Manpur', 'Mohanpur', 'Muhra', 'Neem Chak Bathani', 'Paraiya', 'Sherghati', 'Tan Kuppa', 'Tikari', 'Wazirganj'],
  "GOPALGANJ" : ['Baikunthpur', 'Barauli', 'Bhorey', 'Bijaipur', 'Gopalganj', 'Hathua', 'Katiya', 'Kuchaikote', 'Manjha', 'Pach Deuri', 'Phulwaria', 'Sidhwalia', 'Thawe', 'Uchkagaon'],
  "JAMUI" : ['Barhat', 'Chakai', 'Gidhaur', 'Isalmanagar Aliganj', 'Jamui', 'Jhajha', 'Khaira', 'Laxmipur', 'Sikandra', 'Sono'],
  "JEHANABAD" : ['Ghoshi', 'Hulasganj', 'Jehanabad', 'Kako', 'Makhdumpur', 'Modanganj', 'Ratni Faridpur'],
  "KAIMUR (BHABHUA)": ["Adhaura","Bhabua","Chainpur","Chand","Durgawati","Kudra","Mohania","Ramgarh","Rampur","Rohtas"],
  "KATIHAR" : ['Amdabad', 'Azamnagar', 'Balrampur', 'Barari', 'Barsoi', 'Dandkhora', 'Falka', 'Hasanganj', 'Kadwa', 'Katihar', 'Korha', 'Kursela', 'Manihari', 'Mansahi', 'Pranpur', 'Sameli'],
  "KHAGARIA" : ['Alauli', 'Baldaur', 'Chautham', 'Gogri', 'Khagaria', 'Mansi', 'Parbatta'],
  "KISHANGANJ" : ['Bhahadurganj', 'Dighalbank', 'Kishanganj', 'Kochadhaman', 'Pothia', 'Terhagachha', 'Thakurganj'],
  "LAKHISARAI" : ['Barahia', 'Channan', 'Halsi', 'Lakhisarai', 'Piparia', 'Ramgarh Chowk', 'Suryagarha'],
  "MADHEPURA" : ['Alamnagar', 'Bihariganj', 'Chausa', 'Gamharia', 'Ghailadh', 'Gualpara', 'Kumarkhand', 'Madhepura', 'Murliganj', 'Puraini', 'Shankarpur', 'Sigheshwarsthan', 'Uda kishanganj'],
  "MADHUBANI" : ['Andharathari', 'Babubarhi', 'Basopatti', 'Benipatti', 'Bisfi', 'Ghoghardiha', 'Harlakhi', 'Jainagar', 'Jhanjharpur', 'Kaluahi', 'Khajauli', 'Khutauna', 'Ladania', 'Lakhanaur', 'Laukahi', 'Madhepur', 'Madhwapur', 'Pandaul', 'Phulparas', 'Rahika', 'Rajnagar'],
  "MUNGER" : ['Asarganj', 'Bariyarpur', 'Dharahara', 'Haveli kharagpur', 'Jamalpur', 'Munger sadar', 'Sangarampur', 'Tarapura', 'Tetiya bamber'],
  "MUZAFFARPUR" : ['Aurai', 'Bandra', 'Bochahan', 'Gaighat', 'Kanti', 'Katara', 'Kurhani', 'Marwan', 'Minapur', 'Motipur', 'Muraul', 'Mushahari', 'Paroo', 'Sahebganj', 'Sakra', 'Saraiya'],
  "NALANDA" : ['Asthawan', 'Ben', 'Biharsarif', 'Bind', 'Chandi', 'Ekangarsarai', 'Giriyak', 'Harnaut', 'Hilsa', 'Islampur', 'Karai parsurai', 'Katrisarai', 'Nagarnausa', 'Noorsarai', 'Parwalpur', 'Rahui', 'Rajgir', 'Sarmera', 'Silao', 'Tharthari'],
  "NAWADA" : ['Akbarpur', 'Govindpur', 'Hisua', 'Kashichak', 'Kowakole', 'Meskaur', 'Nardiganj', 'Narhat', 'Nawada', 'Pakaribarawan', 'Rajauli', 'Roh', 'Sirdala', 'Warsaliganj'],
  "PATNA" : ['Athmalgola', 'Bakhtiarpur', 'Barh', 'Belchhi', 'Bihta', 'Bikram', 'Danapur', 'Daniyawaan', 'Dhanarua', 'Dulhin bazar', 'Fatuha', 'Ghoswari', 'Khusrupur', 'Maner', 'Masaurhi', 'Mokama', 'Naubatpur', 'Paliganj', 'Pandarak', 'Patna sadar', 'Phulwari sharif', 'Punpun', 'Sampatchak'],
  "PURNIA" : ['Amour', 'Baisa', 'Baisi', 'Banmankhi', 'Barhara kothi', 'Bhawanipur', 'Dagarua', 'Dhamdaha', 'Jalalgarh', 'Kasba', 'Krityanandnagar', 'Purnia', 'Rupouli', 'Srinagar'],
  "ROHTAS" : ['Akorhigola', 'Bikramganj', 'Chenari', 'Dawath', 'Dehri', 'Dinara', 'Karakat', 'Kargahar', 'Kochas', 'Nasriganj', 'Nauhatta', 'Nokha', 'Rajpur', 'Rohtas', 'Sanjhauli', 'Sasaram', 'Sheosagar', 'Surajpura', 'Tilouthu'],
  "SAHARSA" : ['Banma itahri', 'Kahra', 'Mahishi', 'Nauhatta', 'Patarghat', 'Salkhua', 'Sattar katiya', 'Saur bazar', 'Simri bakhtiyarpur', 'Sonbarsa'],
  "SAMASTIPUR" : ['Bibhutipur', 'Bithan', 'Dalsingsarai', 'Hasanpur', 'Kalyanpur', 'Khanpur', 'Mohanpur', 'Mohiuddinnagar', 'Morwa', 'Patori', 'Pusa', 'Rosera', 'Samastipur', 'Sarairanjan', 'Shivajeenagar', 'Singhia', 'Tajpur', 'Ujiyarpur', 'Vidyapatinagar', 'Warisnagar'],
  "SARAN" : ['Amnour', 'Baniyapur', 'Chapra', 'Dariyapur', 'Dighwara', 'Ekma', 'Garkha', 'Ishuapur', 'Jalalpur', 'Lahladpur', 'Maker', 'Manjhi', 'Marhourah', 'Mashrakh', 'Nagra', 'Panapur', 'Parsa', 'Rivilganj', 'Sonepur', 'Taraiyan'],
  "SHEIKHPURA" : ['Ariari', 'Barbigha', 'Chewara', 'Ghat kusumba', 'Sheikhpura', 'Shekhopur sarai'],
  "SHEOHAR" : ['Dumari', 'Piprahi', 'Purnahiya', 'Sheohar', 'Tariyani'],
  "SITAMARHI" : ['Bairgania', 'Bajpatti', 'Bathnaha', 'Belsand', 'Bokhra', 'Choraut', 'Dumra', 'Majorganj', 'Nanpur', 'Parihar', 'Parsauni', 'Pupri', 'Riga', 'Runnisaidpur', 'Sonbarsa', 'Suppi', 'Sursand'],
  "SIWAN" : ['Andar', 'Barharia', 'Basantpur', 'Bhagwanpur', 'Darauli', 'Duraundha', 'Goreakothi', 'Guthani', 'Hasanpura', 'Hussainganj', 'Jeeradei', 'Lakri nabiganj', 'Maharajganj', 'Mairwa', 'Nautan', 'Pachrukhi', 'Raghunathpur', 'Siswan', 'Siwan'],
  "SUPAUL" : ['Andar', 'Barharia', 'Basantpur', 'Bhagwanpur', 'Darauli', 'Duraundha', 'Goreakothi', 'Guthani', 'Hasanpura', 'Hussainganj', 'Jeeradei', 'Lakri nabiganj', 'Maharajganj', 'Mairwa', 'Nautan', 'Pachrukhi', 'Raghunathpur', 'Siswan', 'Siwan'],
  "VAISHALI" : ['Bhagwanpur', 'Bidupur', 'Chehrakala', 'Desri', 'Garaul', 'Hajipur', 'Jandaha', 'Lalganj', 'Mahnar', 'Mahua', 'Patedhi belsar', 'Patepur', 'Raghopur', 'Rajapakar', 'Sahdei', 'Vaishali'],
  "WEST CHAMPARAN" : ['Bagaha 1', 'Bagaha 2', 'Bairiya', 'Bettiah', 'Bhitha', 'Chanpatia', 'Gaunaha', 'Jogapatti', 'Lauriya', 'Madhuban', 'Mainatand', 'Majhaulia', 'Narkatiaganj', 'Nautan', 'Piprasi', 'Ramnagar', 'Sikta', 'Thakaraha']
}

const options = [
  { OptionId: "ARARIA" },
  { OptionId: "ARWAL" },
  { OptionId: "AURANGABAD" },
  { OptionId: "BANKA" },
  { OptionId: "BEGUSARAI" },
  { OptionId: "BHAGALPUR" },
  { OptionId: "BHOJPUR" },
  { OptionId: "BUXAR" },
  { OptionId: "DARBHANGA" },
  { OptionId: "GAYA" },
  { OptionId: "GOPALGANJ" },
  { OptionId: "JAHANABAD" },
  { OptionId: "JAMUI" },
  { OptionId: "KAIMUR (BHABHUA)" },
  { OptionId: "KATIHAR" },
  { OptionId: "KHAGARIA" },
  { OptionId: "KISHANGANJ" },
  { OptionId: "LAKHISARAI" },
  { OptionId: "MADHEPURA" },
  { OptionId: "MADHUBANI" },
  { OptionId: "MUZAFFARPUR" },
  { OptionId: "MUNGER" },
  { OptionId: "NALANDA" },
  { OptionId: "NAWADA" },
  { OptionId: "PASCHIM CHAMPARAN" },
  { OptionId: "PATNA" },
  { OptionId: "PURNIA" },
  { OptionId: "ROHTAS" },
  { OptionId: "SAMASTIPUR" },
  { OptionId: "SARAN" },
  { OptionId: "SHEIKHPURA" },
  { OptionId: "SHEOHAR" },
  { OptionId: "SITAMARHI" },
  { OptionId: "SUPAUL" },
  { OptionId: "VAISHALI" }
];

const Coaching = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [language,setLanguage] = useState('english'); // Track selected item index
  const campCluster = Cookies.get("campId");

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true)
      try{
        const response = await fetch(`https://js-member-backend.vercel.app/getcoachingreportdata/${campCluster}`);
            const data = await response.json() 
            const filteredList = (data.result).filter((ele) => (ele.campCluster===campCluster && ele.addedByemail===Cookies.get("campuseremail")))
            setUsers(filteredList)
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


  const postData = async (obj) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      };
      const response = await fetch(`https://js-member-backend.vercel.app/addreportcoachinglist`, options);
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(`Error Occurred: ${err}`);
    }
  }


  function handleSave(userData) {
    // console.log(userData)
      // const defaultName = `SS${users.length + 1}`;
      // const ssName = { ...userData, name: defaultName };
      postData(userData)
      const newData = [userData,...users] 
      setUsers(newData);

    setShowForm(false);
  }


const onChangeLanguage = () => {
  if(language==="english")
    setLanguage("hindi")
  else
  setLanguage("english")
}

const coachingOnboardingFormLabel = language === "english" ? "Coaching Onboarding Form" : "कोचिंग संस्थान पंजीकरण";
const dateLabel = language === "english" ? "Date" : "दिनांक";
const coachingCentreNameLabel = language === "english" ? "Name of the Coaching Centre" : "कोचिंग संस्थान का नाम";
const teacherDirectorNameLabel = language === "english" ? "Name of the Teacher/Director" : "टीचर/डायरेक्टर का नाम";
const districtLabel = language === "english" ? "District" : "जिला";
const blockLabel = language === "english" ? "Block" : "ब्लॉक";
const panchayatLabel = language === "english" ? "Panchayat" : "पंचायत";
const teacherDirectorMobileLabel = language === "english" ? "Mobile Number of Teacher/Director" : "शिक्षक/प्रभनधक का मोबाइल नंबर";
const studentsEnrolledLabel = language === "english" ? "Students Enrolled" : "कितने बच्चे पढ़ते हैं";
const vahiniNameLabel = language === "english" ? "Name of the Vahini" : "वाहिनी का नाम";
const vahiniMobileLabel = language === "english" ? "Mobile Number of the Vahini" : "वाहिनी का मोबाईल नंबर";
const photographsOfEventLabel = language === "english" ? "Photographs of the Event" : "कार्यक्रम का फोटोग्राफ";


  const FormComponent = ({ onSave, onClose }) => {
    const [coachingcentrename, setCoachingCentreName] = useState('');
    const [teachername, setTeacherName] = useState('');
    const [district, setDistrict] = useState('');
    const [block, setBlock] = useState('');
    const [panchayat, setPanchayat] = useState('');
    const [teachermobileno, setTeacherMobile] = useState('');
    const [studentsenrolled, setStudentsEnrolled] = useState('');
    const [vahininame, setNameOfVahini] = useState('');
    const [vahinimobile, setMobileOfVahini] = useState('');
    const [photographs, setPhotographs] = useState(null);
    const [base64Img, setBase64Img] = useState('');

    const onChangeDistrict = (event) => {
      setDistrict(event.target.value);
      // setSelectedConstituency(constituencies[event.target.value][0]);
      setBlock(blocks[event.target.value][0])
      console.log(event.target.value)
      console.log(blocks[event.target.value])
  };
  const onChangeBlock = (event) => setBlock(event.target.value)

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
            resolve(`data:${file.type};base64,${base64String}`);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

    const handleSubmit = async (e) => {
      e.preventDefault();
      const currentDate = (new Date()).toLocaleDateString('en-GB');
      const currentTime = (new Date()).toLocaleTimeString();
      

      onSave({
        id:uuidv4(),
        coachingcentrename,
        teachername, 
        district,
        block,
        panchayat,
        teachermobileno,
        studentsenrolled,
        vahininame,
        vahinimobile,
        campCluster,
        photographsofevent:"",
        addedByemail:Cookies.get("campuseremail"),
        date : currentDate,
        time : currentTime
      });
      // Reset input fields after submission
      // setFounderName('');
      // setFounderMobile('');
      // setDistrict('');
      // setOccupation('');
      // setPerception('');
      // setSuccessPerson('');
      // setVisitorName('');
      // setVisitorMobile('');
    };

    const handleCancel = () => {
      onClose();
    };

    return (
      <>
        <div className="form-container active" style={{ overflow: 'auto' }}> {/* Add overflow style */}
          <form className="ss-form" onSubmit={handleSubmit}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <h1 className='popup-heading'>{coachingOnboardingFormLabel}</h1>
            <p onClick={onChangeLanguage} style={{textAlign:'right'}}><IoLanguage/></p>
            </div>
            <label htmlFor="coachingcentrename" className="form-label">{coachingCentreNameLabel}</label>
      <br/>
      <input
        type="text"
        id="coachingcentrename"
        className="ytmcregister-user-input"
        placeholder="Enter the Name of Coaching Centre"
        value={coachingcentrename}
        onChange={(e) => setCoachingCentreName(e.target.value)}
        required
      />
      <br/>
      <label htmlFor="teachername" className="form-label">{teacherDirectorNameLabel}</label>
      <br/>
      <input
        type="text"
        id="teachername"
        className="ytmcregister-user-input"
        placeholder="Enter the Name of Teacher"
        value={teachername}
        onChange={(e) => setTeacherName(e.target.value)}
        required
      />
      <br/>
      <div className="ytmcregister-cont-ele">
        <label htmlFor="district" className='form-label'>{districtLabel}</label>
        <br/>
        <select onChange={onChangeDistrict} id="district" className="ytmcregister-user-input" value={district}>
          <option value="" disabled>SELECT</option>
          {options.map((ele) => <DistrictItem key={ele.OptionId} optionDetails={ele}/>)}
        </select>
      </div>
      <div className="ytmcregister-cont-ele">
        <label className='form-label' htmlFor="block">{blockLabel}</label>
        <br/>
        <select onChange={onChangeBlock} id="block" className="ytmcregister-user-input" value={block}>
          <option value="" disabled>SELECT</option>
          {district && blocks[district].map((ele) => (<option key={ele} value={ele}>{ele}</option>))}
        </select>
      </div>

      <label htmlFor="panchayat" className="form-label">{panchayatLabel}</label>
      <br/>
      <input
        type="text"
        id="panchayat"
        className="ytmcregister-user-input"
        placeholder="Enter the Name of the Panchayat"
        value={panchayat}
        onChange={(e) => setPanchayat(e.target.value)}
        required
      />
      <label htmlFor="teachermobile" className="form-label">{teacherDirectorMobileLabel}</label>
      <br/>
      <input
        type="tel"
        id="teachermobile"
        className="ytmcregister-user-input"
        placeholder="Enter the Mobile No of the Teacher"
        value={teachermobileno}
        onChange={(e) => setTeacherMobile(e.target.value)}
        required
      />

<label htmlFor="studentsenrolled" className="form-label">{studentsEnrolledLabel}</label>
      <br/>
      <input
        type="text"
        id="studentsenrolled"
        className="ytmcregister-user-input"
        placeholder="Enter the Students Enrolled"
        value={studentsenrolled}
        onChange={(e) => setStudentsEnrolled(e.target.value)}
        required
      />

<label htmlFor="vahininame" className="form-label">{vahiniNameLabel}</label>
      <br/>
      <input
        type="text"
        id="vahininame"
        className="ytmcregister-user-input"
        placeholder="Enter the Name of Vahini"
        value={vahininame}
        onChange={(e) => setNameOfVahini(e.target.value)}
        required
      />

<label htmlFor="vahinimobile" className="form-label">{vahiniMobileLabel}</label>
      <br/>
      <input
        type="text"
        id="vahinimobile"
        className="ytmcregister-user-input"
        placeholder="Enter the Mobile No of Vahini"
        value={vahinimobile}
        onChange={(e) => setMobileOfVahini(e.target.value)}
        required
      />

<label htmlFor="photographs" className="form-label">{photographsOfEventLabel}</label>
      <br/>
      <input
        type="file"
        id="photographs"
        className="ytmcregister-user-input"
        placeholder="Upload the Photographs"
        onChange={(e) => setPhotographs(e.target.files[0])}
        required
      />

            <div style={{marginTop:'10px'}} className='cancel-submit-btn-container'>
              <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="btn-submit">Submit</button>
            </div>
          </form>
        </div>
        <Footer />
      </>
    );
  };

  return (
    <>
      <div>
        <div className='main-header-container'>
          <h1 className='main-ss'>Coaching</h1>
        </div>
        <div className='ss-container'>
          <div className={showForm ? "overlay" : "overlay hidden"} onClick={() => setShowForm(false)}></div>
          {showForm && <FormComponent onSave={handleSave} onClose={() => setShowForm(false)} />}
          <div className="floating-button" onClick={() => setShowForm(!showForm)}>
            <span>New</span>
            <FaPlus className="plus-icon" />
          </div>
          <ul className={selectedItem !== null ? "userList popup" : "userList"}>
            {users.length === 0 ? (
              <div className='empty-list-container'>
                <li className="empty-list">The Coaching List is Empty. Click on the New to Add Coaching</li>
              </div>
            ) : (
              users.map((user, index) => (
                <li key={index} className="ss-users-list" onClick={() => setSelectedItem(index)}>
                  <div className='ss-list-column'>
                    <p className='list-ss-name'>Coaching : {user.coachingcentrename}</p>
                    <p className='list-ss-time'>Date & Time: {user.date} & {user.time}</p>
                  </div>
                  <p><RiArrowRightSLine className='side-arrow' /></p>
                </li>
              ))
            )}
          </ul>
          {selectedItem !== null && (
            <div className="popup">
              <div className="popup-content">
                <span className="close" onClick={() => setSelectedItem(null)}>&times;</span>
                <ul className="userList">
  <li className="users-list" style={{height:'300px',overflowY:'auto'}}>
    <table className="userTable">
      <thead>
      <tr>
        <th className="parameterHeader">Parameters</th>
        <th className="valueHeader">Values</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td className="parameter">Name of Coaching Centre</td>
        <td className="value">{users[selectedItem].coachingcentrename}</td>
      </tr>
      <tr>
        <td className="parameter">Name of Teacher/Director</td>
        <td className="value">{users[selectedItem].teachername}</td>
      </tr>
      <tr>
        <td className="parameter">District</td>
        <td className="value">{users[selectedItem].district}</td>
      </tr>
      <tr>
        <td className="parameter">Block</td>
        <td className="value">{users[selectedItem].block}</td>
      </tr>
      <tr>
        <td className="parameter">Panchayat</td>
        <td className="value">{users[selectedItem].panchayat}</td>
      </tr>
      <tr>
        <td className="parameter">Mobile Number of Teacher/Director</td>
        <td className="value">{users[selectedItem].teachermobileno}</td>
      </tr>
      <tr>
        <td className="parameter">Students Enrolled</td>
        <td className="value">{users[selectedItem].studentsenrolled}</td>
      </tr>
      <tr>
        <td className="parameter">Name of Vahini</td>
        <td className="value">{(users[selectedItem].vahininame)}</td>
      </tr>
      <tr>
        <td className="parameter">Mobile No of Vahini</td>
        <td className="value">{users[selectedItem].vahinimobile}</td>
      </tr>
      <tr>
        <td className='parameter'>Photographs of event</td>
        <td className='value'></td>
        {/* <td className='value'>
        <Popup
                    trigger={<button className="edit-Btn" type="button">View</button>}
                    modal
                    nested
                    contentStyle={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}
                    overlayStyle={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '9998' }}
                    >
                    {close => (
                        <div style={{backgroundColor:'yellow'}} className="modal rcyt-custom-popup">
                        <div className="content rcyt-popup-cont">
                          <h3>Photographs of Event</h3>
                          <img style={{border:'5px solid white'}} src={users[selectedItem].photographsofevent} height="200" width="200" alt="photographofevent"/>
                        </div>
                        <div className="actions">
                            <button className="button delete-Btn" onClick={() => {
                            console.log('modal closed');
                            close();
                            }}>Close</button>
                        </div>
                        </div>
                    )}
                    </Popup>
          </td> */}
          </tr>
      </tbody>
    </table>
  </li>
</ul>

              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Coaching;
