// Market Service for Farmer AI
// Clean provider pattern with transparent net revenue formula: Net = Gross - Transport

export interface MarketItem {
  id: string;
  marketName: string;
  marketNameTa: string;
  district: string;
  state: string;
  cropName: string;
  cropNameTa: string;
  pricePerUnit: number;
  unit: "Quintal" | "Kg";
  distanceKm: number;
  contactPhone: string;
  address: string;
  status: "LIVE" | "ESTIMATED" | "DEMO" | "UNAVAILABLE";
  source: string;
  lastUpdated: string;
}

export interface MarketCalculationResult extends MarketItem {
  quantity: number;
  estimatedGrossValue: number;
  estimatedTransportCost: number;
  estimatedNetTakeHome: number;
  transportRatePerKm: number;
}

export interface MarketProvider {
  searchMarkets(crop: string, district?: string, quantityQuintals?: number): Promise<MarketCalculationResult[]>;
}

export const DEMO_MARKETS: MarketItem[] = [
  {
    id: "mkt-1",
    marketName: "Thanjavur Uzhavar Sandhai",
    marketNameTa: "தஞ்சாவூர் உழவர் சந்தை",
    district: "Thanjavur",
    state: "Tamil Nadu",
    cropName: "Paddy (Ponni)",
    cropNameTa: "நெல் (பொன்னி)",
    pricePerUnit: 2450,
    unit: "Quintal",
    distanceKm: 8.5,
    contactPhone: "+91 4362 230101",
    address: "Medical College Road, Thanjavur",
    status: "DEMO",
    source: "Regulated Market Committee / AGMARKNET",
    lastUpdated: "Today 08:30 AM",
  },
  {
    id: "mkt-2",
    marketName: "Kumbakonam Regulated Market",
    marketNameTa: "கும்பகோணம் ஒழுங்குமுறை விற்பனைக்கூடம்",
    district: "Thanjavur",
    state: "Tamil Nadu",
    cropName: "Paddy (Ponni)",
    cropNameTa: "நெல் (பொன்னி)",
    pricePerUnit: 2520,
    unit: "Quintal",
    distanceKm: 34.0,
    contactPhone: "+91 435 2420220",
    address: "Darasuram Main Road, Kumbakonam",
    status: "DEMO",
    source: "Tamil Nadu State Agricultural Marketing Board",
    lastUpdated: "Today 09:15 AM",
  },
  {
    id: "mkt-3",
    marketName: "Gandhi Market Trichy",
    marketNameTa: "திருச்சி காந்தி மார்க்கெட்",
    district: "Tiruchirappalli",
    state: "Tamil Nadu",
    cropName: "Tomato",
    cropNameTa: "தக்காளி",
    pricePerUnit: 28,
    unit: "Kg",
    distanceKm: 48.0,
    contactPhone: "+91 431 2700450",
    address: "Subramaniapuram, Tiruchirappalli",
    status: "DEMO",
    source: "Wholesale APMC Yard",
    lastUpdated: "Today 07:00 AM",
  },
  {
    id: "mkt-4",
    marketName: "Oddanchatram Vegetable Market",
    marketNameTa: "ஒட்டன்சத்திரம் காய்கறி சந்தை",
    district: "Dindigul",
    state: "Tamil Nadu",
    cropName: "Tomato",
    cropNameTa: "தக்காளி",
    pricePerUnit: 32,
    unit: "Kg",
    distanceKm: 95.0,
    contactPhone: "+91 4553 240321",
    address: "Bypass Road, Oddanchatram",
    status: "DEMO",
    source: "APMC Oddanchatram Trade Association",
    lastUpdated: "Today 06:45 AM",
  },
  {
    id: "mkt-5",
    marketName: "Alanganallur Agricultural Yard",
    marketNameTa: "அலங்காநல்லூர் வேளாண் விற்பனைக் கூடம்",
    district: "Madurai",
    state: "Tamil Nadu",
    cropName: "Sugarcane",
    cropNameTa: "கரும்பு",
    pricePerUnit: 3150,
    unit: "Quintal",
    distanceKm: 18.0,
    contactPhone: "+91 452 2456789",
    address: "Sugar Mill Road, Alanganallur",
    status: "DEMO",
    source: "Cooperative Sugar Federation",
    lastUpdated: "Yesterday 05:00 PM",
  },
  {
    id: "mkt-6",
    marketName: "Pollachi Tender Coconut Market",
    marketNameTa: "பொள்ளாச்சி இளநீர் சந்தை",
    district: "Coimbatore",
    state: "Tamil Nadu",
    cropName: "Coconut",
    cropNameTa: "தேங்காய் / இளநீர்",
    pricePerUnit: 38,
    unit: "Kg",
    distanceKm: 22.0,
    contactPhone: "+91 4259 223344",
    address: "Palakkad Road, Pollachi",
    status: "DEMO",
    source: "Coconut Producers Society",
    lastUpdated: "Today 10:00 AM",
  },
  {
    id: "mkt-7",
    marketName: "Panruti Cashew & Jackfruit Mandi",
    marketNameTa: "பண்ருட்டி முந்திரி மற்றும் பலா சந்தை",
    district: "Cuddalore",
    state: "Tamil Nadu",
    cropName: "Groundnut",
    cropNameTa: "நிலக்கடலை",
    pricePerUnit: 6800,
    unit: "Quintal",
    distanceKm: 65.0,
    contactPhone: "+91 4142 242500",
    address: "Cuddalore Main Road, Panruti",
    status: "DEMO",
    source: "Regulated Market Committee",
    lastUpdated: "Today 08:00 AM",
  }
];

export class MockMarketProvider implements MarketProvider {
  async searchMarkets(
    crop: string = "Paddy (Ponni)",
    district: string = "Thanjavur",
    quantityQuintals: number = 10
  ): Promise<MarketCalculationResult[]> {
    const TRANSPORT_RATE_PER_KM = 14; // Average small truck transport cost (₹14/km)

    // Filter or adjust markets according to queried crop
    let matches = DEMO_MARKETS.filter(
      (m) =>
        m.cropName.toLowerCase().includes(crop.toLowerCase()) ||
        crop.toLowerCase().includes(m.cropName.toLowerCase()) ||
        m.district.toLowerCase() === district.toLowerCase()
    );

    if (matches.length === 0) {
      matches = DEMO_MARKETS.slice(0, 4);
    }

    return matches.map((m) => {
      // Calculate Gross value:
      const unitMultiplier = m.unit === "Kg" ? 100 : 1; // 1 Quintal = 100 Kg
      const effectiveRate = m.pricePerUnit * (m.unit === "Kg" ? 100 : 1);
      const gross = Math.round(quantityQuintals * effectiveRate);

      // Transport cost formula: round trip or distance scaled
      const transportCost = Math.round(m.distanceKm * TRANSPORT_RATE_PER_KM * 2);

      // Net Take-Home amount:
      const net = Math.max(0, gross - transportCost);

      return {
        ...m,
        quantity: quantityQuintals,
        estimatedGrossValue: gross,
        estimatedTransportCost: transportCost,
        estimatedNetTakeHome: net,
        transportRatePerKm: TRANSPORT_RATE_PER_KM,
      };
    });
  }
}

// Singleton market provider instance ready for live API plug-in
export const marketService = new MockMarketProvider();
