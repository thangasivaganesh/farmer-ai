// Government Agriculture Schemes Service for Farmer AI
// Verified state and central government welfare initiatives

export interface SchemeItem {
  id: string;
  name: string;
  nameTa: string;
  department: string;
  departmentTa: string;
  description: string;
  descriptionTa: string;
  eligibility: string[];
  eligibilityTa: string[];
  benefits: string;
  benefitsTa: string;
  documents: string[];
  documentsTa: string[];
  startDate: string;
  deadline: string;
  officialSource: string;
  officialUrl: string;
  status: "VERIFIED" | "DEMO";
}

export const OFFICIAL_SCHEMES: SchemeItem[] = [
  {
    id: "sch-1",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    nameTa: "பிரதான் மந்திரி கிசான் சம்மான் நிதி (PM-KISAN)",
    department: "Ministry of Agriculture & Farmers Welfare, Govt of India",
    departmentTa: "மத்திய வேளாண்மை மற்றும் உழவர் நலத்துறை",
    description: "Direct income support of ₹6,000 per year in three equal 4-monthly installments of ₹2,000 to all landholding farmer families across the country.",
    descriptionTa: "அனைத்து நிலம் வைத்துள்ள விவசாயக் குடும்பங்களுக்கும் ஆண்டுக்கு ₹6,000 வீதம் 3 தவணைகளில் தலா ₹2,000 நேரடியாக வங்கிக் கணக்கில் வரவு வைக்கப்படுகிறது.",
    eligibility: [
      "Small and marginal landholder farmer families with cultivable land",
      "Valid land ownership record (Patta/Chitta)",
      "Aadhaar-seeded active bank account",
      "Institutional landholders and income-tax payees are excluded"
    ],
    eligibilityTa: [
      "விவசாய நிலம் வைத்துள்ள சிறு மற்றும் குறு விவசாயிகள்",
      "பட்டா / சிட்டா நில உரிமை ஆவணம்",
      "ஆதார் எண் இணைக்கப்பட்ட வங்கிக் கணக்கு",
      "வருமான வரி செலுத்துவோர் மற்றும் அரசு ஊழியர்கள் தவிர்த்து"
    ],
    benefits: "₹6,000 annually credited directly via DBT into bank accounts",
    benefitsTa: "ஆண்டுக்கு ₹6,000 நேரடி வங்கிப் பரிமாற்றம் மூலம் 3 தவணைகளில் வழங்கப்படும்",
    documents: [
      "Aadhaar Card",
      "Land Ownership Documents (Patta / Chitta)",
      "Bank Account Passbook Copy"
    ],
    documentsTa: [
      "ஆதார் அட்டை",
      "பட்டா / சிட்டா ஆவண நகல்",
      "வங்கி கணக்கு புத்தக நகல்"
    ],
    startDate: "Ongoing Scheme",
    deadline: "Open All Year (Continuous Registration)",
    officialSource: "Ministry of Agriculture & Farmers Welfare",
    officialUrl: "https://pmkisan.gov.in/",
    status: "VERIFIED"
  },
  {
    id: "sch-2",
    name: "Tamil Nadu Micro Irrigation Scheme (Per Drop More Crop)",
    nameTa: "தமிழ்நாடு முதலமைச்சரின் நுண்ணீர்ப் பாசனத் திட்டம்",
    department: "Department of Horticulture and Plantation Crops, Tamil Nadu",
    departmentTa: "தோட்டக்கலை மற்றும் மலைப்பயிர்கள் துறை, தமிழ்நாடு அரசு",
    description: "100% subsidy for small and marginal farmers (up to 5 acres) and 75% subsidy for other farmers for installing drip and sprinkler irrigation systems.",
    descriptionTa: "சிறு மற்றும் குறு விவசாயிகளுக்கு (5 ஏக்கர் வரை) 100% மானியத்திலும், இதர விவசாயிகளுக்கு 75% மானியத்திலும் சொட்டுநீர் மற்றும் தெளிப்புநீர் பாசனக் கருவிகள் வழங்கப்படுகின்றன.",
    eligibility: [
      "Farmers having assured irrigation water source (well/borewell)",
      "Valid water test and soil health report",
      "Land ownership patta or registered lease deed"
    ],
    eligibilityTa: [
      "கிணறு அல்லது ஆழ்துளைக் கிணறு போன்ற பாசன நீர் ஆதாரம் கொண்ட விவசாயிகள்",
      "மண் மற்றும் நீர் பரிசோதனை அறிக்கை",
      "பட்டா அல்லது பதிவு செய்யப்பட்ட குத்தகை ஆவணம்"
    ],
    benefits: "100% subsidy for Small/Marginal farmers; 75% subsidy for other farmers",
    benefitsTa: "சிறு/குறு விவசாயிகளுக்கு 100% மானியம்; இதர விவசாயிகளுக்கு 75% அரசு மானியம்",
    documents: [
      "Patta, Chitta and FMB Sketch",
      "Adangal copy from Village Administrative Officer (VAO)",
      "Small / Marginal Farmer Certificate",
      "Aadhaar Card & Passport size photos"
    ],
    documentsTa: [
      "பட்டா, சிட்டா மற்றும் நில வரைபடம் (FMB)",
      "கிராம நிர்வாக அலுவலர் (VAO) வழங்கிய அடங்கல் நகல்",
      "சிறு / குறு விவசாயி சான்றிதழ்",
      "ஆதார் அட்டை மற்றும் புகைப்படங்கள்"
    ],
    startDate: "Active Financial Year 2026-27",
    deadline: "Available on first-come-first-served basis via Uzhavan App",
    officialSource: "TNHORTICULTURE / Uzhavan App",
    officialUrl: "https://tnhorticulture.tn.gov.in/",
    status: "VERIFIED"
  },
  {
    id: "sch-3",
    name: "Sub-Mission on Agricultural Mechanization (SMAM)",
    nameTa: "வேளாண் இயந்திரமயமாக்கும் துணை இயக்கம் (SMAM)",
    department: "Agricultural Engineering Department, Government of Tamil Nadu",
    departmentTa: "வேளாண்மைப் பொறியியல் துறை, தமிழ்நாடு அரசு",
    description: "Financial assistance from 40% to 50% for purchasing individual farm machinery (tractors, power tillers, rotavators) and up to 80% for setting up Custom Hiring Centers.",
    descriptionTa: "டிராக்டர்கள், பவர் டில்லர்கள், ரோட்டாவேட்டர்கள் வாங்க 40% முதல் 50% வரையிலும், வேளாண் இயந்திர வாடகை மையங்கள் அமைக்க 80% வரையிலும் அரசு மானியம்.",
    eligibility: [
      "Individual farmers, Women farmers, and SC/ST farmers given priority",
      "Farmer groups and Farmer Producer Organizations (FPOs)"
    ],
    eligibilityTa: [
      "தனிநபர் விவசாயிகள், பெண் விவசாயிகள், ஆதிதிராவிடர் விவசாயிகளுக்கு முன்னுரிமை",
      "உழவர் உற்பத்தியாளர் நிறுவனங்கள் (FPO) மற்றும் குழுக்கள்"
    ],
    benefits: "₹50,000 to ₹5,00,000 subsidy on approved agricultural machinery models",
    benefitsTa: "அரசு அனுமதித்த இயந்திரங்களுக்கு ₹50,000 முதல் ₹5,00,000 வரை நேரடி மானியம்",
    documents: [
      "Aadhaar Card",
      "Land Chitta copy",
      "Quotation from authorized implement dealer",
      "Bank Account details"
    ],
    documentsTa: [
      "ஆதார் அட்டை",
      "சிட்டா நகல்",
      "அங்கீகரிக்கப்பட்ட விற்பனையாளரிடமிருந்து விலைப்புள்ளி (Quotation)",
      "வங்கி கணக்கு விவரங்கள்"
    ],
    startDate: "Current Fiscal",
    deadline: "Subject to District Quota Allotment",
    officialSource: "Agricultural Engineering Department TN",
    officialUrl: "https://aed.tn.gov.in/",
    status: "VERIFIED"
  },
  {
    id: "sch-4",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY) Crop Insurance",
    nameTa: "பிரதான் மந்திரி பயிர் காப்பீட்டுத் திட்டம் (PMFBY)",
    department: "Agriculture & Farmers Welfare Department, Tamil Nadu",
    departmentTa: "வேளாண்மை மற்றும் உழவர் நலத்துறை, தமிழ்நாடு அரசு",
    description: "Comprehensive risk insurance covering yield losses due to non-preventable natural risks such as drought, floods, inundation, pests, and cyclones.",
    descriptionTa: "வறட்சி, வெள்ளம், புயல் மற்றும் பூச்சித் தாக்குதலால் ஏற்படும் விளைச்சல் இழப்புகளுக்கு மிகக்குறைந்த பிரிமியத்தில் விரிவான பயிர்க் காப்பீடு.",
    eligibility: [
      "All farmers growing notified crops in notified revenue villages",
      "Both loanee and non-loanee farmers are eligible"
    ],
    eligibilityTa: [
      "அறிவிக்கப்பட்ட கிராமங்களில் அறிவிக்கப்பட்ட பயிர்களை சாகுபடி செய்யும் விவசாயிகள்",
      "வங்கி கடன் பெற்ற மற்றும் கடன் பெறாத அனைத்து விவசாயிகளும் தகுதியானவர்கள்"
    ],
    benefits: "Up to 100% sum insured payout based on crop cutting experiment yield loss",
    benefitsTa: "அறுவடை பரிசோதனை மகசூல் இழப்பின் அடிப்படையில் முழு காப்பீட்டுத் தொகை",
    documents: [
      "Adangal / Sowing Certificate from VAO",
      "Patta / Chitta document",
      "Aadhaar Card",
      "Bank Passbook"
    ],
    documentsTa: [
      "VAO அடங்கல் / சாகுபடி சான்றிதழ்",
      "பட்டா / சிட்டா ஆவணம்",
      "ஆதார் அட்டை",
      "வங்கி கணக்கு புத்தகம்"
    ],
    startDate: "Samba / Thaladi Season Registration Open",
    deadline: "November 30, 2026 (Paddy II / Samba Season)",
    officialSource: "PMFBY National Portal",
    officialUrl: "https://pmfby.gov.in/",
    status: "VERIFIED"
  }
];

export async function getSchemes(query?: string): Promise<SchemeItem[]> {
  if (!query) return OFFICIAL_SCHEMES;
  const q = query.toLowerCase();
  return OFFICIAL_SCHEMES.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.nameTa.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
  );
}
