// Crop Recommendation & Irrigation Engine for Farmer AI
// Evaluates agronomic suitability based on soil type, water, season, and climate

export interface CropRecommendationInput {
  district: string;
  season: string;
  soilType: string;
  soilPh?: number;
  waterAvailability: "High" | "Medium" | "Low";
  landSizeAcres: number;
  previousCrop?: string;
  farmerPreference?: string;
}

export interface RecommendedCrop {
  id: string;
  cropNameEn: string;
  cropNameTa: string;
  varietySuggestions: string[];
  suitabilityScore: number; // percentage
  suitabilityReasonEn: string;
  suitabilityReasonTa: string;
  waterRequirement: string;
  waterRequirementTa: string;
  growingDurationDays: string;
  growingDurationTa: string;
  weatherConsiderationsEn: string;
  weatherConsiderationsTa: string;
  riskFactorsEn: string;
  riskFactorsTa: string;
  irrigationScheduleEn: string;
  irrigationScheduleTa: string;
}

export const KNOWN_CROPS_DATABASE: RecommendedCrop[] = [
  {
    id: "crop-paddy-samba",
    cropNameEn: "Paddy (Medium Duration - CR 1009 / BPT 5204)",
    cropNameTa: "நெல் (சம்பா பருவம் - சி.ஆர் 1009 / ஆந்திரா பொன்னி)",
    varietySuggestions: ["CR 1009 Sub 1", "BPT 5204 (Sona Masuri)", "ADT 53", "TKM 13"],
    suitabilityScore: 94,
    suitabilityReasonEn: "Ideal for clayey alluvial soil with assured canal or tube-well irrigation during Samba monsoon season.",
    suitabilityReasonTa: "சம்பா பருவத்தில் வண்டல் களிமண் நிலத்திற்கும் வாய்க்கால் பாசன வசதிக்கும் மிகவும் உகந்தது.",
    waterRequirement: "High (1200 - 1400 mm)",
    waterRequirementTa: "அதிகம் (1200 - 1400 மி.மீ)",
    growingDurationDays: "135 - 150 Days",
    growingDurationTa: "135 - 150 நாட்கள்",
    weatherConsiderationsEn: "Benefits from North-East Monsoon showers during vegetative growth; avoid water stagnation at ripening.",
    weatherConsiderationsTa: "வளர்ச்சிப் பருவத்தில் வடகிழக்கு பருவமழை சாதகமாக இருக்கும். அறுவடை நேரத்தில் வயலில் நீர் தேங்கக்கூடாது.",
    riskFactorsEn: "Leaf blast and brown plant hopper (BPH) during continuous overcast humid conditions. Use balanced potash.",
    riskFactorsTa: "மேகமூட்டமான ஈரப்பதம் உள்ள நாட்களில் இலைக்கருகல் மற்றும் புகையான் தாக்குதல் வரலாம். பொட்டாஷ் உரத்தை சரியான அளவில் இடவும்.",
    irrigationScheduleEn: "Maintain 2-5 cm standing water until dough stage; drain 10 days before harvest.",
    irrigationScheduleTa: "மணிக்கட்டும் பருவம் வரை 2-5 செ.மீ நீர் நிறுத்தி, அறுவடைக்கு 10 நாட்களுக்கு முன் நீரை வடிக்கவும்.",
  },
  {
    id: "crop-groundnut",
    cropNameEn: "Groundnut (Peanut)",
    cropNameTa: "நிலக்கடலை (மணிலா)",
    varietySuggestions: ["VRI 8", "TMV 14", "Dharani", "Kadiri 6"],
    suitabilityScore: 89,
    suitabilityReasonEn: "Excellent match for well-drained red sandy loam soils with moderate water availability; fixes soil nitrogen.",
    suitabilityReasonTa: "நல்ல வடிகால் வசதியுள்ள செம்மண் அல்லது மணல் கலந்த நிலங்களுக்கு ஏற்றது. மண்ணின் தழைச்சத்தை அதிகரிக்கும்.",
    waterRequirement: "Moderate (450 - 550 mm)",
    waterRequirementTa: "மிதமானது (450 - 550 மி.மீ)",
    growingDurationDays: "105 - 115 Days",
    growingDurationTa: "105 - 115 நாட்கள்",
    weatherConsiderationsEn: "Needs warm temperatures (25-30°C) during flowering and pegging. Heavy rain during maturity causes pod rot.",
    weatherConsiderationsTa: "பூக்கும் தருணத்தில் மிதமான வெயில் அவசியம். முதிர்ச்சி காலத்தில் அதிக மழை பெய்தால் காய் அழுகல் ஏற்படலாம்.",
    riskFactorsEn: "Tikka leaf spot and collar rot. Treat seeds with Trichoderma viride before sowing.",
    riskFactorsTa: "டிக்கா இலைப்புள்ளி நோய் மற்றும் வேரழுகல் நோய் வரக்கூடும். விதைநேர்த்தி செய்து விதைக்கவும்.",
    irrigationScheduleEn: "Critical irrigation stages: Flowering (25-30 DAS) and Pod development (45-60 DAS). Avoid waterlogging.",
    irrigationScheduleTa: "பூக்கும் பருவம் (25-30 நாள்) மற்றும் காய் பிடிக்கும் பருவத்தில் (45-60 நாள்) கட்டாயம் பாசனம் செய்யவும்.",
  },
  {
    id: "crop-blackgram",
    cropNameEn: "Blackgram (Urad Dal)",
    cropNameTa: "உளுந்து (பயறு வகை)",
    varietySuggestions: ["VBN 8", "VBN 11", "ADT 6", "MDU 1"],
    suitabilityScore: 92,
    suitabilityReasonEn: "Perfect as a rice-fallow or residual moisture pulse crop; requires minimal supplementary watering.",
    suitabilityReasonTa: "நெல் அறுவடைக்குப்பின் கிடைக்கும் ஈரப்பதத்தில் அல்லது குறைந்த நீர்ப்பாசனத்தில் சாகுபடி செய்ய மிகவும் சிறந்தது.",
    waterRequirement: "Low (300 - 350 mm)",
    waterRequirementTa: "குறைவு (300 - 350 மி.மீ)",
    growingDurationDays: "65 - 75 Days",
    growingDurationTa: "65 - 75 நாட்கள்",
    weatherConsiderationsEn: "Tolerates light dry spells; excess humidity during flowering may induce powdery mildew.",
    weatherConsiderationsTa: "வறட்சியைத் தாங்கி வளரும். பூக்கும் பருவத்தில் அதிக பனி அல்லது ஈரப்பதம் சாம்பல் நோயைத் தூண்டலாம்.",
    riskFactorsEn: "Yellow Mosaic Virus (YMV) transmitted by whiteflies. Cultivate YMV-resistant variety like VBN 8.",
    riskFactorsTa: "வெள்ளையீ மூலம் பரவும் மஞ்சள் தேமல் நோய். இதைத் தடுக்க VBN 8 போன்ற எதிர்ப்பு ரகங்களை பயிரிடவும்.",
    irrigationScheduleEn: "One irrigation at vegetative phase (20 DAS) and one at pod formation (40 DAS) if rains fail.",
    irrigationScheduleTa: "மழை இல்லாவிடில் விதைத்த 20 மற்றும் 40 ஆம் நாட்களில் லேசான பாசனம் போதுமானது.",
  },
  {
    id: "crop-maize",
    cropNameEn: "Hybrid Maize (Corn)",
    cropNameTa: "வீரிய மக்காச்சோளம்",
    varietySuggestions: ["CO 6", "COH(M) 8", "Pioneer 3396", "Dekalb 9108"],
    suitabilityScore: 86,
    suitabilityReasonEn: "Thrives in fertile loamy soils with good drainage; strong market demand for poultry feed in Tamil Nadu.",
    suitabilityReasonTa: "வடிகால் வசதியுள்ள இருமண் நிலங்களுக்கு உகந்தது. கோழித்தீவன உற்பத்திக்கு தமிழகத்தில் நல்ல சந்தை வாய்ப்பு உள்ளது.",
    waterRequirement: "Moderate (500 - 650 mm)",
    waterRequirementTa: "மிதமானது (500 - 650 மி.மீ)",
    growingDurationDays: "100 - 110 Days",
    growingDurationTa: "100 - 110 நாட்கள்",
    weatherConsiderationsEn: "Requires sunny dry days during grain-filling; sensitive to waterlogging at young seedling stage.",
    weatherConsiderationsTa: "மணி முதிரும் காலத்தில் நல்ல சூரிய வெளிச்சம் தேவை. இளம் பருவத்தில் பாத்திக்குள் நீர் தேங்கக்கூடாது.",
    riskFactorsEn: "Fall Armyworm (Spodoptera frugiperda) infestation in whorls. Monitor early with pheromone traps.",
    riskFactorsTa: "படைப்புழு தாக்குதல் இலை குருத்துகளில் ஏற்படலாம். இனக்கவர்ச்சி பொறி வைத்து ஆரம்பத்திலேயே கட்டுப்படுத்தவும்.",
    irrigationScheduleEn: "Irrigate at Knee-high stage, Tasseling, Silking, and Grain filling stage. Avoid water stress at silking.",
    irrigationScheduleTa: "முழங்கால் அளவு வளர்ச்சி, பூவெடுக்கும் பருவம், பால் பிடிக்கும் பருவங்களில் தவறாமல் நீர் பாய்ச்சவும்.",
  }
];

export function recommendCrops(input: CropRecommendationInput): RecommendedCrop[] {
  let crops = [...KNOWN_CROPS_DATABASE];

  if (input.waterAvailability === "Low") {
    // Prioritize low-water pulses and groundnut
    crops.sort((a, b) => (a.waterRequirement.includes("Low") ? -1 : 1));
  } else if (input.soilType.toLowerCase().includes("clay") || input.soilType.toLowerCase().includes("alluvial")) {
    // Prioritize paddy and pulses
    crops.sort((a, b) => (a.cropNameEn.includes("Paddy") ? -1 : 1));
  }

  return crops;
}
