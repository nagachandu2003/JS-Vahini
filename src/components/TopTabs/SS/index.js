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

const SS = () => {
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
        const response = await fetch(`https://js-member-backend.vercel.app/getssreportdata/${campCluster}`);
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
      const response = await fetch(`https://js-member-backend.vercel.app/addreportsslist`,options);
      const data = await response.json()
      console.log(data)
    }
    catch(Err){
      console.log(`Error Occurred : ${Err}`);
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
const occupationsInEnglish = ["Doctor",
  "Teacher- Retired/Private",
  "Army/Police",
  "Lawyer",
  "Post Man",
  "Shopkeeper",
  "PDS Dealer",
  "Local Healer",
  "Aanganbadi Sevika",
  "ANM Didi",
  "Jeevika Didi",
  "Aaasha Worker",
  "Business Man",
  "Rojgar Sevak",
  "Vikas Sevak",
  "Tola Sevak",
  "Ward Member",
  "Sarpanch",
  "Mukhiya",
  "Ward Candidate",
  "Sarpanch Candidate",
  "Mukhiya Candidate",
  "Ex Ward",
  "Ex Sarpanch",
  "Ex Mukhiya",
  "CSC/CSV",
  "Retired Government Officer",
  "Panch",
  "Panchayat Samiti",
  "Ex Panchayat Samiti",
  "Ex Panch",
  "Salon/ Beauty Parlour",
  "Party Office Bearer",
  "Youth Leader",
  "Social Worker",
  "Religious Preacher","Others"]
const canssberecommendedInEnglish = [
  "Block/Panchayat Committee",
  "Youth Club",
  "Jan Suraaj Influencer in the Village"
]
const sansthapakSadasyaFormLabel = language === "english" ? "Sansthapak Sadasya Registration Form" : "संस्थापक सदस्य जानकारी फ़ार्म";
const dateLabel = language === "english" ? "Date" : "दिनांक";
const sansthapakNameLabel = language === "english" ? "Name of the Sansthapak Sadasya" : "संस्थापक सदस्य का नाम";
const sansthapakMobileLabel = language === "english" ? "Mobile Number of the Sansthapak Sadasya" : "संस्थापक सदस्य का मोबाइल नंबर";
const districtLabel = language === "english" ? "District" : "जिला";
const blockLabel = language === "english" ? "Block" : "प्रखण्ड";
const occupationLabel = language === "english" ? "Occupation" : "पेशा";
const ifOtherLabel = language === "english" ? "If Other, Then" : "यदि अन्य तो क्या?";
const recommendationLabel = language === "english" ? "Can the SS be recommended for" : "वाहिनी / पदयात्री के नज़र में यह संस्थापक सदस्य";
const successfulPersonLabel = language === "english" ? "Can the SS recommend most successful person of the area living outside Bihar" : "संस्थापक सदस्य के अपने छेत्र के सबसे सफल व्यक्ति का नाम और फ़ोन नंबर बताएं जो की बिहार से बाहर रहते है।";
const vahiniNameLabel = language === "english" ? "Name of the Vahini/Padyatri" : "वाहिनी / पदयात्री का नाम";
const vahiniMobileLabel = language === "english" ? "Mobile Number of the Vahhini/Padyatri" : "वाहिनी / पदयात्री का मोबाइल नंबर";
const occupationOptions = language === "english" ? [
  "Doctor",
  "Teacher- Retired/Private",
  "Army/Police",
  "Lawyer",
  "Post Man",
  "Shopkeeper",
  "PDS Dealer",
  "Local Healer",
  "Aanganbadi Sevika",
  "ANM Didi",
  "Jeevika Didi",
  "Aaasha Worker",
  "Business Man",
  "Rojgar Sevak",
  "Vikas Sevak",
  "Tola Sevak",
  "Ward Member",
  "Sarpanch",
  "Mukhiya",
  "Ward Candidate",
  "Sarpanch Candidate",
  "Mukhiya Candidate",
  "Ex Ward",
  "Ex Sarpanch",
  "Ex Mukhiya",
  "CSC/CSV",
  "Retired Government Officer",
  "Panch",
  "Panchayat Samiti",
  "Ex Panchayat Samiti",
  "Ex Panch",
  "Salon/ Beauty Parlour",
  "Party Office Bearer",
  "Youth Leader",
  "Social Worker",
  "Religious Preacher",
  "Other"
] : [
  "डॉक्टर",
  "शिक्षक- सेवानिवृत/प्राइवेट",
  "सेना/पुलिस",
  "वकील",
  "डाकिया",
  "दुकानदार (सभी प्रकार)",
  "पी दी एस डीलर",
  "स्थानीय चिकित्सक",
  "आंगनबाड़ी सेविका",
  "ए एन एम दीदी",
  "जीविका दीदी",
  "आशा कार्यकर्ता",
  "स्थानीय व्यवसाई",
  "रोजगार सेवक",
  "विकास सेवक",
  "टोला सेवक",
  "वार्ड सदस्य",
  "सरपंच",
  "मुखिया",
  "वार्ड उमीदवार",
  "सरपंच उमीदवार",
  "मुखिया उमीदवार",
  "पूर्व वार्ड",
  "पूर्व सरपंच",
  "पूर्व मुखिया",
  "सामान्य सेवा केंद्र",
  "सेवनिवृत सरकारी अधिकारी",
  "पंच",
  "पंचायत समिति",
  "पूर्व पंचायत समिति",
  "पूर्व पंच",
  "सलोन/ब्यूटी पार्लर",
  "पार्टी कार्यालय धारक",
  "नवनिर्मित/युवा नेता",
  "सामाजिक/सांस्कृतिक कार्यकर्ता",
  "धार्मिक गुरु",
  "अन्य"
];
const personNameLabel = language === "english" ? "Person Name" : "व्यक्ति का नाम";
const personMobileLabel = language === "english" ? "Person Mobile Number" : "व्यक्ति का मोबाइल नंबर";
const checkboxOptions = language === "english" ? [
  "Block/Panchayat Committee",
  "Youth Club",
  "Jan Suraaj Influencer in the Village"
] : [
  "सक्रिय प्रखंड समिति सदस्य बन सकते है (ब्लॉक कमेटी)",
  "यूथ क्लब खोल सकते है",
  "ख़ुद बैठक बुला कर अपने गाँव में जन सुराज के मुख्य उद्देशों पर चर्चा कर सकते है"
];

const onChangeLanguage = () => {
  if(language==="english")
    setLanguage("hindi")
  else
  setLanguage("english")
}

  const FormComponent = ({ onSave, onClose }) => {
    const [SSname, setSSName] = useState('');
    const [SSmobileno, setSSMobile] = useState('');
    const [district, setDistrict] = useState('');
    const [block, setBlock] = useState('');
    const [occupation,setOccupation] = useState('');
    let [recommendedItems, setRecommendedItems] = useState([]);
    const [recommendingPerson, setRecommendingPerson] = useState('');
    const [nameofvahiniorpadayatri, setNameOfVahiniOrPadayatri] = useState('');
    const [mobilenoofvahiniorpadayatri, setMobileNoOfVahiniOrPadayatri] = useState('');
    const [personname,setPersonName] = useState('');
    const [personnumber, setPersonNumber] = useState('');


    // const [founderName, setFounderName] = useState('');
    // const [founderMobile, setFounderMobile] = useState('');
    // const [district, setDistrict] = useState('');
    // const [occupation, setOccupation] = useState('');
    // const [perception, setPerception] = useState('');
    // const [successPerson, setSuccessPerson] = useState('');
    // const [visitorName, setVisitorName] = useState('');
    // const [visitorMobile, setVisitorMobile] = useState('');

    const onChangeDistrict = (event) => {
      setDistrict(event.target.value);
      // setSelectedConstituency(constituencies[event.target.value][0]);
      setBlock(blocks[event.target.value][0])
      console.log(event.target.value)
      console.log(blocks[event.target.value])
  };
  const onChangeBlock = (event) => setBlock(event.target.value)
  const onChangeOccupation = (event) => setOccupation(event.target.value);

  const onChangeRecommendedItems = (event) => {
    const { value, checked } = event.target;
    
    if (checked) {
        recommendedItems = [...recommendedItems, value];
    } else {
        recommendedItems = recommendedItems.filter(ele => ele !== value);
    }

    setRecommendedItems(recommendedItems)
}

    const handleSubmit = (e) => {
      e.preventDefault();
      const currentDate = (new Date()).toLocaleDateString('en-GB');
      const currentTime = (new Date()).toLocaleTimeString();
      onSave({
        SSname,
        SSmobileno,
        district,
        block,
        occupation,
        recommendedItems,
        recommendingPerson,
        nameofvahiniorpadayatri,
        mobilenoofvahiniorpadayatri,
        campCluster,
        personname,
        personnumber,
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
            <h1 className='popup-heading'>{sansthapakSadasyaFormLabel}</h1>
            <p onClick={onChangeLanguage} style={{textAlign:'right'}}><IoLanguage/></p>
            </div>
            <label htmlFor="ssname" className="form-label">{sansthapakNameLabel}</label>
      <br/>
      <input
        type="text"
        id="ssname"
        className="ytmcregister-user-input"
        placeholder="Enter the Name of the Sansthapak Sadasya"
        value={SSname}
        onChange={(e) => setSSName(e.target.value)}
        required
      />
      <br/>
      <label htmlFor="ssmobile" className="form-label">{sansthapakMobileLabel}</label>
      <br/>
      <input
        style={{ width: '100%' }}
        type="text"
        id="ssmobile"
        className="ytmcregister-user-input"
        placeholder="Enter the Mobile Number"
        value={SSmobileno}
        onChange={(e) => setSSMobile(e.target.value)}
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
      <label className='form-label' htmlFor="occupation">{occupationLabel}</label>
      <br/>
      <select 
        onChange={onChangeOccupation} 
        className="ytmcregister-user-input"
        id="occupation" 
        required 
        value={occupation}
      >
        <option value="" disabled>Select Occupation</option>
        {occupationOptions.map((name, index) => (
          <option key={index} value={occupationsInEnglish[index]}>{name}</option>
        ))}
      </select>
      {(occupation === "Other" || occupation=== "अन्य" )&& (
        <div className="ytmcregister-cont-ele">
          <label htmlFor="otherOccupation" className="form-label">If Other, Then</label>
          <br/>
          <input
            type="text"
            id="otherOccupation"
            className="ytmcregister-user-input"
            placeholder="Please specify"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            required
          />
        </div>
      )}
      <label htmlFor="accessitems" className="form-label">{recommendationLabel}</label>
      <br/>
      {checkboxOptions.map((option,index) => (
        <div className="ytmcregister-user-input" key={option}>
          <input style={{ marginRight: '10px' }} type="checkbox" id={option} value={canssberecommendedInEnglish[index]} onChange={onChangeRecommendedItems}/>
          <label className='form-label' htmlFor={option}>{option}</label>
        </div>
      ))}
      <p className='form-label'>{successfulPersonLabel}</p>
      <label htmlFor="personname" className="form-label">{personNameLabel}</label>
      <br/>
      <input
        style={{ width: '100%' }}
        type="text"
        id="personname"
        className="ytmcregister-user-input"
        placeholder="Enter the Person Name"
        value={personname}
        onChange={(e) => setPersonName(e.target.value)}
      />
      <br/>
      <label htmlFor="personnumber" className="form-label">{personMobileLabel}</label>
      <input
        style={{ width: '100%' }}
        type="text"
        id="personnumber"
        className="ytmcregister-user-input"
        placeholder="Enter the Person Number"
        value={personnumber}
        onChange={(e) => setPersonNumber(e.target.value)}
      />
      <label htmlFor="nameofvahini" className="form-label">{vahiniNameLabel}</label>
      <br/>
      <input
        type="text"
        id="nameofvahini"
        className="ytmcregister-user-input"
        placeholder="Enter the Name of the Vahini/Padayatri"
        value={nameofvahiniorpadayatri}
        onChange={(e) => setNameOfVahiniOrPadayatri(e.target.value)}
        required
      />
      <label htmlFor="mobileofvahini" className="form-label">{vahiniMobileLabel}</label>
      <br/>
      <input
        type="text"
        id="mobileofvahini"
        className="ytmcregister-user-input"
        placeholder="Enter the Mobile of the Vahini/Padayatri"
        value={mobilenoofvahiniorpadayatri}
        onChange={(e) => setMobileNoOfVahiniOrPadayatri(e.target.value)}
        required
      />

            {/* <label htmlFor="founderName" className="form-label">संस्थापक सदस्य नाम:</label>
            <input
              type="text"
              id="founderName"
              className="form-input"
              placeholder="Enter संस्थापक सदस्य नाम"
              value={founderName}
              onChange={(e) => setFounderName(e.target.value)}
              required
            />
            <label htmlFor="founderMobile" className="form-label">संस्थापक सदस्य मोबाइल नंबर:</label>
            <input
              type="text"
              id="founderMobile"
              className="form-input"
              placeholder="Enter संस्थापक सदस्य मोबाइल नंबर"
              value={founderMobile}
              onChange={(e) => setFounderMobile(e.target.value)}
              required
            />
            <label htmlFor="district" className="form-label">जिला:</label>
            <input
              type="text"
              id="district"
              className="form-input"
              placeholder="Enter जिला"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
            <label htmlFor="occupation" className="form-label">पेशा:</label>
            <input
              type="text"
              id="occupation"
              className="form-input"
              placeholder="Enter पेशा"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              required
            />
            <label htmlFor="perception" className="form-label">वाहिनी / पदयात्री के नज़र में यह संस्थापक सदस्य:</label>
            <input
              type="text"
              id="perception"
              className="form-input"
              placeholder="Enter नज़र"
              value={perception}
              onChange={(e) => setPerception(e.target.value)}
              required
            />
            <label htmlFor="successPerson" className="form-label">संस्थापक सदस्य के लिए सवाल:</label>
            <input
              type="text"
              id="successPerson"
              className="form-input"
              placeholder="Enter सवाल"
              value={successPerson}
              onChange={(e) => setSuccessPerson(e.target.value)}
              required
            />
            <label htmlFor="visitorName" className="form-label">वाहिनी / पदयात्री का नाम:</label>
            <input
              type="text"
              id="visitorName"
              className="form-input"
              placeholder="Enter नाम"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              required
            />
            <label htmlFor="visitorMobile" className="form-label">वाहिनी / पदयात्री का मोबाइल नंबर:</label>
            <input
              type="text"
              id="visitorMobile"
              className="form-input"
              placeholder="Enter मोबाइल नंबर"
              value={visitorMobile}
              onChange={(e) => setVisitorMobile(e.target.value)}
              required
            /> */}
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
          <h1 className='main-ss'>Sansthapak Sadasaya</h1>
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
                <li className="empty-list">The SS List is Empty. Click on the New to Add SS Report</li>
              </div>
            ) : (
              users.map((user, index) => (
                <li key={index} className="ss-users-list" onClick={() => setSelectedItem(index)}>
                  <div className='ss-list-column'>
                    <p className='list-ss-name'>Sansthapak Sadasya: {user.SSname}</p>
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
        <td className="parameter">SS Name</td>
        <td className="value">{users[selectedItem].SSname}</td>
      </tr>
      <tr>
        <td className="parameter">SS Mobile Number</td>
        <td className="value">{users[selectedItem].SSmobileno}</td>
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
        <td className="parameter">Occupation</td>
        <td className="value">{users[selectedItem].occupation}</td>
      </tr>
      <tr>
        <td className="parameter">SS Recommended For the following</td>
        <td className="value">{(users[selectedItem].recommendedItems).join("\n")}</td>
      </tr>
      {users[selectedItem].personname && users[selectedItem].personnumber
      && (
        <>
        <tr>
        <td className="parameter">Name of the Person</td>
        <td className="value">{users[selectedItem].personname}</td>
      </tr>
      <tr>
      <td className="parameter">Mobile No of person</td>
      <td className="value">{users[selectedItem].personnumber}</td>
    </tr>
    </>
      )}
      <tr>
        <td className='parameter'>Name of Vahini/Padayatri</td>
        <td className='value'>{users[selectedItem].nameofvahiniorpadayatri}</td>
      </tr>
      <tr>
        <td className='parameter'>Mobile No of Vahini/Padayatri</td>
        <td className='value'>{users[selectedItem].mobilenoofvahiniorpadayatri}</td>
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

export default SS;
