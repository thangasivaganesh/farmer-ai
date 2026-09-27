// Notification & Reminder Engine for Farmer AI
// Multi-category alerts with deduplication and user preference management

export type NotificationCategory =
  | "RAIN"
  | "HEAT"
  | "IRRIGATION"
  | "DISEASE"
  | "CROP"
  | "MARKET"
  | "MACHINERY"
  | "SCHEME"
  | "SCHOLARSHIP"
  | "REMINDER";

export interface FarmNotification {
  id: string;
  category: NotificationCategory;
  titleEn: string;
  titleTa: string;
  descriptionEn: string;
  descriptionTa: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  actionTextEn?: string;
  actionTextTa?: string;
}

export interface FarmReminder {
  id: string;
  title: string;
  category: string;
  targetDate: string;
  isCompleted: boolean;
  notes?: string;
  createdAt: string;
}

export const INITIAL_NOTIFICATIONS: FarmNotification[] = [
  {
    id: "notif-1",
    category: "RAIN",
    titleEn: "Precipitation Expected in Delta Region",
    titleTa: "டெல்டா மாவட்டங்களில் மழை வாய்ப்பு",
    descriptionEn: "Moderate showers forecast in next 24-48 hours. Postpone foliar spraying of fertilizers and pesticides.",
    descriptionTa: "அடுத்த 24-48 மணி நேரத்தில் மிதமான மழைக்கு வாய்ப்பு. உரம் மற்றும் பூச்சிக்கொல்லி தெளிப்பதை ஒத்திவைக்கவும்.",
    priority: "HIGH",
    timestamp: "10 mins ago",
    isRead: false,
    actionUrl: "/weather",
    actionTextEn: "View Weather Details",
    actionTextTa: "வானிலை விவரங்களைப் பார்",
  },
  {
    id: "notif-2",
    category: "SCHEME",
    titleEn: "PMFBY Crop Insurance: Samba Season Enrollment",
    titleTa: "பிரதான் மந்திரி பயிர் காப்பீடு: சம்பா பதிவு",
    descriptionEn: "Last date to enroll paddy crop under PMFBY insurance is approaching on November 30. Visit PACCS or e-Seva.",
    descriptionTa: "சம்பா நெற்பயிருக்கு பயிர் காப்பீடு செய்ய நவம்பர் 30 கடைசி நாள். தொடக்க வேளாண் கூட்டுறவு சங்கம் அல்லது இ-சேவை மையத்தை அணுகவும்.",
    priority: "URGENT",
    timestamp: "1 hour ago",
    isRead: false,
    actionUrl: "/schemes",
    actionTextEn: "Check Scheme Documents",
    actionTextTa: "திட்ட விவரங்களைக் காண்க",
  },
  {
    id: "notif-3",
    category: "MARKET",
    titleEn: "Paddy Price Firm at Thanjavur Uzhavar Sandhai",
    titleTa: "தஞ்சாவூர் உழவர் சந்தையில் நெல் விலை நிலவரம்",
    descriptionEn: "Current grade-A paddy quotes at ₹2,450/quintal. Estimated net realization higher due to low transport distance.",
    descriptionTa: "முதல் தர நெல் குவிண்டாலுக்கு ₹2,450 வரை விலை போகிறது. குறைந்த போக்குவரத்து தூரத்தால் நிகர லாபம் அதிகம்.",
    priority: "MEDIUM",
    timestamp: "3 hours ago",
    isRead: true,
    actionUrl: "/market",
    actionTextEn: "Compare Market Prices",
    actionTextTa: "சந்தைகளை ஒப்பிடுக",
  },
  {
    id: "notif-4",
    category: "MACHINERY",
    titleEn: "Combine Harvester Available Nearby",
    titleTa: "அருகில் கூட்டு அறுவடை இயந்திரம் வாடகைக்கு தயார்",
    descriptionEn: "Rubber track paddy harvester now available from custom hiring center at 6.8 km distance.",
    descriptionTa: "ரப்பர் டிராக் கொண்ட நெல் அறுவடை இயந்திரம் உங்கள் பகுதியில் 6.8 கி.மீ தொலைவில் வாடகைக்கு கிடைக்கிறது.",
    priority: "LOW",
    timestamp: "Yesterday",
    isRead: true,
    actionUrl: "/machinery",
    actionTextEn: "Request Equipment",
    actionTextTa: "இயந்திரத்தை முன்பதிவு செய்",
  }
];

export const INITIAL_REMINDERS: FarmReminder[] = [
  {
    id: "rem-1",
    title: "Apply second split of Potash for Samba Paddy",
    category: "IRRIGATION",
    targetDate: "2026-10-05",
    isCompleted: false,
    notes: "Ensure field has 2 cm standing water when applying MOP fertilizer.",
    createdAt: "2026-09-25",
  },
  {
    id: "rem-2",
    title: "Renew Uzhavar Pathukappu Scholarship Application",
    category: "SCHOLARSHIP",
    targetDate: "2026-10-25",
    isCompleted: false,
    notes: "Collect Bonafide certificate from college for student.",
    createdAt: "2026-09-24",
  }
];
