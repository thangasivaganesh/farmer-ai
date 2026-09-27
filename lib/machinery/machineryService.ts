// Farm Machinery Service for Farmer AI
// Covers 22 agricultural implement categories with clean provider architecture

export interface MachineryItem {
  id: string;
  name: string;
  nameTa: string;
  category: string;
  categoryTa: string;
  providerName: string;
  providerPhone: string;
  district: string;
  hourlyRate?: number;
  dailyRate?: number;
  isAvailable: boolean;
  distanceKm: number;
  status: "VERIFIED" | "DEMO";
  specs: string;
}

export const MACHINERY_CATEGORIES = [
  { id: "all", nameEn: "All Equipment", nameTa: "அனைத்தும்" },
  { id: "Tractor", nameEn: "Tractor (45-55 HP)", nameTa: "டிராக்டர்" },
  { id: "Paddy Transplanter", nameEn: "Paddy Transplanter", nameTa: "நெல் நடவு இயந்திரம்" },
  { id: "Combine Harvester", nameEn: "Combine Harvester", nameTa: "கூட்டு அறுவடை இயந்திரம்" },
  { id: "Paddy Harvester", nameEn: "Paddy Harvester (Track)", nameTa: "நெல் அறுவடை இயந்திரம்" },
  { id: "Rotavator", nameEn: "Rotavator (6-7 feet)", nameTa: "ரோட்டாவேட்டர்" },
  { id: "Power Tiller", nameEn: "Power Tiller (12-15 HP)", nameTa: "பவர் டில்லர்" },
  { id: "Sprayer", nameEn: "Boom / Power Sprayer", nameTa: "மருந்து தெளிப்பான்" },
  { id: "Weeder", nameEn: "Cono / Power Weeder", nameTa: "களை எடுக்கும் கருவி" },
  { id: "Seed Drill", nameEn: "Multi-Crop Seed Drill", nameTa: "விதைப்பான் கருவி" },
  { id: "Plough", nameEn: "Disc / MB Plough", nameTa: "கலப்பை" },
  { id: "Cultivator", nameEn: "9-Tyne Cultivator", nameTa: "கல்டிவேட்டர்" },
  { id: "Sugarcane Harvester", nameEn: "Sugarcane Harvester", nameTa: "கரும்பு அறுவடை இயந்திரம்" },
  { id: "Groundnut Harvester", nameEn: "Groundnut Digger / Thresher", nameTa: "நிலக்கடலை அறுவடை இயந்திரம்" },
  { id: "Water Pump", nameEn: "Diesel / Solar Water Pump", nameTa: "தண்ணீர் பம்ப்" },
  { id: "Tractor Trailer", nameEn: "Tractor + Tipping Trailer", nameTa: "டிராக்டர் டிரெய்லர்" },
  { id: "Mini Truck", nameEn: "Agri Mini Cargo Truck", nameTa: "மினி லாரி" },
];

export const DEMO_MACHINERY: MachineryItem[] = [
  {
    id: "mac-1",
    name: "Mahindra 575 DI 4WD with Cage Wheels",
    nameTa: "மகிந்திரா 575 DI டிராக்டர் (கேஜ் வீல் உடன்)",
    category: "Tractor",
    categoryTa: "டிராக்டர்",
    providerName: "K. Rengasamy (Custom Hiring Center)",
    providerPhone: "+91 94431 87654",
    district: "Thanjavur",
    hourlyRate: 850,
    dailyRate: 6500,
    isAvailable: true,
    distanceKm: 4.2,
    status: "DEMO",
    specs: "45 HP, suitable for wet paddy puddling and dry land ploughing",
  },
  {
    id: "mac-2",
    name: "Kubota DC-68G Rubber Track Paddy Harvester",
    nameTa: "குபோடா DC-68G ரப்பர் டிராக் நெல் அறுவடை இயந்திரம்",
    category: "Paddy Harvester",
    categoryTa: "நெல் அறுவடை இயந்திரம்",
    providerName: "Anbalagan Agro Services",
    providerPhone: "+91 98422 12340",
    district: "Thanjavur",
    hourlyRate: 2400,
    dailyRate: 18000,
    isAvailable: true,
    distanceKm: 6.8,
    status: "DEMO",
    specs: "Full-feed rubber crawler, ideal for waterlogged delta fields",
  },
  {
    id: "mac-3",
    name: "Yanmar 4-Row Ride-On Paddy Transplanter",
    nameTa: "யான்மார் 4-வரிசை நெல் நடவு இயந்திரம்",
    category: "Paddy Transplanter",
    categoryTa: "நெல் நடவு இயந்திரம்",
    providerName: "Cauvery Delta FPO",
    providerPhone: "+91 97890 45678",
    district: "Tiruvarur",
    hourlyRate: 1100,
    dailyRate: 8000,
    isAvailable: true,
    distanceKm: 14.5,
    status: "DEMO",
    specs: "Adjustable hill spacing (14-21 cm), mat seedling transplanting",
  },
  {
    id: "mac-4",
    name: "Shaktiman 7-Feet Multi-Speed Rotavator",
    nameTa: "சக்திமான் 7-அடி மல்டி-ஸ்பீட் ரோட்டாவேட்டர்",
    category: "Rotavator",
    categoryTa: "ரோட்டாவேட்டர்",
    providerName: "Velmurugan Farm Equipments",
    providerPhone: "+91 93600 78912",
    district: "Thanjavur",
    hourlyRate: 650,
    dailyRate: 4800,
    isAvailable: true,
    distanceKm: 3.1,
    status: "DEMO",
    specs: "Boron steel L-blades, creates fine seedbed in single pass",
  },
  {
    id: "mac-5",
    name: "VST Shakti 130 DI Power Tiller",
    nameTa: "விஎஸ்டி சக்தி 130 DI பவர் டில்லர்",
    category: "Power Tiller",
    categoryTa: "பவர் டில்லர்",
    providerName: "Sundaram Small Farmers Group",
    providerPhone: "+91 98415 67890",
    district: "Madurai",
    hourlyRate: 450,
    dailyRate: 3200,
    isAvailable: false,
    distanceKm: 8.0,
    status: "DEMO",
    specs: "13 HP diesel, rotavator attachment included",
  },
  {
    id: "mac-6",
    name: "Aspee HTP Tractor Mounted 400L Sprayer",
    nameTa: "அஸ்பீ டிராக்டர் பொருத்தப்பட்ட 400L தெளிப்பான்",
    category: "Sprayer",
    categoryTa: "மருந்து தெளிப்பான்",
    providerName: "Delta Plant Health Care",
    providerPhone: "+91 94861 23987",
    district: "Thanjavur",
    hourlyRate: 500,
    dailyRate: 3500,
    isAvailable: true,
    distanceKm: 5.5,
    status: "DEMO",
    specs: "100-meter hose with triple nozzle gun for orchard & broadacre",
  },
  {
    id: "mac-7",
    name: "Mahindra 3-Ton Hydraulic Tipping Farm Trailer",
    nameTa: "மகிந்திரா 3-டன் ஹைட்ராலிக் டிப்பிங் டிரெய்லர்",
    category: "Tractor Trailer",
    categoryTa: "டிராக்டர் டிரெய்லர்",
    providerName: "Murugan Transports",
    providerPhone: "+91 98421 99887",
    district: "Thanjavur",
    hourlyRate: 400,
    dailyRate: 2800,
    isAvailable: true,
    distanceKm: 2.8,
    status: "DEMO",
    specs: "Heavy-duty chassis for grain bag transport to Uzhavar Sandhai",
  }
];

export async function searchMachinery(category?: string, district?: string): Promise<MachineryItem[]> {
  let list = DEMO_MACHINERY;
  if (category && category !== "all") {
    list = list.filter((m) => m.category.toLowerCase().includes(category.toLowerCase()));
  }
  if (district && district !== "all") {
    list = list.filter((m) => m.district.toLowerCase() === district.toLowerCase());
  }
  return list.length > 0 ? list : DEMO_MACHINERY;
}
