# 🌤️ Skycast Weather App

Skycast is a modern weather dashboard built with a **Next.js + TypeScript** frontend and a **Laravel API backend**. It fetches real-time weather and 3-day forecasts using the OpenWeatherMap API.

---

## 📁 Project Structure
skycast-weather-app/ 
  ├── back-end/ 
    │ └── weather-api/ # Laravel API (OpenWeatherMap integration) 
  └── front-end/ 
    └── weather-app/ # Next.js 14 + TypeScript UI (ShadCN + TailwindCSS + Framer Motion)

---

## 🚀 Technologies Used

### Frontend
- [Next.js](https://nextjs.org/) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- Fetch API (AJAX) for backend communication

### Backend
- [Laravel 10+](https://laravel.com/)
- [HTTP Client](https://laravel.com/docs/10.x/http-client)
- OpenWeatherMap API

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/skycast-weather-app.git
cd skycast-weather-app

📸 UI Features
Your app follows a clean and intuitive layout based on a wireframe-driven design. Key UI components include:

🧭 Sidebar (Left)
Current Weather Icon – dynamically changes based on live data

Current Temperature – displayed prominently with °C or °F symbol

Weather Description – e.g., “few clouds”, “light rain”

Current Date & City Name – displayed at the bottom of the sidebar

🔎 Top Navigation (Main)
Search Input – enter any city to view its weather

Search Button – activates fetch via Laravel API

Unit Toggle – switch between Celsius (°C) and Fahrenheit (°F)

📅 Forecast Section
3-Day Forecast Cards – each card includes:

Date (e.g., "Wed")

Weather Icon

Min/Max Temperature

Weather Summary

🌬️ Weather Metrics
Wind Card

Shows wind speed (in m/s or mph depending on unit)

Compass icon rotates based on wind direction

Humidity Card

Percentage display

Visual progress bar that animates on value change

✨ Animations
Framer Motion animations:

Page load fade-in

Re-renders when city or unit changes

Humidity bar and compass icon smoothly animate on change

📱 Responsive Design
Mobile-first layout

Sidebar collapses gracefully

Cards stack vertically on smaller screens
