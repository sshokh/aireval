import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "AirEval",
  description:
    "AirEval (Air Quality Evaluator) is a modern web application that evaluates air quality parameters and provides detailed AI-powered recommendations and health impact assessments. Built with Next.js, it features an intuitive interface for monitoring air quality metrics including PM2.5, temperature, humidity, TVOC, CO, and CO2 levels.",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="light" className={`${inter.variable} light`}>
      <body className="bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
