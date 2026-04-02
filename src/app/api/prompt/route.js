import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  if (req.method !== "POST") {
    return new NextResponse(JSON.stringify({ error: "Method not allowed." }), {
      status: 405,
    });
  }

  try {
    const ai = new GoogleGenAI({});

    const { pm25, temperature, humidity, tvoc, co, co2 } = await req.json();

    const prompt = `
Evaluate the air quality for each variable and provide feedback indicating whether the levels are perfect, suitable, moderately high/low, dangerously high/low, hazardous :
- PM2.5: ${pm25} µg/m³
- Temperature: ${temperature} °C
- Humidity: ${humidity} %
- TVOC: ${tvoc} µg/m³
- CO: ${co} ppm
- CO2: ${co2} ppm

Explain any potential health risks or recommendations for improving the air quality, if necessary.

NOTE! CONSTRUCT THE RESPONSE BASED ON THIS EXAMPLE :

"Here's an evaluation of the air quality variables you provided, along with potential health risks and recommendations:\n\n**PM2.5: 45 µg/m³**\n\n* **Evaluation:** Moderately high\n* **Health risks:** PM2.5 particles are small enough to penetrate deep into the lungs and bloodstream, potentially causing respiratory problems, cardiovascular disease, and other health issues.\n* **Recommendations:** \n * Consider using an air purifier with a HEPA filter to remove PM2.5 particles.\n * Limit time spent outd…g plants, which can naturally absorb CO2.\n\n**Overall Assessment:**\n\nThe air quality in this scenario is generally acceptable but shows elevated levels of several pollutants. The high PM2.5, TVOC, and CO levels are concerning and warrant taking steps to improve air quality. \n\n**Important Note:** It's essential to consult with a healthcare professional if you experience any health issues related to air quality. Local air quality monitoring agencies can also provide valuable information and alerts. \n"
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: prompt,
    });

    return NextResponse.json({ message: response.text });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: error }), { status: 500 });
  }
}
