// Database Seed Script for Farmer AI Platform
// Populates demo farmer profile, market prices, machinery, schemes, and scholarships

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Farmer AI demo data...");

  // 1. Create Demo Farmer User & Profile
  const demoUser = await prisma.user.upsert({
    where: { phone: "9876543210" },
    update: {},
    create: {
      phone: "9876543210",
      name: "Thangasivaganesh P.",
      role: "FARMER",
      profile: {
        create: {
          farmerName: "THANGASIVAGANESH P.",
          village: "Orathanadu",
          district: "Thanjavur",
          state: "Tamil Nadu",
          landSizeAcres: 3.5,
          irrigationType: "Borewell + Canal",
          preferredLang: "ta",
          locationConsent: true,
          latitude: 10.6277,
          longitude: 79.2536,
          crops: {
            create: [
              { cropName: "Paddy (Ponni)", variety: "BPT 5204", season: "Samba", acreage: 2.5, stage: "Vegetative" },
              { cropName: "Groundnut", variety: "VRI 8", season: "Navarai", acreage: 1.0, stage: "Sowing" },
            ],
          },
        },
      },
    },
  });

  console.log("Seeded user:", demoUser.phone);
  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
