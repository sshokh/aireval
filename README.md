# AirEval

AirEval (Air Quality Evaluator) is a modern web application that evaluates air quality parameters and provides detailed AI-powered recommendations and health impact assessments. Built with Next.js, it features an intuitive interface for monitoring air quality metrics including PM2.5, temperature, humidity, TVOC, CO, and CO2 levels.

## Features

- **Air Quality Evaluation**: Input air quality parameters and get comprehensive AI-generated insights
- **Health & Safety Recommendations**: Receive tailored recommendations based on current air quality conditions
- **Persistent Input State**: Form values are automatically saved to URL parameters, so they persist across page refreshes
- **Real-time Markdown Rendering**: Beautifully formatted responses with proper markdown support
- **Modern UI**: Built with HeroUI components and styled with Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Google GenAI Integration**: Powered by Google's Gemini API for intelligent air quality analysis

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **UI Framework**: HeroUI with Tailwind CSS
- **Icons**: Gravity UI Icons
- **API**: Google GenAI / Gemini API
- **HTTP Client**: Axios
- **Package Manager**: Bun

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sshokh/aireval.git
   cd aireval
   ```

2. Install dependencies using Bun:

   ```bash
   bun install
   ```

3. Set up your Google GenAI API key in a `.env.local` file:

   ```bash
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Run the development server:

   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Navigate to the homepage
2. Fill in the air quality parameters:
   - PM2.5 (µg/m³)
   - Temperature (°C)
   - Humidity (%)
   - TVOC (µg/m³)
   - CO (ppm)
   - CO2 (ppm)
3. Click "Check" to submit the form
4. Receive an AI-evaluated report on current air quality conditions
5. Your input values are automatically saved in the URL for easy sharing and persistence

## Build

```bash
bun run build
bun run start
```

## Contributing

Contributions are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests with improvements
- Suggest enhancements

## License
This project is licensed under the MIT License.