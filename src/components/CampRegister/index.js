import React, { useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import {useNavigate, useLocation } from 'react-router-dom';
// import {useHistory} from 'react-router-dom'
import DistrictItem from '../DistrictItem';
import { IoLanguage } from "react-icons/io5";
import "./index.css"
const constituencies = {
  "SELECT" : ['SELECT'],
  "PASCHIM CHAMPARAN": [
    "Valmiki Nagar",
    "Ramnagar (SC)",
    "Narkatiaganj",
    "Bagaha",
    "Lauriya",
    "Nautan",
    "Chanpatia",
    "Bettiah",
    "Sikta"
  ],
  "PURVI CHAMPARAN": [
    "Raxaul",
    "Sugauli",
    "Narkatia",
    "Harsidhi (SC)",
    "Govindganj",
    "Kesaria",
    "Kalyanpur",
    "Pipra",
    "Madhuban",
    "Motihari",
    "Chiraia",
    "Dhaka"
  ],
  "SHEOHAR": ["Sheohar"],
  "SITAMARHI": [
    "Riga",
    "Bathnaha (SC)",
    "Parihar",
    "Sursand",
    "Bajpatti",
    "Sitamarhi",
    "Runnisaidpur",
    "Belsand"
  ],
  "MADHUBANI": [
    "Harlakhi",
    "Benipatti",
    "Khajauli",
    "Babubarhi",
    "Bisfi",
    "Madhubani",
    "Rajnagar (SC)",
    "Jhanjharpur",
    "Phulparas",
    "Laukaha"
  ],
  "SUPAUL": [
    "Nirmali",
    "Pipra",
    "Supaul",
    "Triveniganj (SC)",
    "Chhatapur"
  ],
  "ARARIA": [
    "Narpatganj",
    "Raniganj (SC)",
    "Forbesganj",
    "Araria",
    "Jokihat",
    "Sikti"
  ],
  "KISHANGANJ": [
    "Bahadurganj",
    "Thakurganj",
    "Kishanganj",
    "Kochadhaman"
  ],
  "PURNIA": [
    "Amour",
    "Baisi",
    "Kasba",
    "Banmankhi (SC)",
    "Rupauli",
    "Dhamdaha",
    "Purnia"
  ],
  "KATIHAR": [
    "Katihar",
    "Kadwa",
    "Balrampur",
    "Pranpur",
    "Manihari (ST)",
    "Barari",
    "Korha (SC)"
  ],
  "MADHEPURA": [
    "Alamnagar",
    "Bihariganj",
    "Singheshwar (SC)",
    "Madhepura"
  ],
  "SAHARSA": [
    "Sonbarsha (SC)",
    "Saharsa",
    "Simri Bakhtiarpur",
    "Mahishi"
  ],
  "DARBHANGA": [
    "Kusheshwar Asthan (SC)",
    "Gaura Bauram",
    "Benipur",
    "Alinagar",
    "Darbhanga Rural",
    "Darbhanga",
    "Hayaghat",
    "Bahadurpur",
    "Keoti",
    "Jale"
  ],
  "MUZAFFARPUR": [
    "Gaighat",
    "Aurai",
    "Minapur",
    "Bochaha (SC)",
    "Sakra (SC)",
    "Kurhani",
    "Muzaffarpur",
    "Kanti",
    "Baruraj",
    "Paroo",
    "Sahebganj"
  ],
  "GOPALGANJ": [
    "Baikunthpur",
    "Barauli",
    "Gopalganj",
    "Kuchaikote",
    "Bhorey (SC)",
    "Hathua"
  ],
  "SIWAN": [
    "Siwan",
    "Ziradei",
    "Darauli (SC)",
    "Raghunathpur",
    "Daraundha",
    "Barharia",
    "Goriakothi",
    "Maharajganj"
  ],
  "SARAN": [
    "Ekma",
    "Manjhi",
    "Baniapur",
    "Taraiya",
    "Marhaura",
    "Chapra",
    "Garkha (SC)",
    "Amnour",
    "Parsa",
    "Sonepur"
  ],
  "VAISHALI": [
    "Hajipur",
    "Lalganj",
    "Vaishali",
    "Mahua",
    "Raja Pakar (SC)",
    "Raghopur",
    "Mahnar",
    "Patepur (SC)"
  ],
  "SAMASTIPUR": [
    "Kalyanpur (SC)",
    "Warisnagar",
    "Samastipur",
    "Ujiarpur",
    "Morwa",
    "Sarairanjan",
    "Mohiuddinnagar",
    "Bibhutipur",
    "Rosera (SC)",
    "Hasanpur"
  ],
  "BEGUSARAI": [
    "Cheria Bariarpur",
    "Bachhwara",
    "Teghra",
    "Matihani",
    "Sahebpur Kamal",
    "Begusarai",
    "Bakhri (SC)"
  ],
  "KHAGARIA": [
    "Alauli (SC)",
    "Khagaria",
    "Beldaur",
    "Parbatta"
  ],
  "BHAGALPUR": [
    "Bihpur",
    "Gopalpur",
    "Pirpainti (SC)",
    "Kahalgaon",
    "Bhagalpur",
    "Sultanganj",
    "Nathnagar"
  ],
  "BANKA": [
    "Amarpur",
    "Dhauraiya (SC)",
    "Banka",
    "Katoria (ST)",
    "Belhar"
  ],
  "MUNGER": [
    "Tarapur",
    "Munger",
    "Jamalpur"
  ],
  "LAKHISARAI": [
    "Suryagarha",
    "Lakhisarai"
  ],
  "SHEIKHPURA": [
    "Sheikhpura",
    "Barbigha"
  ],
  "NALANDA": [
    "Asthawan",
    "Biharsharif",
    "Rajgir (SC)",
    "Islampur",
    "Hilsa",
    "Nalanda",
    "Harnaut"
  ],
  "PATNA": [
      "Mokama",
      "Barh",
      "Bakhtiarpur",
      "Digha",
      "Bankipur",
      "Kumhrar",
      "Patna Sahib",
      "Fatuha",
      "Danapur",
      "Maner",
      "Phulwari (SC)",
      "Masaurhi (SC)",
      "Paliganj",
      "Bikram"
    ],
    "BHOJPUR": [
      "Sandesh",
      "Barhara",
      "Arrah",
      "Agiaon (SC)",
      "Tarari",
      "Jagdishpur",
      "Shahpur"
    ],
    "BUXAR": [
      "Brahampur",
      "Buxar",
      "Dumraon",
      "Rajpur (SC)"
    ],
    "KAIMUR (BHABHUA)": [
      "Ramgarh",
      "Mohania (SC)",
      "Bhabua",
      "Chainpur"
    ],
    "ROHTAS": [
      "Chenari (SC)",
      "Sasaram",
      "Kargahar",
      "Dinara",
      "Nokha",
      "Dehri",
      "Karakat"
    ],
    "ARWAL": [
      "Arwal",
      "Kurtha"
    ],
    "JAHANABAD": [
      "Jehanabad",
      "Ghosi",
      "Makhdumpur (SC)"
    ],
    "AURANGABAD": [
      "Goh",
      "Obra",
      "Nabinagar",
      "Kutumba (SC)",
      "Aurangabad",
      "Rafiganj"
    ],
    "GAYA": [
      "Gurua",
      "Sherghati",
      "Imamganj (SC)",
      "Barachatti (SC)",
      "Bodh Gaya (SC)",
      "Gaya Town",
      "Tikari",
      "Belaganj",
      "Atri",
      "Wazirganj"
    ],
    "NAWADA": [
      "Rajauli (SC)",
      "Hisua",
      "Nawada",
      "Gobindpur",
      "Warsaliganj"
    ],
    "JAMUI": [
      "Sikandra (SC)",
      "Jamui",
      "Jhajha",
      "Chakai"
    ]
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

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
]

const blocks = {
  "SELECT" : ["SELECT"],
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

const campClusters = [
  "Begusarai",
  "Bhagalpur",
  "Buxar",
  "Darbhanga",
  "East Champaran",
  "Gaya",
  "Gopalganj",
  "Katihar",
  "Madhepura",
  "Madhubani",
  "Muzaffarpur",
  "Nalanda",
  "Nawada",
  "Sitamarhi",
  "Vaishali"
];


const CampRegister = () => {
    const [name, setName] = useState('');
    const [campCluster, setChannelUrl] = useState('');
    const [state, setState] = useState('Bihar');
    const [district, setDistrict] = useState('SELECT');
    const [constituency, setConstituency] = useState('SELECT');
    const [photo, setPhoto] = useState('');
    const [mobileno, setMobileNumber] = useState('');
    const [selectedConstituency, setSelectedConstituency] = useState('SELECT');
    const [registeredStatus, setRegisteredStatus] = useState(false);
    const [referral, setReferral] = useState('');
    const [block,setBlock] = useState('SELECT');
    const [dob,setDob] = useState('');
    const [fathername,setFatherName] = useState('');
    const [panchayat, setPanchayat] = useState('');
    const [village, setVillage] = useState('');
    const [aadhaarNo, setAadhaarNo] = useState('');
    const [language, setLanguage] = useState('english');


    const navigate = useNavigate();
    const location = useLocation();
    // const history = useHistory();
    const {Googlename,email} = location.state

    const onChangeName = (event) => setName(event.target.value);
    const onChangeCampCluster = (event) => setChannelUrl(event.target.value);
    const onChangeState = (event) => setState(event.target.value);
    const onChangeDistrict = (event) => {
        setDistrict(event.target.value);
        setSelectedConstituency(constituencies[event.target.value][0]);
        setBlock(blocks[event.target.value][0])
        console.log(event.target.value)
        console.log(blocks[event.target.value])
    };
    const onChangeConstituency = (event) => setSelectedConstituency(event.target.value);
    const onChangePhoto = (event) => setPhoto(event.target.files[0]);
    const onChangeMobileNo = (event) => setMobileNumber(event.target.value);
    const onChangeBlock = (event) => setBlock(event.target.value)
    const onChangeReferral = (event) => setReferral(event.target.value)
    const onChangeDob = (event) => setDob(event.target.value)
    const onChangeFatherName = (event) => setFatherName(event.target.value)
    const onChangePanchayat = (event) => setPanchayat(event.target.value)
    const onChangeVillage = (event) => setVillage(event.target.value)
    const onChangeAadhaarNo = (event) => setAadhaarNo(event.target.value)
    const onChangeLanguage = (event) => {
      if(language==="english")
        setLanguage("hindi")
      else
      setLanguage("english")
    }

    

    const postData = async (value) => {
      let options = {
        method : "POST",
        headers : {
          "Content-Type":"application/json"
        },
        body : JSON.stringify(value)
      }
      const response = await fetch("https://js-member-backend.vercel.app/campusers",options)
      const data = await response.json()
      console.log(data)
    }

    const onSubmitRegisterYTMC = (event) => {
      const currDate = (new Date()).toLocaleDateString('en-GB');
      const currTime = (new Date()).toLocaleTimeString()
        event.preventDefault();
        if(district==="SELECT")
          alert("Please fill the district")
        else {
        const formData = {
            name,
            campCluster,
            dob,
            fathername,
            // state,
            district,
            // constituency: selectedConstituency,
            block,
            panchayat,
            village,
            aadhaarNo,
            mobileno,
            referral,
            Googlename,
            email,
            regstatus:"pending",
            kycstatus : "pending",
            date : currDate,
            time : currTime,
            person:"member",
            addedToTeam : false
        };
        // console.log(formData)
        postData(formData);
        // history.replace("/regpending")
        navigate("/regpending",{replace:true})
        setRegisteredStatus(!registeredStatus);
      }
    };

    const onLogOut = () => {
        googleLogout();
        navigate("/",{replace:true})
    };

    const campregistrationlabel = language==="english"?"Camp Registration Form":"कैम्प पंजीकरण फॉर्म"
    const campclusterlabel = language==="english"?"Camp Cluster":"कैम्प क्लस्टर";
    const namelabel = language==="english"?"Name":"नाम"
    const doblabel = language==="english"?"D.O.B":"जन्म तिथी"
    const fathernamelabel = language==="english"?"Father Name":"पिता का नाम"
    const districtlabel = language==="english"?"District":"जिला"
    const blocklabel = language==="english"?"Block":"प्रखण्ड"
    const panchayatlabel = language==="english"?"Panchayat":"पंचायत"
    const villagelabel = language==="english"?"Village":"गाँव"
    const aadharnolabel = language==="english"?"Aadhaar Number":"आधार नंबर"
    const mobilenolabel = language==="english"?"Mobile Number":"मोबाईल नंबर"
    const referrallabel = language==="english"?"Referral":"किसके द्वारा लाए गए"

    return (
      <div className="ytmcregister-main-container">
          {registeredStatus===false && (
              <>
          <div className="ytmcregister-top-container">
          <p onClick={onChangeLanguage} style={{textAlign:'right'}}><IoLanguage/></p>
              <h1>{campregistrationlabel}</h1>
          </div>
          <div className="ytmcregister-form-container">
          <form onSubmit={onSubmitRegisterYTMC}>
              <div className="ytmcregister-cont-ele">
              <label htmlFor="campcluster">{campclusterlabel}</label>
              <br/>
              <select 
              onChange={onChangeCampCluster} 
              className="ytmcregister-user-input"
              id="campCluster" 
              required 
              value={campCluster}
          >
              <option value="" disabled>Select Camp Cluster</option>
              {campClusters.map((name, index) => (
                  <option key={index} value={name}>{name}</option>
              ))}
          </select>
          </div>
              <div className="ytmcregister-cont-ele">
              <label htmlFor="username">{namelabel}</label>
              <br/>
              <input placeholder="Enter the Name" onChange={onChangeName} className="ytmcregister-user-input" type="text" id="username" required/>
              </div>

              <div className="ytmcregister-cont-ele">
              <label htmlFor="dob">{doblabel}</label>
              <br/>
              <input placeholder="Enter the D.O.B" onChange={onChangeDob} className="ytmcregister-user-input" type="date" id="dob" required/>
              </div>

              <div className="ytmcregister-cont-ele">
              <label htmlFor="fathername">{fathernamelabel}</label>
              <br/>
              <input placeholder="Enter the Father Name" onChange={onChangeFatherName} className="ytmcregister-user-input" type="text" id="fathername" required/>
              </div>

              

                                      {/* <input placeholder="Enter the Camp Name" onChange={this.onChangeCampName} className="rcyt-user-input" type="text" id="campName" required value={campName}/> */}
            
              {/* <div className="ytmcregister-cont-ele">
                  <label htmlFor="state">State</label>
                  <br/>
                  <select className="ytmcregister-user-input" id="state" onChange={onChangeState} value={state}>
                      {states.map((ele) =>  <option key={ele}>{ele}</option>)}
                  </select>
                   <input placeholder="Enter the State : E.g: Bihar" onChange={onChangeState} type="text" className="ytmchome-user-input" required/> 
              </div> */}
              <div className="ytmcregister-cont-ele">
                  <label htmlFor="district">{districtlabel}</label>
                  <br/>
                  <select onChange={onChangeDistrict} id="district" className="ytmcregister-user-input">
                      <option disabled>SELECT</option>
                      {options.map((ele) => <DistrictItem key={ele.OptionId} optionDetails={ele} checked/>)}
                  </select>
                  </div>
                  {/* <div className="ytmcregister-cont-ele">
                  <label htmlFor="constituency">Constituency</label>
                  <br/>
                  <select onChange={onChangeConstituency} id="constituency" className="ytmcregister-user-input" >
                      {constituencies[district].map((ele) => (<option key={ele} value={ele}>{ele}</option>))}
                  </select>
              </div> */}
              <div className="ytmcregister-cont-ele">
                  <label htmlFor="block">{blocklabel}</label>
                  <br/>
                  <select onChange={onChangeBlock} id="block" className="ytmcregister-user-input" >
                      {blocks[district].map((ele) => (<option key={ele} value={ele}>{ele}</option>))}
                  </select>
                  </div>
              {/* <div className="ytmcregister-cont-ele">
                  <label htmlFor="photo">Photo</label>
                  <br/>
                  <input className="ytmcregister-user-input" onChange={onChangePhoto} type="file" id="photo" required/>
              </div> */}

<div className="ytmcregister-cont-ele">
              <label htmlFor="panchayat">{panchayatlabel}</label>
              <br/>
              <input placeholder="Enter the Panchayat" onChange={onChangePanchayat} className="ytmcregister-user-input" type="text" id="panchayat" required/>
              </div>

              <div className="ytmcregister-cont-ele">
              <label htmlFor="village">{villagelabel}</label>
              <br/>
              <input placeholder="Enter the Village" onChange={onChangeVillage} className="ytmcregister-user-input" type="text" id="village" required/>
              </div>

              <div className="ytmcregister-cont-ele">
              <label htmlFor="aadhaar">{aadharnolabel}</label>
              <br/>
              <input placeholder="Enter the Aadhaar No" onChange={onChangeAadhaarNo} className="ytmcregister-user-input" type="text" id="aadhaar" required/>
              </div>

              <div className="ytmcregister-cont-ele">
                  <label htmlFor="mobileno">{mobilenolabel}</label>
                  <br/>
                  <input onChange={onChangeMobileNo} placeholder="Enter the Mobile No E.g : 987654321" className="ytmcregister-user-input" type="tel" id="mobileno" required/>
              </div>

              <div className="ytmcregister-cont-ele">
              <label htmlFor="referral">{referrallabel}</label>
              <br/>
              <input placeholder="Enter the Referral" onChange={onChangeReferral} className="ytmcregister-user-input" type="text" id="referral"/>
              </div>
              <div style={{textAlign:'center',marginTop:'10px'}}>
              <button style={{fontSize:'18px'}} className="fetchBtn" type="submit">Submit</button>
              </div>
          </form>
      </div>
      </>
      )}
      {/* {registeredStatus && (
          <div style={{textAlign:'center'}} className="ytmcregister-form-container">
              <img style={{height:'50px',width:'50px'}} src="https://imgs.search.brave.com/pCrYBKil64ozCVM6c4QGMgFj6qCLcSGLMTSRHJOimbw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzgxLzM0Lzc4/LzM2MF9GXzU4MTM0/Nzg5N19zZ1lnVEVR/MFBCSEtONER3dXhX/UkFucGxOemtlNXNk/Ni5qcGc" alt="image"/>
              <h1>Your Registration is Pending...</h1>
              <p>We will get back to you soon.</p>
              <button onClick={onLogOut} type="button" className="last24HrsBtn">Log Out</button>
          </div>
      )} */}
      </div>
      )
    }

export default CampRegister