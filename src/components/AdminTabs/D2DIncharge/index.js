
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { RiArrowRightSLine } from "react-icons/ri";
import Footer from '../../Footer';
import { IoLanguage } from 'react-icons/io5';
import Cookies from 'js-cookie'
import DistrictItem from '../../DistrictItem';
import {v4 as uuidv4} from 'uuid'

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

const D2DIncharge = () => {
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
        const response = await fetch(`https://js-member-backend.vercel.app/getd2dinchargereportdata/${campCluster}`);
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
    try{
      const options = {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(obj)
      }
      const response = await fetch(`https://js-member-backend.vercel.app/addreportd2dinchargelist`,options);
      const data = await response.json()
      console.log(data)
    }
    catch(Err){
      console.log(`Error Occurred : ${Err}`);
    }
  }

  function handleSave(userData) {
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

const reportLabel = language === "english" ? "D2D Team Report" : "टीम प्रचार रिपोर्ट";
const  dateLabel = language === "english" ? "Date" : "दिनांक";
  const  teamLeadLabel = language === "english" ? "Team Lead" : "टीम लीड";
  const  districtLabel = language === "english" ? "District" : "जिला";
  const  blockLabel = language === "english" ? "Block" : "प्रखण्ड";
  const  villageAnalysisLabel = language === "english" ? "Village Analysis" : "गॉवों का विश्लेषण";
  const  panchayat1Label = language === "english" ? "Panchayat 1" : "पंचायत 1";
  const  village1NameLabel = language === "english" ? "Name of the Village 1" : "गाँव 1 का नाम";
  const  totalHouseholdsCovered1Label = language === "english" ? "Total House Holds Covered" : "कितने घर हुए?";
  const  totalSansthapakMade1Label = language === "english" ? "Total Sansthapak Sadasya Made" : "कितने संस्थापक सदस्य बनाए गए?";
  const  socialMediaInfluencersOnboarded1Label = language === "english" ? "Social Media Influencers Onboarded" : "कितने सोशल मीडिया इंफ्लुएंसर जोड़े गए";
  const  whatsappJoined1Label = language === "english" ? "WhatsApp Joined" : "कितने व्हाट्सप्प सदस्य बनाए गए ?";
  const  isVillageComplete1Label = language === "english" ? "Is the Village Complete" : "क्या यह गाँव पूर्ण रूप से समाप्त हो गया ?";
  const panchayat2Label = language === "english" ? "Panchayat 2" : "पंचायत 2";
  const  village2NameLabel = language === "english" ? "Village 2" : "गाँव 2 का नाम";
const  totalHouseholdsCovered2Label = language === "english" ? "Total House Holds Covered" : "कितने घर हुए?";
const  totalSansthapakMade2Label = language === "english" ? "Total Sansthapak Sadasya Made" : "कितने संस्थापक सदस्य बनाए गए?";
const  socialMediaInfluencersOnboarded2Label = language === "english" ? "Social Media Influencers Onboarded" : "कितने सोशल मीडिया इंफ्लुएंसर जोड़े गए";
const  whatsappJoined2Label = language === "english" ? "WhatsApp Joined" : "कितने व्हाट्सप्प सदस्य बनाए गए ?";
const  isVillageComplete2Label = language === "english" ? "Is the Village Complete" : "क्या यह गाँव पूर्ण रूप से समाप्त हो गया ?"




  const FormComponent = ({ onSave, onClose }) => {
    const [teamlead, setTeamLead] = useState('');
    const [district, setDistrict] = useState('');
    const [d2ddate, setD2DDate] = useState('');
    const [block, setBlock] = useState('');
    const [panchayat1, setPanchayat1] = useState('');
    const [nameofvillage1, setNameOfVillage1] = useState('');
    const [totalhouseholdscovered1, setTotalHouseholdsCovered1] = useState('');
    const [totalssmade1, setTotalSSMade1] = useState('');
    const [socialmediainfluencersonboarded1, setSocialMediaInfluencersOnboarded1] = useState('');
    const [whatsappjoined1, setWhatsAppJoined1] = useState('');
    const [villagecompleted1, setIsVillageComplete1] = useState('');
    const [panchayat2, setPanchayat2] = useState('');
    const [nameofvillage2, setNameOfVillage2] = useState('');
    const [totalhouseholdscovered2, setTotalHouseholdsCovered2] = useState('');
    const [totalssmade2, setTotalSSMade2] = useState('');
    const [socialmediainfluencersonboarded2, setSocialMediaInfluencersOnboarded2] = useState('');
    const [whatsappjoined2, setWhatsAppJoined2] = useState('');
    const [villagecompleted2, setIsVillageComplete2] = useState('');
    

 
    const onChangeDistrict = (event) => {
      setDistrict(event.target.value);
      // setSelectedConstituency(constituencies[event.target.value][0]);
      setBlock(blocks[event.target.value][0])
      console.log(event.target.value)
      console.log(blocks[event.target.value])
  };
  const onChangeBlock = (event) => setBlock(event.target.value)

    const handleSubmit = (e) => {
      e.preventDefault();
      const currentDate = (new Date()).toLocaleDateString('en-GB');
      const currentTime = (new Date()).toLocaleTimeString();
      onSave({
        teamlead,
        d2ddate,
        district,
        block,
        villageanalysis : {
            panchayat1,
            nameofvillage1,
            totalhouseholdscovered1,
            totalssmade1,
            socialmediainfluencersonboarded1,
            whatsappjoined1,
            villagecompleted1,
            panchayat2,
            nameofvillage2,
            totalhouseholdscovered2,
            totalssmade2,
            socialmediainfluencersonboarded2,
            whatsappjoined2,
            villagecompleted2
        },
        campCluster,
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
        <div className="form-container active" style={{ overflow: 'auto' }}> 
          <form className="ss-form" onSubmit={handleSubmit}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <h1 className='popup-heading'>{reportLabel}</h1>
            <p onClick={onChangeLanguage} style={{textAlign:'right'}}><IoLanguage/></p>
            </div>
            <label htmlFor="teamleadname" className="form-label">{teamLeadLabel}</label>
      <br/>
      <input
        type="text"
        id="teamleadname"
        className="ytmcregister-user-input"
        placeholder="Enter the Team Lead"
        value={teamlead}
        onChange={(e) => setTeamLead(e.target.value)}
        required
      />
      <br/>
    <label htmlFor="d2dDate" className="form-label">{dateLabel}</label>
      <br/>
      <input
        type="date"
        id="d2dDate"
        className="ytmcregister-user-input"
        placeholder="Enter the D2D date"
        value={d2ddate}
        onChange={(e) => setD2DDate(e.target.value)}
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
      <p className='form-label'>{villageAnalysisLabel}</p>
      <label htmlFor="panchayat1" className="form-label">{panchayat1Label}</label>
      <br/>
      <input
        type="text"
        id="panchayat1"
        className="ytmcregister-user-input"
        placeholder="Enter the Panchayat1 "
        value={panchayat1}
        onChange={(e) => setPanchayat1(e.target.value)}
        required
      />
      <br/>
      <label htmlFor="village1name" className="form-label">{village1NameLabel}</label>
      <br/>
      <input
        type="text"
        id="village1name"
        className="ytmcregister-user-input"
        placeholder="Enter the Name of Village 1"
        value={nameofvillage1}
        onChange={(e) => setNameOfVillage1(e.target.value)}
        required
      />
      <br/>
      <label htmlFor="totalhouseholdscovered1" className="form-label">{totalHouseholdsCovered1Label}</label>
      <br/>
      <input
        type="text"
        id="totalhouseholdscovered1"
        className="ytmcregister-user-input"
        placeholder="Enter the Total Households Covered "
        value={totalhouseholdscovered1}
        onChange={(e) => setTotalHouseholdsCovered1(e.target.value)}
        required
      />
      <br/>
      <label htmlFor="totalssmade1" className="form-label">{totalSansthapakMade1Label}</label>
      <br/>
      <input
        type="text"
        id="totalssmade1"
        className="ytmcregister-user-input"
        placeholder="Enter the Total Sansthapak Sadasya Made "
        value={totalssmade1}
        onChange={(e) => setTotalSSMade1(e.target.value)}
        required
      />
      <br/>
      <label htmlFor="totalsocialmediainfluencersonboarded1" className="form-label">{socialMediaInfluencersOnboarded1Label}</label>
      <br/>
      <input
        type="text"
        id="totalsocialmediainfluencersonboarded1"
        className="ytmcregister-user-input"
        placeholder="Enter the Total Social Media Influencers Onboarded "
        value={socialmediainfluencersonboarded1}
        onChange={(e) => setSocialMediaInfluencersOnboarded1(e.target.value)}
        required
      />
            <br/>
      <label htmlFor="whatsappjoined1" className="form-label">{whatsappJoined1Label}</label>
      <br/>
      <input
        type="text"
        id="whatsappjoined1"
        className="ytmcregister-user-input"
        placeholder="Are you joined in WhatsApp? "
        value={whatsappjoined1}
        onChange={(e) => setWhatsAppJoined1(e.target.value)}
        required
      />
      <br/>
      <div className="ytmcregister-cont-ele">
        <label className='form-label' htmlFor="villagecompleted1">{isVillageComplete1Label}</label>
        <br/>
        <select onChange={(e) => setIsVillageComplete1(e.target.value)} id="villagecompleted1" className="ytmcregister-user-input" value={villagecompleted1}>
          <option value="" disabled>SELECT</option>
          <option value="completed">{language==="english"?"Completed":"पूरा हो गया है"}</option>
          <option value="completed">{language==="english"?"Not Completed":"अभी बचा हुआ है"}</option>
        </select>
      </div>
      <label htmlFor="panchayat2" className="form-label">{panchayat2Label}</label>
      <br/>
      <input
        type="text"
        id="panchayat2"
        className="ytmcregister-user-input"
        placeholder="Enter the Panchayat2 "
        value={panchayat2}
        onChange={(e) => setPanchayat2(e.target.value)}
        required
      />
      <br/>
      <label htmlFor="village2name" className="form-label">{village2NameLabel}</label>
      <br/>
      <input
        type="text"
        id="village2name"
        className="ytmcregister-user-input"
        placeholder="Enter the Name of Village 2"
        value={nameofvillage2}
        onChange={(e) => setNameOfVillage2(e.target.value)}
        required
      />
      <br/>
      <label htmlFor="totalhouseholdscovered2" className="form-label">{totalHouseholdsCovered2Label}</label>
      <br/>
      <input
        type="text"
        id="totalhouseholdscovered2"
        className="ytmcregister-user-input"
        placeholder="Enter the Total Households Covered "
        value={totalhouseholdscovered2}
        onChange={(e) => setTotalHouseholdsCovered2(e.target.value)}
        required
      />
      <br/>
      <label htmlFor="totalssmade2" className="form-label">{totalSansthapakMade2Label}</label>
      <br/>
      <input
        type="text"
        id="totalssmade2"
        className="ytmcregister-user-input"
        placeholder="Enter the Total Sansthapak Sadasya Made "
        value={totalssmade2}
        onChange={(e) => setTotalSSMade2(e.target.value)}
        required
      />
      <br/>
      <label htmlFor="totalsocialmediainfluencersonboarded2" className="form-label">{socialMediaInfluencersOnboarded2Label}</label>
      <br/>
      <input
        type="text"
        id="totalsocialmediainfluencersonboarded2"
        className="ytmcregister-user-input"
        placeholder="Enter the Total Social Media Influencers Onboarded "
        value={socialmediainfluencersonboarded2}
        onChange={(e) => setSocialMediaInfluencersOnboarded2(e.target.value)}
        required
      />
      <br/>
      <label htmlFor="whatsappjoined2" className="form-label">{whatsappJoined2Label}</label>
      <br/>
      <input
        type="text"
        id="whatsappjoined2"
        className="ytmcregister-user-input"
        placeholder="Are you joined in WhatsApp? "
        value={whatsappjoined2}
        onChange={(e) => setWhatsAppJoined2(e.target.value)}
        required
      />
      <br/>
      <div className="ytmcregister-cont-ele">
        <label className='form-label' htmlFor="villagecompleted2">{isVillageComplete2Label}</label>
        <br/>
        <select onChange={(e) => setIsVillageComplete2(e.target.value)} id="villagecompleted2" className="ytmcregister-user-input" value={villagecompleted2}>
          <option value="" disabled>SELECT</option>
          <option value="completed">{language==="english"?"Completed":"पूरा हो गया है"}</option>
          <option value="completed">{language==="english"?"Not Completed":"अभी बचा हुआ है"}</option>
        </select>
      </div>


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
          <h1 className='main-ss'>D2D Incharge</h1>
        </div>
        <div className='ss-container'>
          <div className={showForm ? "overlay" : "overlay hidden"} onClick={() => setShowForm(false)}></div>
          {showForm && <FormComponent onSave={handleSave} onClose={() => setShowForm(false)} />}
          <div className="floating-button" onClick={() => setShowForm(!showForm)}>
            <span>New</span>
            <FaPlus className="plus-icon" />
          </div>
          <ul className={selectedItem !== null ? "userList" : "userList"}>
            {users.length === 0 ? (
              <div className='empty-list-container'>
                <li className="empty-list">The D2D Incharge List is Empty. Click on the New to Add items to list</li>
              </div>
            ) : (
              users.map((user, index) => (
                <li key={index} className="ss-users-list" onClick={() => setSelectedItem(index)}>
                  <div className='ss-list-column'>
                    <p className='list-ss-name'>Date : {user.d2ddate}</p>
                    <p className='list-ss-time'>D2D Incharge : {user.teamlead}</p>
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
        <td className="parameter">Team Lead</td>
        <td className="value">{users[selectedItem].teamlead}</td>
      </tr>
      <tr>
        <td className="parameter">Date</td>
        <td className="value">{users[selectedItem].d2ddate}</td>
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
        <td className="parameter">panchayat1</td>
        <td className="value">{(users[selectedItem].villageanalysis).panchayat1}</td>
      </tr>
      <tr>
        <td className="parameter">Name of the Village1</td>
        <td className="value">{(users[selectedItem].villageanalysis).nameofvillage1}</td>
      </tr>
      <tr>
        <td className="parameter">Total Households Covered</td>
        <td className="value">{(users[selectedItem].villageanalysis).totalhouseholdscovered1}</td>
      </tr>
      <tr>
        <td className="parameter">Total Sansthapak Sadasya Made</td>
        <td className="value">{(users[selectedItem].villageanalysis).totalssmade1}</td>
      </tr>
      <tr>
        <td className="parameter">Social Media Influencers Onboarded</td>
        <td className="value">{(users[selectedItem].villageanalysis).socialmediainfluencersonboarded1}</td>
      </tr>
      <tr>
        <td className="parameter">WhatsApp Joined</td>
        <td className="value">{(users[selectedItem].villageanalysis).whatsappjoined1}</td>
      </tr>
      <tr>
        <td className="parameter">Is the Village Complete</td>
        <td className="value">{(users[selectedItem].villageanalysis).villagecompleted1}</td>
      </tr>
      <tr>
        <td className="parameter">Name of the Village2</td>
        <td className="value">{(users[selectedItem].villageanalysis).nameofvillage2}</td>
      </tr>
      <tr>
        <td className="parameter">Total Households Covered</td>
        <td className="value">{(users[selectedItem].villageanalysis).totalhouseholdscovered2}</td>
      </tr>
      <tr>
        <td className="parameter">Total Sansthapak Sadasya Made</td>
        <td className="value">{(users[selectedItem].villageanalysis).totalssmade2}</td>
      </tr>
      <tr>
        <td className="parameter">Social Media Influencers Onboarded</td>
        <td className="value">{(users[selectedItem].villageanalysis).socialmediainfluencersonboarded2}</td>
      </tr>
      <tr>
        <td className="parameter">WhatsApp Joined</td>
        <td className="value">{(users[selectedItem].villageanalysis).whatsappjoined2}</td>
      </tr>
      <tr>
        <td className="parameter">Is the Village Complete</td>
        <td className="value">{(users[selectedItem].villageanalysis).villagecompleted2}</td>
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

export default D2DIncharge;
