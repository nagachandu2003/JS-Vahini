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

const DigitalInfluencer = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [language,setLanguage] = useState('english'); // Track selected item index
  const campCluster = Cookies.get("campId");

//   useEffect(() => {
//     const getSS = localStorage.getItem("ssdata");
//     if (getSS) {
//       setUsers(JSON.parse(getSS));
//     }
//   }, []); 


  function handleSave(userData) {
    // console.log(userData)
      // const defaultName = `SS${users.length + 1}`;
      // const ssName = { ...userData, name: defaultName };
      const newData = [userData,...users] 
      setUsers(newData);
      localStorage.setItem("ssdata",JSON.stringify(newData))

    setShowForm(false);
  }

  const influencerOnboardingFormLabel = language === "english" ? "Social Media Influencer Onboarding Form" : "सोशल मीडिया इंफ्लुएंसर ऑनबोर्डिंग फॉर्म";
  const influencerNameLabel = language === "english" ? "Name of the Influencer" : "इंफ्लुएंसर का नाम";
  const influencerMobileLabel = language === "english" ? "Mobile Number of the Influencer" : "इंफ्लुएंसर का मोबाईल नंबर";
  const districtLabel = language === "english" ? "District" : "जिला";
  const blockLabel = language === "english" ? "Block" : "प्रखण्ड";
  const activeOnSocialMediaLabel = language === "english" ? "Active on Social Media" : "कौन से सोशल मीडिया पे ऐक्टिव हैं";
  const accountNameLabel = language === "english" ? "Name of the Account/Channel" : "प्रोफाइल/चैनल का नाम";
  const youtubeLabel = language === "english" ? "YouTube" : "यूट्यूब";
const instagramLabel = language === "english" ? "Instagram" : "इंस्टाग्राम";
const facebookLabel = language === "english" ? "Facebook" : "फेस्बूक";
const twitterLabel = language === "english" ? "Twitter" : "ट्विटर";

const onChangeLanguage = () => {
  if(language==="english")
    setLanguage("hindi")
  else
  setLanguage("english")
}

  const FormComponent = ({ onSave, onClose }) => {
    const [influencername, setInfluencerName] = useState('');
    const [influencerMobile, setInfluencerMobile] = useState('');
    const [district, setDistrict] = useState('');
    const [block, setBlock] = useState('');
    let [activeSocialMediaItems, setActiveSocialMediaItems] = useState([]);
    const [nameofaccount, setNameOfAccount] = useState('');

    const onChangeDistrict = (event) => {
      setDistrict(event.target.value);
      // setSelectedConstituency(constituencies[event.target.value][0]);
      setBlock(blocks[event.target.value][0])
      console.log(event.target.value)
      console.log(blocks[event.target.value])
  };
  const onChangeBlock = (event) => setBlock(event.target.value)

  const onChangeActiveSocialMediaItems = (event) => {
    const { value, checked } = event.target;
    
    if (checked) {
        activeSocialMediaItems = [...activeSocialMediaItems, value];
    } else {
        activeSocialMediaItems = activeSocialMediaItems.filter(ele => ele !== value);
    }

    setActiveSocialMediaItems(activeSocialMediaItems)
}

    const handleSubmit = (e) => {
      e.preventDefault();
      const currentDate = (new Date()).toLocaleDateString('en-GB');
      const currentTime = (new Date()).toLocaleTimeString();
      onSave({
        influencername,
        influencerMobile,
        district,
        block,
        activeSocialMediaItems,
        nameofaccount,
        campCluster,
        email:Cookies.get("campuseremail"),
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
            <h1 className='popup-heading'>{influencerOnboardingFormLabel}</h1>
            <p onClick={onChangeLanguage} style={{textAlign:'right'}}><IoLanguage/></p>
            </div>
            <label htmlFor="influencername" className="form-label">{influencerNameLabel}</label>
      <br/>
      <input
        type="text"
        id="influencername"
        className="ytmcregister-user-input"
        placeholder="Enter the Influencer Name"
        value={influencername}
        onChange={(e) => setInfluencerName(e.target.value)}
        required
      />
      <br/>
      <label htmlFor="influencermobile" className="form-label">{influencerMobileLabel}</label>
      <br/>
      <input
        style={{ width: '100%' }}
        type="text"
        id="influencermobile"
        className="ytmcregister-user-input"
        placeholder="Enter the Influencer Mobile Number"
        value={influencerMobile}
        onChange={(e) => setInfluencerMobile(e.target.value)}
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
      <label htmlFor="socialitems" className="form-label">{activeOnSocialMediaLabel}</label>
      <br/>
        <div className="ytmcregister-user-input" >
          <input style={{ marginRight: '10px' }} type="checkbox" id="youtube" value="Youtube" onChange={onChangeActiveSocialMediaItems}/>
          <label className='form-label' htmlFor="youtube">{youtubeLabel}</label>
        </div>
        <div className="ytmcregister-user-input" >
          <input style={{ marginRight: '10px' }} type="checkbox" id="instagram" value="Instagram" onChange={onChangeActiveSocialMediaItems}/>
          <label className='form-label' htmlFor="instagram">{instagramLabel}</label>
        </div>
        <div className="ytmcregister-user-input" >
          <input style={{ marginRight: '10px' }} type="checkbox" id="facebook" value="Facebook" onChange={onChangeActiveSocialMediaItems}/>
          <label className='form-label' htmlFor="youtube">{facebookLabel}</label>
        </div>
        <div className="ytmcregister-user-input" >
          <input style={{ marginRight: '10px' }} type="checkbox" id="twitter" value="Twitter" onChange={onChangeActiveSocialMediaItems}/>
          <label className='form-label' htmlFor="youtube">{twitterLabel}</label>
        </div>

      <label htmlFor="nameofaccount" className="form-label">{accountNameLabel}</label>
      <br/>
      <input
        type="text"
        id="nameofaccount"
        className="ytmcregister-user-input"
        placeholder="Enter the Name of the Account"
        value={nameofaccount}
        onChange={(e) => setNameOfAccount(e.target.value)}
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
          <h1 className='main-ss'>Digital Influencer</h1>
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
                <li className="empty-list">The Digital Influencer List is Empty. Click on the New to Add Digital Influencer</li>
              </div>
            ) : (
              users.map((user, index) => (
                <li key={index} className="ss-users-list" onClick={() => setSelectedItem(index)}>
                  <div className='ss-list-column'>
                    <p className='list-ss-name'>Digital Influencer: {user.influencername}</p>
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
        <td className="parameter">Influencer Name</td>
        <td className="value">{users[selectedItem].influencername}</td>
      </tr>
      <tr>
        <td className="parameter">Influencer Mobile</td>
        <td className="value">{users[selectedItem].influencerMobile}</td>
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
        <td className="parameter">Active on Social Media</td>
        <td className="value">{(users[selectedItem].activeSocialMediaItems).join("\n")}</td>
      </tr>
      <tr>
        <td className="parameter">Name of Account/Channel</td>
        <td className="value">{(users[selectedItem].nameofaccount)}</td>
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

export default DigitalInfluencer;
