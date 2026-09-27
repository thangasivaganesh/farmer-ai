// Scholarships Service for Farmer AI
// Verified agricultural scholarships and financial aid for farmers' children

export interface ScholarshipItem {
  id: string;
  name: string;
  nameTa: string;
  provider: string;
  providerTa: string;
  educationLevel: "All Levels" | "Higher Secondary" | "Diploma" | "Undergraduate" | "Postgraduate";
  educationLevelTa: string;
  eligibility: string[];
  eligibilityTa: string[];
  benefits: string;
  benefitsTa: string;
  deadline: string;
  documents: string[];
  documentsTa: string[];
  officialSource: string;
  officialUrl: string;
  status: "VERIFIED" | "DEMO";
}

export const OFFICIAL_SCHOLARSHIPS: ScholarshipItem[] = [
  {
    id: "sch-ug-1",
    name: "Chief Minister Uzhavar Pathukappu Thittam Educational Assistance",
    nameTa: "முதலமைச்சரின் உழவர் பாதுகாப்புத் திட்ட கல்வி உதவித்தொகை",
    provider: "Revenue & Disaster Management Department, Government of Tamil Nadu",
    providerTa: "வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை, தமிழ்நாடு அரசு",
    educationLevel: "Undergraduate",
    educationLevelTa: "இளங்கலை பட்டப்படிப்பு",
    eligibility: [
      "Children of farmers enrolled under the Tamil Nadu Agricultural Labourers Welfare Board",
      "Studying in recognized Arts, Science, Professional (Engineering, Agri, Medical) colleges",
      "Valid Uzhavar Pathukappu Membership Card"
    ],
    eligibilityTa: [
      "தமிழ்நாடு விவசாயிகள் சமூகப் பாதுகாப்பு நல வாரியத்தில் பதிவு செய்துள்ள விவசாயிகளின் வாரிசுகள்",
      "அங்கீகரிக்கப்பட்ட கலை, அறிவியல், பொறியியல் மற்றும் வேளாண் கல்லூரிகளில் பயிலும் மாணவர்கள்",
      "செல்லுபடியாகும் உழவர் அட்டை வைத்திருக்க வேண்டும்"
    ],
    benefits: "₹3,500 to ₹10,000 per annum depending on college course level",
    benefitsTa: "கல்விப் படிப்பைப் பொறுத்து ஆண்டுக்கு ₹3,500 முதல் ₹10,000 வரை கல்வி உதவித்தொகை",
    deadline: "October 31, 2026",
    documents: [
      "Uzhavar Pathukappu Card Copy",
      "College Bonafide Certificate",
      "Student Bank Account Passbook",
      "Aadhaar Card"
    ],
    documentsTa: [
      "உழவர் பாதுகாப்பு அட்டை நகல்",
      "கல்லூரி சேர்க்கைச் சான்றிதழ் (Bonafide Certificate)",
      "மாணவரின் வங்கிக் கணக்கு புத்தக நகல்",
      "ஆதார் அட்டை"
    ],
    officialSource: "Tamil Nadu Welfare Board Portal",
    officialUrl: "https://tnuwwb.tn.gov.in/",
    status: "VERIFIED"
  },
  {
    id: "sch-ug-2",
    name: "ICAR National Talent Scholarship (NTS) for B.Sc Agriculture",
    nameTa: "ICAR தேசிய திறமை உதவித்தொகை (வேளாண் படிப்பு)",
    provider: "Indian Council of Agricultural Research (ICAR), New Delhi",
    providerTa: "இந்திய வேளாண் ஆராய்ச்சிக் கழகம் (ICAR)",
    educationLevel: "Undergraduate",
    educationLevelTa: "இளங்கலை வேளாண்மை",
    eligibility: [
      "Admitted to state agricultural universities (such as TNAU) outside one's home state through CUET-ICAR examination",
      "Pursuing B.Sc (Hons) Agriculture, Horticulture, Forestry, or Agricultural Engineering"
    ],
    eligibilityTa: [
      "CUET-ICAR தேர்வு மூலம் தமிழ்நாடு வேளாண் பல்கலைக்கழகம் உள்ளிட்ட பல்கலைக்கழகங்களில் சேர்ந்த மாணவர்கள்",
      "பி.எஸ்சி (ஹானர்ஸ்) அக்ரி, தோட்டக்கலை அல்லது வேளாண் பொறியியல் பயில்வோர்"
    ],
    benefits: "₹3,000 per month throughout the 4-year degree program",
    benefitsTa: "4 ஆண்டு பட்டப்படிப்பு முழுவதும் மாதத்திற்கு ₹3,000 உதவித்தொகை",
    deadline: "November 15, 2026",
    documents: [
      "ICAR Allotment Letter",
      "Scorecard & Rank Card",
      "12th Standard Marksheet",
      "Nationalized Bank Account Details"
    ],
    documentsTa: [
      "ICAR சேர்க்கைக் கடிதம்",
      "மதிப்பெண் அட்டை",
      "12-ஆம் வகுப்பு மதிப்பெண் பட்டியல்",
      "வங்கி கணக்கு விவரங்கள்"
    ],
    officialSource: "ICAR Official Portal",
    officialUrl: "https://icar.org.in/",
    status: "VERIFIED"
  },
  {
    id: "sch-school-1",
    name: "Higher Secondary Agricultural Stipend for Farmers' Children",
    nameTa: "விவசாயிகள் குழந்தைகளுக்கான மேல்நிலைப் பள்ளி உதவித்தொகை",
    provider: "Tamil Nadu Directorate of School Education",
    providerTa: "பள்ளிக் கல்வித்துறை, தமிழ்நாடு",
    educationLevel: "Higher Secondary",
    educationLevelTa: "மேல்நிலைப் பள்ளி (11 & 12)",
    eligibility: [
      "Students studying 11th and 12th standard in Tamil Nadu Government or Government-aided schools",
      "Parents primarily engaged in agricultural cultivation or farm labor"
    ],
    eligibilityTa: [
      "தமிழ்நாடு அரசு அல்லது அரசு உதவிபெறும் பள்ளிகளில் 11 மற்றும் 12 ஆம் வகுப்பு பயிலும் மாணவர்கள்",
      "பெற்றோர் வேளாண்மை அல்லது விவசாயக் கூலி வேலை செய்பவராக இருத்தல் வேண்டும்"
    ],
    benefits: "₹2,500 annual scholarship deposited directly into student's account",
    benefitsTa: "ஆண்டுக்கு ₹2,500 மாணவரின் வங்கிக் கணக்கில் நேரடியாக வரவு வைக்கப்படும்",
    deadline: "December 20, 2026",
    documents: [
      "School Headmaster Certificate",
      "Parent Farmers Association / VAO Verification Certificate",
      "Aadhaar Card"
    ],
    documentsTa: [
      "பள்ளி தலைமை ஆசிரியர் சான்றிதழ்",
      "விவசாயத் தொழில் சான்றிதழ் (VAO மூலம்)",
      "ஆதார் அட்டை"
    ],
    officialSource: "TN School Education Department",
    officialUrl: "https://tnschools.gov.in/",
    status: "VERIFIED"
  }
];

export async function getScholarships(level?: string): Promise<ScholarshipItem[]> {
  if (!level || level === "all" || level === "All Levels") return OFFICIAL_SCHOLARSHIPS;
  return OFFICIAL_SCHOLARSHIPS.filter((s) => s.educationLevel.toLowerCase().includes(level.toLowerCase()));
}
