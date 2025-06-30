import fs from "fs";
import axios from "axios";
import slugify from "slugify";

const cities = [
  "Vizag", "Surat", "Pune", "Navi Mumbai", "Sonipat", "Varanasi", "Guwahati",
  "Nagpur", "Indore", "Bhopal", "Hyderabad", "Kolkata", "Dehradun", "Chennai",
  "Chandigarh", "Goa", "Mumbai", "Bangalore", "Ahmedabad", "Jaipur", "Lucknow",
  "Gurgaon", "Noida", "Gurgaon00120", "Gurugram", "Delhi", "Dubai", "Faridabad",
  "DubaiDubai", "Gurugarm", "Ghaziabad", "Greater Noida", "Gurugaon", "Gurgoan",
  "Noida Extension", "greaternoida", "Bhubaneswar"
];

const BASE_URL = "https://www.townmanor.ai"; // use www. version everywhere

const buildSitemap = async () => {
  let urls = [];

  // 1. Fetch properties for all cities
  for (const city of cities) {
    try {
      const response = await axios.get(`${BASE_URL}/api/properties?city=${encodeURIComponent(city)}`);
      const properties = response.data;

      const cityUrls = properties.map((property) => {
        const slug = slugify(property.property_name || "property", { lower: true });
        return `
  <url>
    <loc>${BASE_URL}/en/property/${property.id}/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
      });

      urls.push(...cityUrls);
    } catch (error) {
      console.error(`❌ Failed to fetch properties for city "${city}":`, error.message);
    }
  }

  // 2. Owner property routes
  try {
    const response = await axios.get(`${BASE_URL}/api/owner-property`);
    const properties = response.data;

    const ownerUrls = properties.map((property) => {
      const slug = slugify(property.property_name || "property", { lower: true });
      return `
  <url>
    <loc>${BASE_URL}/en/property/${property.id}/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
    });

    urls.push(...ownerUrls);
  } catch (error) {
    console.error("❌ Failed to fetch owner properties:", error.message);
  }

  // 3. Static important pages
  const staticUrls = [
    "https://www.townmanor.ai/",
    "https://www.townmanor.ai/services",
    "https://townmanor.ai/adminproperty/Noida",
    "https://www.townmanor.ai/search-property",
    "https://www.townmanor.ai/auth",
    "https://www.townmanor.ai/sign-up",
    "https://www.townmanor.ai/forgot-password",
    "https://www.townmanor.ai/home-loan",
    "https://www.townmanor.ai/credit-score",
    "https://www.townmanor.ai/insurance",
    "https://www.townmanor.ai/newRentAgreement",
    "https://www.townmanor.ai/rentvalue",
    "https://www.townmanor.ai/esignoverview",
    "https://www.townmanor.ai/homelane",
    "https://www.townmanor.ai/homelanemodular-kitchen",
    "https://www.townmanor.ai/homelane/wardrobes",
    "https://www.townmanor.ai/homelane/masterbedroom",
    "https://www.townmanor.ai/homelane/tv",
    "https://www.townmanor.ai/homelane/livingroom",
    "https://www.townmanor.ai/homelane/falseceiling",
    "https://www.townmanor.ai/homelane/bathroom",
    "https://www.townmanor.ai/homelane/kids",
    "https://www.townmanor.ai/homelane/fullhouseinterior",
    "https://www.townmanor.ai/homelane/commercialinterior",
    "https://www.townmanor.ai/homelane/officeinterior",
    "https://www.townmanor.ai/homelane/bedroom",
    "https://www.townmanor.ai/homelane/furniture",
    "https://www.townmanor.ai/homelane/commercial",
    "https://www.townmanor.ai/homelane/commercial3",
    "https://townmanor.ai/reraverification",
    "https://www.townmanor.ai/home-shift",
    "https://www.townmanor.ai/agents",
    "https://www.townmanor.ai/agentlist",
    "https://www.townmanor.ai/agents/form",
    "https://www.townmanor.ai/proptech",
    "https://www.townmanor.ai/pricing-plans",
    "https://www.townmanor.ai/userdashboard",
    "https://www.townmanor.ai/userdashboard-profile",
    "https://www.townmanor.ai/userdashboard-lead",
    "https://www.townmanor.ai/userdashboard-property",
    "https://www.townmanor.ai/userdashboard-agent",
    "https://www.townmanor.ai/Coliving",
    "https://www.townmanor.ai/newcoliving",
    "https://www.townmanor.ai/colivingsecond",
    "https://www.townmanor.ai/esign2",
    "https://www.townmanor.ai/esign3",
    "https://www.townmanor.ai/rental-listings",
    "https://www.townmanor.ai/explorestate"
  ];

  const staticUrlTags = staticUrls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);

  urls.push(...staticUrlTags);

  // 4. Combine all and write XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  fs.writeFileSync("public/sitemap.xml", sitemap);
  console.log(`✅ Sitemap generated with ${urls.length} URLs at public/sitemap.xml`);
};

buildSitemap();
